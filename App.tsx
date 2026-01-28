import React, { useState } from 'react';
import { Search, Github, AlertCircle, Star, GitFork, ExternalLink, Loader2, Key, Zap, ShieldCheck } from 'lucide-react';
import { RepoMetadata, RepoLanguages, AnalysisResult, LoadingState } from './types';
import * as githubService from './services/githubService';
import * as geminiService from './services/geminiService';
import AnalysisCard from './components/AnalysisCard';
import LanguageChart from './components/LanguageChart';

const DEFAULT_REPO = "facebook/react";

const App: React.FC = () => {
  const [repoInput, setRepoInput] = useState(DEFAULT_REPO);
  const [githubToken, setGithubToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);
  
  const [repoMetadata, setRepoMetadata] = useState<RepoMetadata | null>(null);
  const [languages, setLanguages] = useState<RepoLanguages | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!repoInput.includes('/')) {
      setError("Please format as 'owner/repo'");
      return;
    }
    
    const [owner, repo] = repoInput.split('/');
    setLoadingState(LoadingState.FETCHING_GITHUB);
    setError(null);
    setAnalysis(null);
    setRepoMetadata(null);

    try {
      // 1. Fetch GitHub Data in Parallel (Optimization)
      const [metadata, langs, readme] = await Promise.all([
        githubService.fetchRepoMetadata(owner, repo, githubToken),
        githubService.fetchRepoLanguages(owner, repo, githubToken),
        githubService.fetchReadmeContent(owner, repo, githubToken)
      ]);

      setRepoMetadata(metadata);
      setLanguages(langs);

      // 2. Analyze with Gemini
      setLoadingState(LoadingState.ANALYZING_GEMINI);
      const analysisResult = await geminiService.analyzeRepo(readme, { ...metadata, languages: langs });
      
      setAnalysis(analysisResult);
      setLoadingState(LoadingState.COMPLETE);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 font-sans selection:bg-primary/30 relative overflow-x-hidden">
      
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-0 w-full h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>

      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-primary to-accent p-1.5 rounded-lg shadow-lg shadow-primary/20">
                <Zap size={18} className="text-white" fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Source<span className="text-primary font-light">Mind</span></span>
          </div>
          <div className="flex items-center gap-6">
             <button 
               onClick={() => setShowTokenInput(!showTokenInput)}
               className={`text-xs transition-colors flex items-center gap-1.5 ${showTokenInput ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
             >
                <Key size={14} />
                {showTokenInput ? 'Hide Token Input' : 'API Token'}
             </button>
             <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                <Github size={22} />
             </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        
        {/* Search / Hero Section */}
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-primary mb-6 animate-fade-in-down">
                <ShieldCheck size={12} />
                <span>Powered by Gemini 3 Flash Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-white">
                Decode the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-accent">Matrix</span> of Code.
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg font-light leading-relaxed">
                SourceMind extracts architectural insights, evaluates innovation, and simplifies complexity for any GitHub repository instantly.
            </p>

            <div className="max-w-xl mx-auto flex flex-col gap-4">
                <div className="flex gap-2 p-1 bg-surfaceLight rounded-2xl border border-slate-700 shadow-2xl">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Github className="h-5 w-5 text-slate-500" />
                        </div>
                        <input
                            type="text"
                            value={repoInput}
                            onChange={(e) => setRepoInput(e.target.value)}
                            placeholder="owner/repo"
                            className="block w-full pl-11 pr-4 py-3 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-sm"
                        />
                    </div>
                    <button
                        onClick={handleAnalyze}
                        disabled={loadingState === LoadingState.FETCHING_GITHUB || loadingState === LoadingState.ANALYZING_GEMINI}
                        className="inline-flex items-center px-6 py-2.5 rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-cyan-600 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f172a] focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
                    >
                        {loadingState === LoadingState.FETCHING_GITHUB || loadingState === LoadingState.ANALYZING_GEMINI ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            'Audit Repo'
                        )}
                    </button>
                </div>

                {showTokenInput && (
                    <div className="animate-fade-in-down bg-surfaceLight/50 p-4 rounded-xl border border-slate-700/50">
                        <input
                            type="password"
                            value={githubToken}
                            onChange={(e) => setGithubToken(e.target.value)}
                            placeholder="Paste GitHub Personal Access Token (Optional)"
                            className="block w-full px-4 py-2 text-xs border border-slate-600 rounded-lg bg-[#020617] text-slate-300 focus:outline-none focus:border-primary font-mono placeholder-slate-600"
                        />
                        <p className="text-[10px] text-slate-500 text-left mt-2 flex items-center gap-1">
                            <AlertCircle size={10} />
                            Only required if you exceed default GitHub API rate limits.
                        </p>
                    </div>
                )}
            </div>
        </div>

        {/* Error State */}
        {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 backdrop-blur-sm">
                <AlertCircle size={20} />
                <span>{error}</span>
            </div>
        )}

        {/* Loading States */}
        {loadingState !== LoadingState.IDLE && loadingState !== LoadingState.COMPLETE && loadingState !== LoadingState.ERROR && (
             <div className="max-w-xl mx-auto text-center py-16 space-y-6">
                <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-2 border-slate-800 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-4 bg-primary/10 rounded-full animate-pulse"></div>
                </div>
                <div>
                    <h3 className="text-xl font-medium text-white mb-2">
                        {loadingState === LoadingState.FETCHING_GITHUB ? 'Interfacing with GitHub...' : 'Gemini Core Analysis Active'}
                    </h3>
                    <p className="text-slate-500 text-sm">
                        {loadingState === LoadingState.FETCHING_GITHUB ? 'Retrieving source code metadata.' : 'Parsing architecture and calculating innovation score.'}
                    </p>
                </div>
             </div>
        )}

        {/* Results */}
        {loadingState === LoadingState.COMPLETE && repoMetadata && analysis && (
            <div className="space-y-8 animate-fade-in-up">
                
                {/* Header Card */}
                <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start border-t border-t-slate-700/50">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                        <img 
                            src={repoMetadata.owner.avatar_url} 
                            alt={repoMetadata.owner.login} 
                            className="relative w-24 h-24 rounded-2xl border border-slate-600 shadow-2xl"
                        />
                    </div>
                    
                    <div className="flex-grow text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h2 className="text-3xl font-bold text-white tracking-tight">{repoMetadata.name}</h2>
                            <span className="hidden md:block text-slate-600">/</span>
                            <span className="text-slate-400 font-mono text-sm">{repoMetadata.full_name}</span>
                        </div>
                        
                        <p className="text-slate-300 mb-6 max-w-2xl leading-relaxed">{repoMetadata.description}</p>
                        
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-yellow-400/90 font-medium">
                                <Star size={14} fill="currentColor" />
                                <span>{repoMetadata.stargazers_count.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300 font-medium">
                                <GitFork size={14} />
                                <span>{repoMetadata.forks_count.toLocaleString()}</span>
                            </div>
                            <a 
                                href={repoMetadata.html_url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 hover:bg-white text-slate-900 rounded-lg text-sm font-bold transition-all"
                            >
                                Source
                                <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                    
                    {/* Language Chart */}
                    <div className="w-full md:w-64 flex-shrink-0 bg-slate-900/40 rounded-xl p-4 border border-slate-800">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">Languages</h3>
                        {languages && <LanguageChart languages={languages} />}
                    </div>
                </div>

                {/* Gemini Analysis */}
                <AnalysisCard analysis={analysis} />

            </div>
        )}
      </main>
    </div>
  );
};

export default App;