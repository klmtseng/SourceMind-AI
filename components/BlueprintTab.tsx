import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { Layers, FileCode, FileText, Check, Copy } from 'lucide-react';

interface BlueprintTabProps {
  analysis: AnalysisResult;
}

const BlueprintTab: React.FC<BlueprintTabProps> = ({ analysis }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="animate-fade-in h-[600px] flex flex-col md:flex-row glass-panel rounded-2xl overflow-hidden border border-primary/20 shadow-2xl">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-slate-900/80 border-r border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-800">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers size={16} className="text-primary" />
                    Generated Files
                </h4>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {analysis.projectBlueprint.map((file, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveFileIndex(idx)}
                        className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition-all ${
                            activeFileIndex === idx 
                            ? 'bg-primary/10 text-primary border border-primary/20' 
                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                        }`}
                    >
                        <FileCode size={16} className="flex-shrink-0" />
                        <div className="overflow-hidden">
                            <div className="text-xs font-mono font-bold truncate">{file.path}</div>
                            <div className="text-[10px] opacity-70 truncate">{file.description}</div>
                        </div>
                    </button>
                ))}
            </div>
             <div className="p-4 border-t border-slate-800">
                <button className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg border border-primary/20 transition-colors">
                    Download ZIP (Demo)
                </button>
            </div>
        </div>

        {/* Editor */}
        <div className="flex-1 bg-[#0a0f1e] flex flex-col min-w-0">
             <div className="flex items-center justify-between px-4 py-3 bg-[#020617] border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                    <FileText size={14} />
                    <span className="font-mono text-slate-200">{analysis.projectBlueprint[activeFileIndex].path}</span>
                </div>
                <button 
                    onClick={() => handleCopy(analysis.projectBlueprint[activeFileIndex].content, activeFileIndex)}
                    className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-slate-800"
                >
                    {copiedIndex === activeFileIndex ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    {copiedIndex === activeFileIndex ? 'Copied' : 'Copy Code'}
                </button>
            </div>
            <div className="flex-1 overflow-auto p-6 custom-scrollbar">
                <pre className="font-mono text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {analysis.projectBlueprint[activeFileIndex].content}
                </pre>
            </div>
        </div>
    </div>
  );
};

export default BlueprintTab;