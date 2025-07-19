import type { ColumnDef } from '@tanstack/react-table';

import { cn } from '@/lib/clsx/utils';
import { Badge } from '@/ui/badge';

export interface PurchaseItem {
	status: 'Finalizado' | 'Cancelado' | 'Pendente';
	supermarket: string;
	location: string;
	total: string;
	date: string;
	id: string;
}

export const columns: ColumnDef<PurchaseItem>[] = [
	{
		header: 'Supermercado',
		accessorKey: 'supermarket',
		cell: ({ row }) => (
			<span className="font-medium">{row.original.supermarket}</span>
		),
		size: 140,
		enableHiding: false,
	},
	{
		header: 'Endereço',
		accessorKey: 'location',
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.original.location}</span>
		),
		size: 140,
	},
	{
		header: 'Data da compra',
		accessorKey: 'date',
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.original.date}</span>
		),
		size: 120,
	},
	{
		header: 'Status',
		accessorKey: 'status',
		cell: ({ row }) => (
			<Badge
				variant="outline"
				className={cn('flex items-center gap-1.5 px-2 py-0.5 text-xs')}
			>
				{row.original.status === 'Cancelado' && (
					<span
						className="size-1.5 rounded-full bg-red-500"
						aria-hidden="true"
					></span>
				)}
				{row.original.status === 'Finalizado' && (
					<span
						className="size-1.5 rounded-full bg-emerald-500"
						aria-hidden="true"
					></span>
				)}
				{row.original.status === 'Pendente' && (
					<span
						className="bg-primary size-1.5 rounded-full"
						aria-hidden="true"
					></span>
				)}
				{row.original.status}
			</Badge>
		),
		size: 110,
	},
	{
		header: 'Valor Total',
		accessorKey: 'total',
		cell: ({ row }) => (
			<span className="text-foreground font-medium">{row.original.total}</span>
		),
		size: 80,
	},
];
