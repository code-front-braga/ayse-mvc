import { Badge } from '@/ui/badge';

export const statusColor = {
	Finalizado: 'bg-emerald-100 text-emerald-700 border-emerald-300',
	Pendente: 'bg-yellow-100 text-yellow-700 border-yellow-300',
	Cancelado: 'bg-red-100 text-red-700 border-red-300',
};

type SupermarketStatusBadgeProps = {
	status: 'Finalizado' | 'Cancelado' | 'Pendente';
	className?: string;
};

export function SupermarketStatusBadge({
	status,
	className,
}: SupermarketStatusBadgeProps) {
	return (
		<Badge
			variant="outline"
			className={`border ${statusColor[status]} font-semibold ${className ?? ''}`.trim()}
		>
			{status}
		</Badge>
	);
}
