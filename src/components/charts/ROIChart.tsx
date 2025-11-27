'use client'

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartData = [
  { year: 'Jahr 0', investment: -10000, savings: 0, cumulative: -10000 },
  { year: 'Jahr 1', investment: -10000, savings: 1200, cumulative: -8800 },
  { year: 'Jahr 2', investment: -10000, savings: 2400, cumulative: -7600 },
  { year: 'Jahr 3', investment: -10000, savings: 3600, cumulative: -6400 },
  { year: 'Jahr 4', investment: -10000, savings: 4800, cumulative: -5200 },
  { year: 'Jahr 5', investment: -10000, savings: 6000, cumulative: -4000 },
  { year: 'Jahr 6', investment: -10000, savings: 7200, cumulative: -2800 },
  { year: 'Jahr 7', investment: -10000, savings: 8400, cumulative: -1600 },
  { year: 'Jahr 8', investment: -10000, savings: 9600, cumulative: -400 },
  { year: 'Jahr 9', investment: -10000, savings: 10800, cumulative: 800 },
  { year: 'Jahr 10', investment: -10000, savings: 12000, cumulative: 2000 },
  { year: 'Jahr 12', investment: -10000, savings: 14400, cumulative: 4400 },
  { year: 'Jahr 15', investment: -10000, savings: 18000, cumulative: 8000 },
]

const chartConfig = {
  cumulative: {
    label: 'Kumulierte Ersparnis',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

interface ROIChartProps {
  title?: string
  description?: string
  className?: string
}

export function ROIChart({
  title = 'Return on Investment',
  description = 'Wann sich Ihre Smart Home Investition bezahlt macht',
  className = '',
}: ROIChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart data={chartData} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis
            tickFormatter={(value) => `${value >= 0 ? '+' : ''}${(value / 1000).toFixed(0)}k€`}
            tick={{ fontSize: 11 }}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value) => [
              `${Number(value) >= 0 ? '+' : ''}${Number(value).toLocaleString()}€`,
              'Bilanz',
            ]}
          />
          <ReferenceLine y={0} stroke="var(--muted-foreground)" strokeDasharray="5 5" />
          <defs>
            <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-cumulative)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-cumulative)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="cumulative"
            stroke="var(--color-cumulative)"
            fill="url(#colorCumulative)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="text-center">
          <span className="text-2xl font-bold text-chart-1">~8-9</span>
          <p className="text-xs text-muted-foreground">Jahre bis Break-Even</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-chart-1">+8.000€</span>
          <p className="text-xs text-muted-foreground">Ersparnis nach 15 Jahren</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-chart-1">1.200€</span>
          <p className="text-xs text-muted-foreground">Jährliche Ersparnis</p>
        </div>
      </div>
    </div>
  )
}
