import React from 'react';
import { ArrowRight, GitMerge } from 'lucide-react';

// --- Circular Gauge Component ---
interface CircularGaugeProps {
  score: number;
  color: string;
  label: string;
  icon: any;
  onClick: () => void;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({ score, color, label, icon: Icon, onClick }) => (
  <button onClick={onClick} className="relative group w-full h-full glass-panel rounded-2xl p-6 flex flex-col items-center justify-center transition-all hover:bg-slate-800/50 hover:border-primary/30 hover:scale-[1.02] cursor-pointer">
     <div className="absolute top-4 right-4 text-slate-600 group-hover:text-white transition-colors">
        <ArrowRight size={18} />
     </div>
     <div className="relative z-10 flex items-center justify-center my-4">
         {/* Background Circle - Added viewBox for responsive scaling */}
         <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
             <circle cx="64" cy="64" r="52" stroke="#1e293b" strokeWidth="8" fill="transparent" />
             <circle 
                cx="64" cy="64" r="52" 
                stroke={color}
                strokeWidth="8" 
                strokeLinecap="round"
                fill="transparent" 
                strokeDasharray={326.7} 
                strokeDashoffset={326.7 - (326.7 * score) / 100} 
                className="transition-all duration-1000 ease-out"
             />
         </svg>
         <div className="absolute inset-0 flex flex-col items-center justify-center">
             <Icon size={28} className="text-slate-400 mb-1" />
             <span className="text-3xl font-bold text-white">{score}</span>
         </div>
     </div>
     <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest">{label}</h4>
  </button>
);

// --- Complexity Meter Component ---
interface ComplexityMeterProps {
  level: 'Low' | 'Medium' | 'High';
  onClick: () => void;
}

export const ComplexityMeter: React.FC<ComplexityMeterProps> = ({ level, onClick }) => {
    const levels = ['Low', 'Medium', 'High'];
    const activeIdx = levels.indexOf(level);
    const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500'];
    
    return (
      <button onClick={onClick} className="w-full glass-panel rounded-2xl p-6 flex flex-col justify-between items-start transition-all hover:bg-slate-800/50 hover:border-primary/30 hover:scale-[1.02] cursor-pointer group">
           <div className="flex justify-between w-full mb-4">
               <div className="p-2 bg-slate-800 rounded-lg text-slate-300 border border-slate-700">
                  <GitMerge size={20} />
               </div>
               <ArrowRight size={18} className="text-slate-600 group-hover:text-white transition-colors" />
           </div>
           
           <div className="w-full space-y-4">
               <div>
                  <h4 className="text-white font-bold text-lg">{level} Complexity</h4>
                  <p className="text-xs text-slate-400">Architectural Density</p>
               </div>
               
               <div className="flex gap-1 h-2 w-full">
                   {levels.map((l, i) => (
                       <div key={l} className={`flex-1 rounded-full opacity-30 ${i <= activeIdx ? colors[activeIdx] + ' opacity-100' : 'bg-slate-700'}`}></div>
                   ))}
               </div>
           </div>
      </button>
    );
};