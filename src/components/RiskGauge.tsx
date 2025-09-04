import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RiskGauge({ score, size = 'md', className }: RiskGaugeProps) {
  const getRiskLevel = (score: number) => {
    if (score <= 30) return { level: 'low', color: 'hsl(var(--risk-low))', bg: 'hsl(var(--risk-low-bg))' };
    if (score <= 60) return { level: 'medium', color: 'hsl(var(--risk-medium))', bg: 'hsl(var(--risk-medium-bg))' };
    if (score <= 80) return { level: 'high', color: 'hsl(var(--risk-high))', bg: 'hsl(var(--risk-high-bg))' };
    return { level: 'critical', color: 'hsl(var(--risk-critical))', bg: 'hsl(var(--risk-critical-bg))' };
  };

  const risk = getRiskLevel(score);
  
  const data = [
    { name: 'Risk', value: score, fill: risk.color },
    { name: 'Safe', value: 100 - score, fill: 'hsl(var(--muted))' }
  ];

  const sizeConfig = {
    sm: { width: 120, height: 120, fontSize: 'text-lg', strokeWidth: 8 },
    md: { width: 160, height: 160, fontSize: 'text-2xl', strokeWidth: 10 },
    lg: { width: 200, height: 200, fontSize: 'text-3xl', strokeWidth: 12 }
  };

  const config = sizeConfig[size];

  return (
    <div className={cn("relative inline-block", className)}>
      <div style={{ width: config.width, height: config.height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="60%"
              outerRadius="90%"
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Score Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn("font-bold text-foreground", config.fontSize)}>
            {score}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Risk Score
          </div>
        </div>
      </div>
      
      {/* Risk Level Badge */}
      <div className="flex justify-center mt-2">
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border capitalize",
            `risk-${risk.level}`
          )}
        >
          {risk.level} Risk
        </div>
      </div>
    </div>
  );
}