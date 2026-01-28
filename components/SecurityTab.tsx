import React from 'react';
import { AnalysisResult } from '../types';
import { ShieldCheck, ShieldAlert, Check, CheckCircle2 } from 'lucide-react';

interface SecurityTabProps {
  analysis: AnalysisResult;
}

const SecurityTab: React.FC<SecurityTabProps> = ({ analysis }) => {
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'Moderate': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Low': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-green-400 bg-green-400/10 border-green-400/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="glass-panel rounded-2xl p-8 border-l-4 border-l-red-500/50 flex flex-col md:flex-row gap-8 items-center">
             <div className="relative flex-shrink-0">
                 <ShieldCheck size={80} className={analysis.securityAnalysis.score > 80 ? 'text-green-500' : analysis.securityAnalysis.score > 50 ? 'text-yellow-500' : 'text-red-500'} />
                 <div className="absolute bottom-0 right-0 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded border border-slate-700">
                    {analysis.securityAnalysis.score}/100
                 </div>
             </div>
             <div>
                 <h3 className="text-2xl font-bold text-white mb-2">Security Risk Assessment</h3>
                 <p className="text-slate-400 mb-4">
                     Risk Level: <span className={`px-2 py-0.5 rounded text-sm font-bold border ${getRiskColor(analysis.securityAnalysis.riskLevel)}`}>{analysis.securityAnalysis.riskLevel}</span>
                 </p>
                 <p className="text-sm text-slate-300 max-w-2xl">
                     This audit highlights potential vulnerabilities in the codebase. A lower score indicates significant security risks that should be addressed before deployment.
                 </p>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
                <h4 className="text-white font-bold flex items-center gap-2">
                    <ShieldAlert size={18} className="text-red-400" />
                    Detected Vulnerabilities
                </h4>
                {analysis.securityAnalysis.vulnerabilities.length > 0 ? (
                    analysis.securityAnalysis.vulnerabilities.map((vuln, idx) => (
                        <div key={idx} className="glass-panel p-4 rounded-xl border-l-4 border-l-slate-700 hover:border-l-primary transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-sm text-primary font-bold">{vuln.type}</span>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                                    vuln.severity === 'Critical' ? 'bg-red-500 text-white' : 
                                    vuln.severity === 'High' ? 'bg-orange-500/20 text-orange-400' : 
                                    vuln.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                                }`}>{vuln.severity}</span>
                            </div>
                            <p className="text-sm text-slate-300">{vuln.description}</p>
                        </div>
                    ))
                ) : (
                    <div className="glass-panel p-8 text-center rounded-xl">
                        <CheckCircle2 size={40} className="mx-auto text-green-500 mb-4" />
                        <p className="text-slate-300">No major vulnerabilities detected by AI audit.</p>
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-bold flex items-center gap-2">
                    <Check size={18} className="text-green-400" />
                    Compliance Checks
                </h4>
                <div className="glass-panel rounded-xl p-4">
                    <ul className="space-y-3">
                        {analysis.securityAnalysis.complianceCheck.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                <div className="mt-0.5 w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SecurityTab;