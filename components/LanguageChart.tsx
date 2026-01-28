import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { RepoLanguages } from '../types';

interface LanguageChartProps {
  languages: RepoLanguages;
}

// Updated Palette: Cyan, Teal, Violet, Pink, Blue, Indigo
const COLORS = ['#06b6d4', '#14b8a6', '#8b5cf6', '#ec4899', '#3b82f6', '#6366f1'];

const LanguageChart: React.FC<LanguageChartProps> = ({ languages }) => {
  const data = Object.entries(languages).map(([name, value]) => ({ name, value: value as number }));
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  const filteredData = data.filter(d => (d.value / total) > 0.01).sort((a, b) => b.value - a.value);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={filteredData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {filteredData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                borderColor: '#334155', 
                color: '#f1f5f9',
                borderRadius: '8px',
                backdropFilter: 'blur(4px)'
            }}
            itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
            formatter={(value: number) => `${((value / total) * 100).toFixed(1)}%`}
          />
          <Legend 
            verticalAlign="middle" 
            align="right"
            layout="vertical"
            iconType="circle"
            wrapperStyle={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'JetBrains Mono' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LanguageChart;