'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartData = [
  { feature: 'Flexibilität', knx: 95, loxone: 70 },
  { feature: 'Preis/Leistung', knx: 65, loxone: 90 },
  { feature: 'Automatisierung', knx: 75, loxone: 95 },
  { feature: 'Zukunftssicherheit', knx: 98, loxone: 80 },
  { feature: 'Einfache Bedienung', knx: 70, loxone: 95 },
  { feature: 'Nachrüstung', knx: 60, loxone: 85 },
]

const chartConfig = {
  knx: {
    label: 'KNX',
    color: 'var(--chart-1)',
  },
  loxone: {
    label: 'Loxone',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig

interface SystemComparisonChartProps {
  title?: string
  description?: string
  className?: string
}

export function SystemComparisonChart({
  title = 'KNX vs. Loxone im Vergleich',
  description = 'Stärken beider Systeme auf einen Blick',
  className = '',
}: SystemComparisonChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChartContainer config={chartConfig} className="h-[350px] w-full mx-auto">
        <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid className="stroke-border" />
          <PolarAngleAxis
            dataKey="feature"
            tick={{ fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fontSize: 10 }}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value) => [`${value} Punkte`, '']}
          />
          <Radar
            name="KNX"
            dataKey="knx"
            stroke="var(--color-knx)"
            fill="var(--color-knx)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Radar
            name="Loxone"
            dataKey="loxone"
            stroke="var(--color-loxone)"
            fill="var(--color-loxone)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Legend wrapperStyle={{ fontSize: '14px' }} />
        </RadarChart>
      </ChartContainer>

      {/* Quick summary */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 rounded-xl bg-chart-1/10 border border-chart-1/20">
          <p className="font-bold text-chart-1">KNX</p>
          <p className="text-sm text-muted-foreground mt-1">
            Maximale Flexibilität & Zukunftssicherheit
          </p>
          <p className="text-sm text-muted-foreground">
            Ideal für Neubauten
          </p>
          <p className="text-sm font-medium text-chart-1 mt-2">
            ab €12.000
          </p>
        </div>
        <div className="p-4 rounded-xl bg-chart-4/10 border border-chart-4/20">
          <p className="font-bold text-chart-4">Loxone</p>
          <p className="text-sm text-muted-foreground mt-1">
            Beste Automatisierung & Bedienung
          </p>
          <p className="text-sm text-muted-foreground">
            Ideal für Nachrüstung
          </p>
          <p className="text-sm font-medium text-chart-4 mt-2">
            ab €8.000
          </p>
        </div>
      </div>
    </div>
  )
}
