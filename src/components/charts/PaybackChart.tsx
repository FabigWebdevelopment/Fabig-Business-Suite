'use client'

import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ReferenceLine, ComposedChart } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartConfig = {
  netValue: {
    label: 'Bilanz',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

interface PaybackChartProps {
  title?: string
  description?: string
  className?: string
  investment?: number
  annualSavings?: number
  years?: number
}

export function PaybackChart({
  title = 'Wann zahlt sich Smart Home aus?',
  description = 'Ihre Investition vs. kumulative Ersparnis',
  className = '',
  investment = 12000,
  annualSavings = 1500,
  years = 15,
}: PaybackChartProps) {
  // Generate realistic data
  const chartData = []
  for (let year = 0; year <= years; year++) {
    const totalSavings = year * annualSavings
    const netValue = totalSavings - investment
    chartData.push({
      year: `Jahr ${year}`,
      yearNum: year,
      investment: -investment,
      savings: totalSavings,
      netValue: netValue,
    })
  }

  const breakEvenYear = Math.ceil(investment / annualSavings)
  const totalSavings15Years = 15 * annualSavings
  const netProfit15Years = totalSavings15Years - investment

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ComposedChart data={chartData} margin={{ left: 10, right: 10, top: 20, bottom: 10 }}>
          <defs>
            <linearGradient id="colorNetValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-netValue)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-netValue)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11 }}
            tickFormatter={(value) => value.replace('Jahr ', '')}
          />
          <YAxis
            tickFormatter={(value) => {
              if (value >= 0) return `+€${(value / 1000).toFixed(0)}k`
              return `-€${(Math.abs(value) / 1000).toFixed(0)}k`
            }}
            tick={{ fontSize: 11 }}
            domain={[-investment * 1.1, totalSavings15Years * 0.8]}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value) => {
              const num = Number(value)
              if (num >= 0) return [`+€${num.toLocaleString()}`, 'Bilanz']
              return [`-€${Math.abs(num).toLocaleString()}`, 'Bilanz']
            }}
          />
          <ReferenceLine
            y={0}
            stroke="var(--muted-foreground)"
            strokeDasharray="5 5"
            strokeWidth={1}
          />
          <Area
            type="monotone"
            dataKey="netValue"
            stroke="var(--color-netValue)"
            fill="url(#colorNetValue)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: 'var(--color-netValue)' }}
          />
        </ComposedChart>
      </ChartContainer>

      {/* Key metrics */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-muted/50 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground font-medium">Investition</p>
          <p className="text-2xl font-bold text-foreground">
            €{investment.toLocaleString()}
          </p>
        </div>
        <div className="text-center p-4 bg-chart-1/10 rounded-xl border border-chart-1/20">
          <p className="text-sm text-chart-1 font-medium">Break-Even</p>
          <p className="text-2xl font-bold text-chart-1">
            ~{breakEvenYear} Jahre
          </p>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-xl border border-border">
          <p className="text-sm text-muted-foreground font-medium">Gewinn nach 15J</p>
          <p className="text-2xl font-bold text-foreground">
            +€{netProfit15Years.toLocaleString()}
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        * Basierend auf durchschnittlichen Energieeinsparungen von €{annualSavings.toLocaleString()}/Jahr
      </p>
    </div>
  )
}
