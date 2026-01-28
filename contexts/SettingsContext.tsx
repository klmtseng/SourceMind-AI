import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  githubToken: string;
  setGithubToken: (token: string) => void;
  isSettingsOpen: boolean;
  toggleSettings: () => void;
  hasValidKey: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from localStorage or environment variable (fallback)
  const [geminiApiKey, setGeminiApiKeyState] = useState(() => {
    return localStorage.getItem('sourceMind_geminiKey') || process.env.API_KEY || '';
  });
  
  const [githubToken, setGithubTokenState] = useState(() => {
    return localStorage.getItem('sourceMind_githubToken') || '';
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Persistence wrappers
  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    if (key) {
      localStorage.setItem('sourceMind_geminiKey', key);
    } else {
      localStorage.removeItem('sourceMind_geminiKey');
    }
  };

  const setGithubToken = (token: string) => {
    setGithubTokenState(token);
    if (token) {
      localStorage.setItem('sourceMind_githubToken', token);
    } else {
      localStorage.removeItem('sourceMind_githubToken');
    }
  };

  const toggleSettings = () => setIsSettingsOpen(prev => !prev);

  // Check if we have a key (either from Env or User Input)
  const hasValidKey = Boolean(geminiApiKey && geminiApiKey.length > 0);

  return (
    <SettingsContext.Provider value={{
      geminiApiKey,
      setGeminiApiKey,
      githubToken,
      setGithubToken,
      isSettingsOpen,
      toggleSettings,
      hasValidKey
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};