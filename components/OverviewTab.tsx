import React from 'react';
import { AnalysisResult } from '../types';
import { Lightbulb, ShieldCheck, Code, BookOpen } from 'lucide-react';
import { CircularGauge, ComplexityMeter } from './DashboardWidgets';

interface OverviewTabProps {
  analysis: AnalysisResult;
  setActiveTab: (tab: any) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ analysis, setActiveTab }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
        {/* 1. Innovation Score */}
        <CircularGauge 
            score={analysis.innovationScore} 
            color={analysis.innovationScore > 80 ? '#10b981' : analysis.innovationScore > 50 ? '#06b6d4' : '#f59e0b'}
            label="Innovation Index"
            icon={Lightbulb}
            onClick={() => setActiveTab('intelligence')}
        />

        {/* 2. Security Score */}
        <CircularGauge 
            score={analysis.securityAnalysis.score} 
            color={analysis.securityAnalysis.score > 80 ? '#10b981' : analysis.securityAnalysis.score > 50 ? '#eab308' : '#ef4444'}
            label="Security Health"
            icon={ShieldCheck}
            onClick={() => setActiveTab('security')}
        />

        {/* 3. Complexity */}
        <ComplexityMeter 
            level={analysis.complexity} 
            onClick={() => setActiveTab('intelligence')}
        />

        {/* 4. Blueprint CTA */}
        <button onClick={() => setActiveTab('blueprint')} className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 transition-all hover:bg-slate-800/50 hover:border-primary/30 hover:scale-[1.02] group relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                <Code size={32} />
            </div>
            <div className="relative z-10">
                <h4 className="text-white font-bold text-lg">Project Blueprint</h4>
                <p className="text-xs text-slate-400 mt-1">View AI-Generated MVP Code</p>
            </div>
        </button>

        {/* Executive Summary (Full Width) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 glass-panel rounded-2xl p-8 border-t border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-slate-400" size={20} />
                <h3 className="text-xl font-bold text-white">Executive Summary</h3>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg">{analysis.summary}</p>
             <div className="flex flex-wrap gap-2 mt-6">
                {analysis.techStack.slice(0, 5).map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">
                        {tech}
                    </span>
                ))}
                {analysis.techStack.length > 5 && <span className="px-3 py-1 text-xs text-slate-500">+{analysis.techStack.length - 5} more</span>}
            </div>
        </div>
    </div>
  );
};

export default OverviewTab;