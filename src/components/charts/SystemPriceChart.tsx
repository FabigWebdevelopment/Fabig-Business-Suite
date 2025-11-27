'use client'

import { Bar, BarChart, XAxis, YAxis, Cell, LabelList } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartData = [
  {
    system: 'KNX',
    minPrice: 12000,
    maxPrice: 25000,
    avgPrice: 18500,
    key: 'knx',
  },
  {
    system: 'Loxone',
    minPrice: 8000,
    maxPrice: 18000,
    avgPrice: 13000,
    key: 'loxone',
  },
  {
    system: 'Homematic IP',
    minPrice: 3000,
    maxPrice: 8000,
    avgPrice: 5500,
    key: 'homematic',
  },
]

const chartConfig = {
  knx: {
    label: 'KNX',
    color: 'var(--chart-1)',
  },
  loxone: {
    label: 'Loxone',
    color: 'var(--chart-2)',
  },
  homematic: {
    label: 'Homematic IP',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

interface SystemPriceChartProps {
  title?: string
  description?: string
  className?: string
}

export function SystemPriceChart({
  title = 'Was kostet Smart Home wirklich?',
  description = 'Komplettpreise für ein typisches Einfamilienhaus (120-150m²)',
  className = '',
}: SystemPriceChartProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 20, right: 80, top: 20, bottom: 20 }}
        >
          <XAxis
            type="number"
            domain={[0, 30000]}
            tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="system"
            width={100}
            tick={{ fontSize: 14, fontWeight: 600 }}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value, name, props) => {
              const item = props.payload
              return [
                `€${item.minPrice.toLocaleString()} - €${item.maxPrice.toLocaleString()}`,
                'Preisspanne'
              ]
            }}
          />
          <Bar dataKey="avgPrice" radius={[0, 8, 8, 0]} barSize={35}>
            {chartData.map((entry) => (
              <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
            ))}
            <LabelList
              dataKey="avgPrice"
              position="right"
              formatter={(value: number) => `Ø €${(value / 1000).toFixed(1)}k`}
              style={{ fontSize: 13, fontWeight: 600 }}
              className="fill-foreground"
            />
          </Bar>
        </BarChart>
      </ChartContainer>

      {/* Price breakdown */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {chartData.map((system) => (
          <div
            key={system.system}
            className="p-3 rounded-lg bg-muted/50 border border-border"
          >
            <p className="font-bold text-sm text-foreground">{system.system}</p>
            <p className="text-xs text-muted-foreground mt-1">
              €{system.minPrice.toLocaleString()} - €{system.maxPrice.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              inkl. Installation
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        * Preise für schlüsselfertige Installation in München
      </p>
    </div>
  )
}
