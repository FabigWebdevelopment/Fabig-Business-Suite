'use client'

import { Pie, PieChart, Cell, Label } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartConfig = {
  hardware: { label: 'Hardware', color: 'var(--chart-1)' },
  installation: { label: 'Installation', color: 'var(--chart-2)' },
  programming: { label: 'Programmierung', color: 'var(--chart-3)' },
  training: { label: 'Einweisung', color: 'var(--chart-5)' },
} satisfies ChartConfig

interface CostBreakdownChartProps {
  title?: string
  description?: string
  totalCost?: number
  className?: string
}

export function CostBreakdownChart({
  title = 'Worein fließt Ihr Geld?',
  description = 'Transparente Kostenaufstellung',
  totalCost = 12000,
  className = '',
}: CostBreakdownChartProps) {
  const chartData = [
    { name: 'Hardware & Komponenten', value: 50, amount: totalCost * 0.5, key: 'hardware' },
    { name: 'Installation', value: 25, amount: totalCost * 0.25, key: 'installation' },
    { name: 'Programmierung', value: 20, amount: totalCost * 0.2, key: 'programming' },
    { name: 'Einweisung', value: 5, amount: totalCost * 0.05, key: 'training' },
  ]

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ChartContainer config={chartConfig} className="h-[300px] w-full mx-auto">
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent />}
            formatter={(value, name, props) => {
              const item = props.payload
              return [`€${item.amount.toLocaleString()} (${item.value}%)`, item.name]
            }}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            strokeWidth={2}
            stroke="var(--background)"
          >
            {chartData.map((entry) => (
              <Cell key={entry.key} fill={`var(--color-${entry.key})`} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 8}
                        className="fill-foreground text-2xl font-bold"
                      >
                        €{totalCost.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 16}
                        className="fill-muted-foreground text-xs"
                      >
                        Gesamtkosten
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      {/* Cost breakdown list */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {chartData.map((item) => (
          <div
            key={item.key}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
          >
            <div
              className="w-4 h-4 rounded-full mt-0.5 flex-shrink-0"
              style={{ backgroundColor: `var(--color-${item.key})` }}
            />
            <div>
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-lg font-bold text-foreground">
                €{item.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
