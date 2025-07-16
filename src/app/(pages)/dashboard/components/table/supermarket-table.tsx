'use client';

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useState } from 'react';

import { AllRoutes } from '@/app/enums/all-routes';
import { Card, CardHeader } from '@/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/table';

import { columns, PurchaseItem } from './supermarket-table-columns';
import { SupermarketTablePagination } from './supermarket-table-pagination';

const data: PurchaseItem[] = [
	{
		id: '1',
		supermarket: 'Atakarejo',
		address: 'Rua Jurema, 608',
		date: '10/07/2025',
		status: 'Finalizado',
		total: 'R$ 320,00',
	},
	{
		id: '2',
		supermarket: 'Assaí',
		address: 'Av. Brasil, 1001',
		date: '03/07/2025',
		status: 'Pendente',
		total: 'R$ 180,00',
	},
	{
		id: '3',
		supermarket: 'Carrefour',
		address: 'Rua das Flores, 225',
		date: '25/06/2025',
		status: 'Finalizado',
		total: 'R$ 275,00',
	},
	{
		id: '4',
		supermarket: 'Big Bompreço',
		address: 'Av. Salvador, 52',
		date: '15/06/2025',
		status: 'Cancelado',
		total: 'R$ 0,00',
	},
	{
		id: '5',
		supermarket: 'GBarbosa',
		address: 'Rua Central, 321',
		date: '05/06/2025',
		status: 'Finalizado',
		total: 'R$ 420,00',
	},
	{
		id: '6',
		supermarket: 'Extra',
		address: 'Rua da Paz, 77',
		date: '28/05/2025',
		status: 'Finalizado',
		total: 'R$ 230,00',
	},
];

export const SupermarketTable = () => {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: { pagination },
		onPaginationChange: setPagination,
	});

	return (
		<Card className="bg-sidebar flex min-h-[300px] flex-col justify-between space-y-4 p-4 shadow-md">
			<CardHeader className="hidden lg:grid lg:gap-2 lg:p-0">
				<p className="text-xs">Para mais detalhes, acesse:</p>
				<Link
					href={AllRoutes.DASHBOARD_PURCHASES_HISTORY}
					className="bg-primary text-background w-fit rounded p-1.5 text-sm shadow-xl"
				>
					Minhas Compras
				</Link>
			</CardHeader>

			<Table className="h-full table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
				<TableHeader className="hidden lg:table-header-group">
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id} className="hover:bg-transparent">
							{headerGroup.headers.map(header => (
								<TableHead
									key={header.id}
									className="text-primary text-xs font-semibold uppercase"
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map(row => (
						<TableRow key={row.id} className="hover:bg-primary/5">
							{row.getVisibleCells().map(cell => (
								<TableCell key={cell.id} className="text-sm">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<SupermarketTablePagination
				pageIndex={pagination.pageIndex}
				pageCount={table.getPageCount()}
				canPreviousPage={table.getCanPreviousPage()}
				canNextPage={table.getCanNextPage()}
				onPrevious={() => table.previousPage()}
				onNext={() => table.nextPage()}
			/>
		</Card>
	);
};
