'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';
import type { Measurement } from '@/lib/types';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ProgressChartProps = {
  data: Measurement[];
};

export default function ProgressChart({ data }: ProgressChartProps) {
  const chartData = data.map(m => ({
    date: new Date(m.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
    weight: m.weight,
    bodyFat: m.bodyFat,
  }));

  const chartConfig = {
    weight: {
      label: 'Peso (kg)',
      color: 'hsl(var(--primary))',
    },
    bodyFat: {
      label: 'Gordura Corporal (%)',
      color: 'hsl(var(--accent))',
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Progresso ao Longo do Tempo</CardTitle>
        <CardDescription>Peso e Percentual de Gordura Corporal</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis yAxisId="left" stroke="hsl(var(--primary))" />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" />
            <Tooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="weight"
              type="monotone"
              stroke="var(--color-weight)"
              strokeWidth={2}
              yAxisId="left"
              dot={true}
            />
            <Line
              dataKey="bodyFat"
              type="monotone"
              stroke="var(--color-bodyFat)"
              strokeWidth={2}
              yAxisId="right"
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tendência de alta de 5.2% este mês <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Mostrando valores totais dos últimos 6 meses
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
