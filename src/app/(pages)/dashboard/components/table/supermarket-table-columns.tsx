import type { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/ui/badge';

import {
	statusColor,
	SupermarketStatusBadge,
} from './supermarket-status-badge';

export interface PurchaseItem {
	status: 'Finalizado' | 'Cancelado' | 'Pendente';
	supermarket: string;
	address: string;
	total: string;
	date: string;
	id: string;
}

export const columns: ColumnDef<PurchaseItem>[] = [
	{
		accessorKey: 'supermarket',
		header: () => 'Supermercado',
		cell: info => (
			<div className="md:table-cell">
				<div className="space-y-1 md:hidden">
					<div className="text-foreground font-medium">
						{info.row.original.supermarket}
					</div>
					<div className="text-muted-foreground text-xs">
						{info.row.original.date}
					</div>
					<div className="text-xs font-medium">{info.row.original.total}</div>
					<Badge
						variant="outline"
						className={`border ${statusColor[info.row.original.status]} font-semibold`}
					>
						{info.row.original.status}
					</Badge>
				</div>
				<span className="text-foreground hidden font-medium md:inline">
					{info.row.original.supermarket}
				</span>
			</div>
		),
	},
	{
		accessorKey: 'address',
		header: () => <span className="hidden lg:inline">Endereço</span>,
		cell: info => (
			<span className="text-muted-foreground hidden lg:inline">
				{info.row.original.address}
			</span>
		),
	},
	{
		accessorKey: 'date',
		header: () => <span className="hidden lg:inline">Data da Compra</span>,
		cell: info => (
			<span className="text-muted-foreground hidden lg:inline">
				{info.row.original.date}
			</span>
		),
	},
	{
		accessorKey: 'status',
		header: () => <span className="hidden lg:inline">Status</span>,
		cell: info => (
			<span className="hidden lg:inline">
				<SupermarketStatusBadge status={info.row.original.status} />
			</span>
		),
	},
	{
		accessorKey: 'total',
		header: () => <div className="hidden text-right lg:block">Valor Total</div>,
		cell: info => (
			<div className="hidden text-right font-semibold lg:block lg:text-emerald-600">
				{info.row.original.total}
			</div>
		),
	},
];
