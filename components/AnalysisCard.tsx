import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { LayoutDashboard, Layers, ShieldCheck, Code } from 'lucide-react';

import OverviewTab from './OverviewTab';
import SecurityTab from './SecurityTab';
import IntelligenceTab from './IntelligenceTab';
import BlueprintTab from './BlueprintTab';

interface AnalysisCardProps {
  analysis: AnalysisResult;
}

type TabView = 'overview' | 'intelligence' | 'security' | 'blueprint';

const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState<TabView>('overview');

  return (
    <div className="space-y-8 pb-12">
      
      {/* Navigation Tabs */}
      <div className="flex items-center justify-center md:justify-start overflow-x-auto no-scrollbar border-b border-slate-800/50 pb-1">
        {[
          { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'intelligence', label: 'Architecture', icon: Layers },
          { id: 'security', label: 'Security Center', icon: ShieldCheck },
          { id: 'blueprint', label: 'Code Blueprint', icon: Code },
        ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabView)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all relative ${
                        isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                    }`}
                >
                    <Icon size={16} className={isActive ? 'text-primary' : ''} />
                    {tab.label}
                    {isActive && (
                        <div className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                    )}
                </button>
            )
        })}
      </div>

      {/* Main Content Area - Delegated to Sub-components */}
      <div className="min-h-[500px]">
          {activeTab === 'overview' && <OverviewTab analysis={analysis} setActiveTab={setActiveTab} />}
          {activeTab === 'intelligence' && <IntelligenceTab analysis={analysis} />}
          {activeTab === 'security' && <SecurityTab analysis={analysis} />}
          {activeTab === 'blueprint' && <BlueprintTab analysis={analysis} />}
      </div>

    </div>
  );
};

export default AnalysisCard;