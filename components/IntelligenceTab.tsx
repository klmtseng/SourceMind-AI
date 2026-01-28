import React from 'react';
import { AnalysisResult } from '../types';
import { FileCode, Folder, ArrowRight, AlertTriangle, Link2, Box } from 'lucide-react';

interface IntelligenceTabProps {
  analysis: AnalysisResult;
}

const IntelligenceTab: React.FC<IntelligenceTabProps> = ({ analysis }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
        
        {/* Left Column: Architecture Tree & Overview */}
        <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel rounded-2xl p-6 border-l-4 border-l-primary">
                <div className="flex items-center gap-3 mb-4">
                    <Box className="text-primary" size={24} />
                    <h4 className="text-xl font-bold text-white">System Architecture</h4>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Architecture Pattern</p>
                        <p className="text-white font-medium">{analysis.complexity} Complexity System</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Core Tech Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {analysis.techStack.map((t, i) => (
                                <span key={i} className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 border border-slate-700">{t}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel rounded-2xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">Proposed Improvements</h4>
                <ul className="space-y-3">
                    {analysis.suggestedImprovements.map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
                            <span className="text-primary font-bold mt-0.5">{idx + 1}.</span>
                            <span>{imp}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Right Column: Detailed File Analysis */}
        <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileCode size={20} className="text-secondary" />
                    Module Analysis & Dependencies
                </h4>
                <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded-full border border-slate-800">
                    {analysis.repoStructure?.length || 0} Key Modules Identified
                </span>
            </div>

            <div className="space-y-4">
                {analysis.repoStructure?.map((file, idx) => (
                    <div key={idx} className="glass-panel rounded-xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
                        {/* Header: Path & Type */}
                        <div className="px-5 py-3 bg-slate-900/50 border-b border-slate-800/50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {file.type === 'dir' ? <Folder size={16} className="text-yellow-500" /> : <FileCode size={16} className="text-primary" />}
                                <span className="font-mono text-sm text-slate-200 font-bold">{file.path}</span>
                            </div>
                        </div>

                        {/* Body: Function */}
                        <div className="p-5">
                            <div className="mb-4">
                                <h5 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Functionality</h5>
                                <p className="text-slate-300 text-sm leading-relaxed">{file.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Dependencies */}
                                <div>
                                    <h5 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                                        <Link2 size={12} /> Dependencies
                                    </h5>
                                    {file.dependencies.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {file.dependencies.map((dep, dIdx) => (
                                                <div key={dIdx} className="flex items-center gap-1 px-2 py-1 bg-slate-800/80 rounded text-[11px] text-blue-300 border border-slate-700/50">
                                                    <ArrowRight size={10} className="opacity-50" />
                                                    {dep}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-slate-600 italic">No external dependencies detected.</span>
                                    )}
                                </div>

                                {/* Potential Issues */}
                                <div>
                                    <h5 className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                                        <AlertTriangle size={12} className={file.potentialIssues.length > 0 ? "text-orange-500" : "text-slate-600"} /> 
                                        Potential Issues
                                    </h5>
                                    {file.potentialIssues.length > 0 ? (
                                        <ul className="space-y-1">
                                            {file.potentialIssues.map((issue, iIdx) => (
                                                <li key={iIdx} className="flex items-start gap-1.5 text-[11px] text-orange-200/80">
                                                    <span className="w-1 h-1 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></span>
                                                    {issue}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="text-xs text-green-500/70 flex items-center gap-1">
                                            Clean module structure.
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {(!analysis.repoStructure || analysis.repoStructure.length === 0) && (
                    <div className="p-8 text-center text-slate-500 glass-panel rounded-xl">
                        Unable to deduce detailed file structure from the available metadata.
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default IntelligenceTab;