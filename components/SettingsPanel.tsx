import React from 'react';
import { Key, Github } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';

const SettingsPanel: React.FC = () => {
  const { geminiApiKey, setGeminiApiKey, githubToken, setGithubToken, isSettingsOpen } = useSettings();

  if (!isSettingsOpen) return null;

  return (
    <div className="animate-fade-in-down bg-surfaceLight/50 p-6 rounded-xl border border-slate-700/50 shadow-2xl backdrop-blur-md mt-2 text-left w-full max-w-xl mx-auto mb-8">
      <div className="grid grid-cols-1 gap-5">
        {/* Gemini Key */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            Gemini API Key <span className="text-red-400">*</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-4 w-4 text-slate-500 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="block w-full pl-10 pr-3 py-2.5 bg-[#020617] border border-slate-600 rounded-lg text-slate-200 text-xs font-mono focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder:text-slate-600"
            />
          </div>
          <p className="text-[10px] text-slate-500">
            Required. Get it free at <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-primary hover:underline">Google AI Studio</a>.
            Stored securely in your browser's local storage.
          </p>
        </div>

        {/* GitHub Token */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
            GitHub Token <span className="text-slate-500 font-normal">(Optional)</span>
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Github className="h-4 w-4 text-slate-500 group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="github_pat_..."
              className="block w-full pl-10 pr-3 py-2.5 bg-[#020617] border border-slate-600 rounded-lg text-slate-200 text-xs font-mono focus:ring-1 focus:ring-white focus:border-white focus:outline-none transition-all placeholder:text-slate-600"
            />
          </div>
          <p className="text-[10px] text-slate-500">
            Recommended for large repos to avoid 403 Rate Limit errors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;