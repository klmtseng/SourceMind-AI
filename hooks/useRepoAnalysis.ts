import { useState } from 'react';
import { RepoMetadata, RepoLanguages, AnalysisResult, LoadingState } from '../types';
import * as githubService from '../services/githubService';
import * as geminiService from '../services/geminiService';
import { useSettings } from '../contexts/SettingsContext';

interface UseRepoAnalysisReturn {
  analyze: (repoFullName: string) => Promise<void>;
  loadingState: LoadingState;
  error: string | null;
  repoMetadata: RepoMetadata | null;
  languages: RepoLanguages | null;
  analysis: AnalysisResult | null;
  reset: () => void;
}

export const useRepoAnalysis = (): UseRepoAnalysisReturn => {
  const { geminiApiKey, githubToken, toggleSettings } = useSettings();
  
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [repoMetadata, setRepoMetadata] = useState<RepoMetadata | null>(null);
  const [languages, setLanguages] = useState<RepoLanguages | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const reset = () => {
    setError(null);
    setRepoMetadata(null);
    setLanguages(null);
    setAnalysis(null);
    setLoadingState(LoadingState.IDLE);
  };

  const analyze = async (repoInput: string) => {
    if (!geminiApiKey) {
      setError("A Google Gemini API Key is required. Please add it in Settings.");
      toggleSettings(); // Open settings for the user
      return;
    }

    if (!repoInput.includes('/')) {
      setError("Please format as 'owner/repo'");
      return;
    }

    reset();
    const [owner, repo] = repoInput.split('/');
    setLoadingState(LoadingState.FETCHING_GITHUB);

    try {
      // 1. Fetch GitHub Data
      const [metadata, langs, readme] = await Promise.all([
        githubService.fetchRepoMetadata(owner, repo, githubToken),
        githubService.fetchRepoLanguages(owner, repo, githubToken),
        githubService.fetchReadmeContent(owner, repo, githubToken)
      ]);

      setRepoMetadata(metadata);
      setLanguages(langs);

      // 2. Analyze with Gemini
      setLoadingState(LoadingState.ANALYZING_GEMINI);
      const analysisResult = await geminiService.analyzeRepo(geminiApiKey, readme, { ...metadata, languages: langs });
      
      setAnalysis(analysisResult);
      setLoadingState(LoadingState.COMPLETE);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during analysis.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return {
    analyze,
    loadingState,
    error,
    repoMetadata,
    languages,
    analysis,
    reset
  };
};