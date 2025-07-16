'use client';
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';

import { ChartConfig, ChartTooltip, ChartTooltipContent } from '@/ui/chart';

import { formatCurrency } from '../../../../../helpers/format-currency';

type DashboardBarChartProps = {
	chartData: { month: string; total: number }[];
	chartConfig: ChartConfig;
};

export const DashboardBarChart = ({ chartData }: DashboardBarChartProps) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={chartData} margin={{ top: 20 }} barSize={94}>
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
					content={<ChartTooltipContent formatter={formatCurrency} hideLabel />}
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
	);
};
