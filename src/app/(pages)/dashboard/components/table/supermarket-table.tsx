'use client';

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { useState } from 'react';

import { AllRoutes } from '@/enums/all-routes';
import { Card, CardHeader } from '@/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/ui/table';

import CustomTableBody from '../custom-table-body';
import { columns, PurchaseItem } from './supermarket-table-columns';
import { SupermarketTablePagination } from './supermarket-table-pagination';

const data: PurchaseItem[] = [
	{
		id: '1',
		supermarket: 'Atakarejo',
		location: 'Rua Jurema, 608',
		date: '10/07/2025',
		status: 'finalizado',
		total: 'R$ 320,00',
	},
	{
		id: '2',
		supermarket: 'Assaí',
		location: 'Av. Brasil, 1001',
		date: '03/07/2025',
		status: 'pendente',
		total: 'R$ 180,00',
	},
	{
		id: '3',
		supermarket: 'Carrefour',
		location: 'Rua das Flores, 225',
		date: '25/06/2025',
		status: 'finalizado',
		total: 'R$ 275,00',
	},
	{
		id: '4',
		supermarket: 'Big Bompreço',
		location: 'Av. Salvador, 52',
		date: '15/06/2025',
		status: 'cancelado',
		total: 'R$ 0,00',
	},
	{
		id: '5',
		supermarket: 'GBarbosa',
		location: 'Rua Central, 321',
		date: '05/06/2025',
		status: 'finalizado',
		total: 'R$ 420,00',
	},
	{
		id: '6',
		supermarket: 'Extra',
		location: 'Rua da Paz, 77',
		date: '28/05/2025',
		status: 'finalizado',
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
					href={AllRoutes.DASHBOARD_PURCHASE_HISTORY}
					className="bg-primary text-background w-fit rounded p-1.5 text-sm shadow-xl"
				>
					Minhas Compras
				</Link>
			</CardHeader>

			<Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id} className="hover:bg-transparent">
							{headerGroup.headers.map(header => {
								return (
									<TableHead
										key={header.id}
										style={{ width: `${header.getSize()}px` }}
										className="bg-sidebar border-border text-primary relative h-9 border-y text-xs select-none first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r lg:text-sm"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<tbody aria-hidden="true" className="table-row h-1"></tbody>
				<CustomTableBody columns={columns} table={table} />
				{/* <TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow key={row.id} className="hover:bg-primary/10">
								{row.getVisibleCells().map(cell => (
									<TableCell
										key={cell.id}
										className="truncate text-xs lg:text-sm"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="text-center">
								Nenhum resultado encontrado.
							</TableCell>
						</TableRow>
					)}
				</TableBody> */}
				<tbody aria-hidden="true" className="table-row h-1"></tbody>
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
