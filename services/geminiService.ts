import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeRepo = async (
  readmeContent: string,
  repoMetadata: any
): Promise<AnalysisResult> => {
  // Use process.env.API_KEY directly as per guidelines.
  // Assume it is pre-configured and valid.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are SourceMind, an elite AI Technical Architect.
    
    Your task is to analyze the GitHub repository based on the provided README and metadata.
    
    CRITICAL OUTPUT REQUIREMENT:
    You must deduce and reconstruct the likely **File Structure** of this project. 
    For each key file or module you identify:
    1. **Tree Structure**: The likely path (e.g., 'src/models/user.ts').
    2. **Function**: What does this file do?
    3. **Dependencies**: What other files/libraries does it likely depend on?
    4. **Issues**: What are potential design flaws, performance bottlenecks, or maintenance issues in this specific module?

    Target: ${repoMetadata.full_name}
    Description: ${repoMetadata.description}
    Languages: ${JSON.stringify(repoMetadata.languages || {})}
    
    README Context:
    ${readmeContent.substring(0, 25000)}

    Provide a JSON response strictly following the schema.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "Professional executive summary." },
          purpose: { type: Type.STRING, description: "Core problem and solution." },
          techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
          keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
          installation: { type: Type.STRING },
          complexity: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          useCases: { type: Type.ARRAY, items: { type: Type.STRING } },
          innovationScore: { type: Type.INTEGER },
          suggestedImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
          repoStructure: {
            type: Type.ARRAY,
            description: "Detailed analysis of key files/modules.",
            items: {
              type: Type.OBJECT,
              properties: {
                path: { type: Type.STRING, description: "File path e.g. src/app.ts" },
                type: { type: Type.STRING, enum: ["file", "dir"] },
                description: { type: Type.STRING, description: "Function of this file" },
                dependencies: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Internal modules or external libs it depends on" },
                potentialIssues: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Potential problems or code smells" }
              },
              required: ["path", "type", "description", "dependencies", "potentialIssues"]
            }
          },
          projectBlueprint: {
            type: Type.ARRAY,
            description: "3-4 Essential files to replicate functionality.",
            items: {
                type: Type.OBJECT,
                properties: {
                    path: { type: Type.STRING },
                    content: { type: Type.STRING },
                    description: { type: Type.STRING }
                },
                required: ["path", "content", "description"]
            }
          },
          securityAnalysis: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER },
                riskLevel: { type: Type.STRING, enum: ["Critical", "High", "Moderate", "Low", "Safe"] },
                vulnerabilities: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            severity: { type: Type.STRING, enum: ["Critical", "High", "Medium", "Low"] },
                            type: { type: Type.STRING },
                            description: { type: Type.STRING }
                        }
                    }
                },
                complianceCheck: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["score", "riskLevel", "vulnerabilities", "complianceCheck"]
          }
        },
        required: ["summary", "purpose", "techStack", "keyFeatures", "installation", "complexity", "useCases", "innovationScore", "suggestedImprovements", "repoStructure", "projectBlueprint", "securityAnalysis"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("SourceMind received no data from Gemini.");
  }

  try {
    return JSON.parse(text) as AnalysisResult;
  } catch (e) {
    console.error("Failed to parse Gemini JSON:", text);
    throw new Error("Failed to parse analysis results.");
  }
};