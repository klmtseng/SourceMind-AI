export interface RepoMetadata {
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  updated_at: string;
}

export interface RepoLanguages {
  [key: string]: number;
}

export interface CodeFile {
  path: string;
  content: string;
  description: string;
}

export interface SecurityVulnerability {
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  type: string;
  description: string;
}

export interface SecurityAnalysis {
  score: number;
  riskLevel: 'Critical' | 'High' | 'Moderate' | 'Low' | 'Safe';
  vulnerabilities: SecurityVulnerability[];
  complianceCheck: string[]; // e.g., "License Found", "No Hardcoded Secrets"
}

export interface FileStructureAnalysis {
  path: string;
  type: 'file' | 'dir';
  description: string; // "各檔案功能"
  dependencies: string[]; // "彼此相依關係"
  potentialIssues: string[]; // "可能的問題"
}

export interface AnalysisResult {
  summary: string;
  purpose: string;
  techStack: string[];
  keyFeatures: string[];
  installation: string;
  complexity: 'Low' | 'Medium' | 'High';
  useCases: string[];
  // SourceMind Intelligence
  innovationScore: number;
  suggestedImprovements: string[];
  // New Architecture Analysis
  repoStructure: FileStructureAnalysis[];
  // Code Generation
  projectBlueprint: CodeFile[];
  // Security Module
  securityAnalysis: SecurityAnalysis;
}

export enum LoadingState {
  IDLE = 'IDLE',
  FETCHING_GITHUB = 'FETCHING_GITHUB',
  ANALYZING_GEMINI = 'ANALYZING_GEMINI',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}