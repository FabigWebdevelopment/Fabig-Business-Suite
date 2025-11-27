'use client'

import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartConfig = {
  without: {
    label: 'Ohne Smart Home',
    color: 'var(--chart-5)', // Muted shade
  },
  with: {
    label: 'Mit Smart Home',
    color: 'var(--chart-1)', // Primary chart color
  },
} satisfies ChartConfig

interface MonthlyBillChartProps {
  title?: string
  description?: string
  className?: string
  withoutSmartHome?: number
  withSmartHome?: number
}

export function MonthlyBillChart({
  title = 'Ihre Stromrechnung',
  description = 'Durchschnittliches Einfamilienhaus in München',
  className = '',
  withoutSmartHome = 320,
  withSmartHome = 195,
}: MonthlyBillChartProps) {
  const data = [
    { scenario: 'Ohne Smart Home', bill: withoutSmartHome, key: 'without' },
    { scenario: 'Mit Smart Home', bill: withSmartHome, key: 'with' },
  ]

  const savings = withoutSmartHome - withSmartHome
  const savingsPercent = Math.round((savings / withoutSmartHome) * 100)

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ left: 20, right: 60, top: 10, bottom: 10 }}
        >
          <XAxis
            type="number"
            domain={[0, Math.max(withoutSmartHome, withSmartHome) * 1.2]}
            tickFormatter={(value) => `€${value}`}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="scenario"
            width={130}
            tick={{ fontSize: 13, fontWeight: 500 }}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value) => [`€${value}/Monat`, '']}
          />
          <Bar dataKey="bill" radius={[0, 8, 8, 0]} barSize={40}>
            {data.map((entry) => (
              <Cell
                key={entry.key}
                fill={`var(--color-${entry.key})`}
              />
            ))}
            <LabelList
              dataKey="bill"
              position="right"
              formatter={(value: number) => `€${value}`}
              style={{ fontSize: 14, fontWeight: 600 }}
              className="fill-foreground"
            />
          </Bar>
        </BarChart>
      </ChartContainer>

      {/* Savings callout */}
      <div className="mt-6 p-4 bg-chart-1/10 rounded-xl border border-chart-1/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Sie sparen</p>
            <p className="text-3xl font-bold text-chart-1">€{savings}/Monat</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground font-medium">Pro Jahr</p>
            <p className="text-2xl font-bold text-chart-1">€{savings * 12}</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center gap-1 bg-chart-1 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{savingsPercent}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
