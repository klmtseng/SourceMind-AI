import { RepoMetadata, RepoLanguages } from '../types';

const BASE_URL = 'https://api.github.com/repos';

export const fetchRepoMetadata = async (owner: string, repo: string, token?: string): Promise<RepoMetadata> => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await fetch(`${BASE_URL}/${owner}/${repo}`, { headers });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Repository "${owner}/${repo}" not found. Please check spelling or ensure it is public.`);
    }
    if (response.status === 403) {
      throw new Error(`GitHub API rate limit exceeded. Please provide an API Token.`);
    }
    throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const fetchRepoLanguages = async (owner: string, repo: string, token?: string): Promise<RepoLanguages> => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await fetch(`${BASE_URL}/${owner}/${repo}/languages`, { headers });
  if (!response.ok) {
    // If languages fail but repo exists, return empty object rather than crashing
    if (response.status === 404) return {};
    throw new Error(`Failed to fetch languages`);
  }
  return response.json();
};

export const fetchReadmeContent = async (owner: string, repo: string, token?: string): Promise<string> => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }

  const response = await fetch(`${BASE_URL}/${owner}/${repo}/readme`, { headers });
  if (!response.ok) {
    if (response.status === 404) return "No README found.";
    throw new Error(`Failed to fetch README`);
  }
  const data = await response.json();
  
  // Robust Base64 Decoding for UTF-8 (Supports Chinese, Emoji, etc.)
  try {
    const binaryString = atob(data.content.replace(/\s/g, ''));
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (e) {
    console.error("Decoding error", e);
    return "Error decoding README content. Content might be binary or invalid encoding.";
  }
};