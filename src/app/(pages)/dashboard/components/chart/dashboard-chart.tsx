'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/ui/card';
import { ChartConfig, ChartContainer } from '@/ui/chart';

import { DashboardBarChart } from './dashboard-bar-chart';
import { DashboardChartFooter } from './dashboard-chart-footer';
import { DashboardLineChart } from './dashboard-line-chart';

const chartData = [
	{ month: 'Janeiro', total: 186 },
	{ month: 'Fevereiro', total: 305 },
	{ month: 'Março', total: 237 },
	{ month: 'Abril', total: 73 },
	{ month: 'Maio', total: 120 },
];

const chartConfig = {
	total: {
		label: 'Total',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

export const DashboardChart = () => {
	return (
		<Card className="bg-sidebar">
			<CardHeader>
				<CardTitle>Gastos Mensais</CardTitle>
				<CardDescription>Resumo de compras nos últimos 5 meses</CardDescription>
			</CardHeader>
			<CardContent className="h-[350px] w-full">
				<ChartContainer config={chartConfig} className="h-full w-full">
					<div className="h-full w-full">
						{/* Desktop */}
						<div className="hidden h-full w-full md:block">
							<DashboardBarChart
								chartData={chartData}
								chartConfig={chartConfig}
							/>
						</div>
						{/* Mobile */}
						<div className="h-full w-full md:hidden">
							<DashboardLineChart
								chartData={chartData}
								chartConfig={chartConfig}
							/>
						</div>
					</div>
				</ChartContainer>
			</CardContent>
			<DashboardChartFooter />
		</Card>
	);
};
