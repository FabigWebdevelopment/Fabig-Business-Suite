'use client'

import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

// Real € amounts users save per month
const chartData = [
  { feature: 'Intelligente Heizung', savings: 85, key: 'heating' },
  { feature: 'Präsenzsteuerung', savings: 45, key: 'presence' },
  { feature: 'Automatische Jalousien', savings: 35, key: 'blinds' },
  { feature: 'LED-Beleuchtung', savings: 25, key: 'lighting' },
  { feature: 'Standby-Abschaltung', savings: 15, key: 'standby' },
]

const chartConfig = {
  heating: { label: 'Heizung', color: 'var(--chart-1)' },
  presence: { label: 'Präsenz', color: 'var(--chart-2)' },
  blinds: { label: 'Jalousien', color: 'var(--chart-3)' },
  lighting: { label: 'Beleuchtung', color: 'var(--chart-4)' },
  standby: { label: 'Standby', color: 'var(--chart-5)' },
} satisfies ChartConfig

interface EnergySavingsChartProps {
  title?: string
  description?: string
  className?: string
}

export function EnergySavingsChart({
  title = 'Wo Sie am meisten sparen',
  description = 'Monatliche Ersparnis pro Smart Home Funktion',
  className = '',
}: EnergySavingsChartProps) {
  const totalSavings = chartData.reduce((sum, item) => sum + item.savings, 0)

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChartContainer config={chartConfig} className="h-[320px] w-full">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 20, right: 60, top: 10, bottom: 10 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => `€${value}`}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="feature"
            width={150}
            tick={{ fontSize: 12 }}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value) => [`€${value}/Monat`, 'Ersparnis']}
          />
          <Bar dataKey="savings" radius={[0, 6, 6, 0]} barSize={28}>
            {chartData.map((entry) => (
              <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
            ))}
            <LabelList
              dataKey="savings"
              position="right"
              formatter={(value: number) => `€${value}`}
              style={{ fontSize: 13, fontWeight: 600 }}
              className="fill-foreground"
            />
          </Bar>
        </BarChart>
      </ChartContainer>

      {/* Total savings callout */}
      <div className="mt-4 p-4 bg-chart-1/10 rounded-xl border border-chart-1/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Gesamtersparnis mit allen Funktionen</p>
            <p className="text-2xl font-bold text-chart-1">
              €{totalSavings}/Monat = €{totalSavings * 12}/Jahr
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
