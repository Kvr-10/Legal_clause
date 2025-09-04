import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface RiskChartProps {
  data: Record<string, number>;
  type?: 'bar' | 'pie';
  title?: string;
  description?: string;
}

const RISK_COLORS = [
  'hsl(var(--risk-high))',
  'hsl(var(--risk-medium))',
  'hsl(var(--risk-low))',
  'hsl(var(--primary))',
];

export function RiskChart({ 
  data, 
  type = 'bar', 
  title = "Risk Categories",
  description = "Risk scores by category"
}: RiskChartProps) {
  const chartData = Object.entries(data).map(([name, value], index) => ({
    name: name.replace(' Risk', ''),
    value,
    fill: RISK_COLORS[index % RISK_COLORS.length]
  }));

  const chartConfig = {
    value: {
      label: "Risk Score",
    },
  };

  if (type === 'pie') {
    return (
      <Card className="shadow-card border-0 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="text-sm text-muted-foreground">
                  {item.name}: {item.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card border-0 bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                fill="hsl(var(--primary))"
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}