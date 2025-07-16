'use client';

import { TrendingUp } from 'lucide-react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/ui/chart';

const chartData = [
	{ month: 'Janeiro', total: 186 },
	{ month: 'Fevereiro', total: 305 },
	{ month: 'Março', total: 237 },
	{ month: 'Abril', total: 73 },
];

const chartConfig = {
	total: {
		label: 'Total',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export default function DashboardChart() {
	return (
		<Card className="bg-sidebar">
			<CardHeader>
				<CardTitle>Gastos Mensais</CardTitle>
				<CardDescription>Resumo de compras nos últimos 4 meses</CardDescription>
			</CardHeader>
			<CardContent className="h-[350px] w-full">
				<ChartContainer config={chartConfig} className="h-full w-full">
					<div className="h-full w-full">
						{/* Desktop */}
						<div className="hidden h-full w-full md:block">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={chartData} margin={{ top: 20 }} barSize={54}>
									<CartesianGrid vertical={false} strokeDasharray="3 3" />
									<XAxis
										dataKey="month"
										tickLine={false}
										tickMargin={10}
										axisLine={false}
										tickFormatter={month => month.slice(0, 3)}
									/>
									<YAxis
										tickFormatter={value =>
											Number(value).toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
												minimumFractionDigits: 0,
											})
										}
										axisLine={false}
										tickLine={false}
									/>
									<ChartTooltip
										cursor={false}
										content={
											<ChartTooltipContent
												formatter={formatCurrency}
												hideLabel
											/>
										}
									/>
									<Bar dataKey="total" fill="var(--color-primary)" radius={8}>
										<LabelList
											position="top"
											offset={12}
											className="fill-primary/70"
											fontSize={12}
											formatter={formatCurrency}
										/>
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>

						{/* Mobile */}
						<div className="h-full w-full md:hidden">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart
									data={chartData}
									margin={{ top: 20, left: 8, right: 8 }}
								>
									<CartesianGrid vertical={false} strokeDasharray="3 3" />
									<XAxis
										dataKey="month"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										tickFormatter={month => month.slice(0, 3)}
									/>
									<YAxis
										tickFormatter={value =>
											Number(value).toLocaleString('pt-BR', {
												style: 'currency',
												currency: 'BRL',
												minimumFractionDigits: 0,
											})
										}
										axisLine={false}
										tickLine={false}
									/>
									<ChartTooltip
										cursor={false}
										content={
											<ChartTooltipContent
												formatter={formatCurrency}
												hideLabel
											/>
										}
									/>
									<Line
										dataKey="total"
										type="natural"
										stroke="var(--color-primary)"
										strokeWidth={2}
										dot={{ fill: 'var(--color-primary)' }}
										activeDot={{ r: 6 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="text-primary flex items-center gap-1 font-medium">
					Aumento de 5,2% em relação ao mês anterior
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="text-muted-foreground">
					Monitorando os gastos de Janeiro a Abril de 2025
				</div>
			</CardFooter>
		</Card>
	);
}

function formatCurrency(value: (number | string)[] | number | string): string {
	if (Array.isArray(value)) {
		return value.map(formatCurrency).join(', ');
	}
	const num = typeof value === 'number' ? value : parseFloat(value);
	return num.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
	});
}
