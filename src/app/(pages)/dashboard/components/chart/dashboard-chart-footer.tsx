import { TrendingUp } from 'lucide-react';

import { CardFooter } from '@/ui/card';

export const DashboardChartFooter = () => {
	return (
		<CardFooter className="flex-col items-start gap-2 text-sm">
			<div className="text-primary flex items-center gap-1 font-medium">
				Aumento de 5,2% em relação ao mês anterior
				<TrendingUp className="h-4 w-4" />
			</div>
			<div className="text-muted-foreground">
				Monitorando os gastos de Janeiro a Maio de 2025
			</div>
		</CardFooter>
	);
}
