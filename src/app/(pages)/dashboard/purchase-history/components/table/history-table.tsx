'use client';

import {
	RiArrowDownSLine,
	RiArrowUpSLine,
	RiCloseCircleLine,
	RiDeleteBinLine,
	RiErrorWarningLine,
	RiFilter3Line,
	RiMoreLine,
	RiSearch2Line,
} from '@remixicon/react';
import {
	ColumnDef,
	ColumnFiltersState,
	FilterFn,
	flexRender,
	getCoreRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { PenLine, Text, Trash } from 'lucide-react';
import { useId, useMemo, useRef, useState, useTransition } from 'react';

import { formatCurrency } from '@/helpers/format-currency';
import { cn } from '@/lib/clsx/utils';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/ui/alert-dialog';
import { Badge } from '@/ui/badge';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Table, TableHead, TableHeader, TableRow } from '@/ui/table';

import CustomTableBody from '../../../components/custom-table-body';
import { SupermarketTablePagination } from '../../../components/table';
import { PurchaseItem } from '../../../components/table/supermarket-table-columns';

export const defaultData: PurchaseItem[] = [
	{
		id: '1',
		supermarket: 'Supermercado Pão de Açúcar',
		location: 'Rua Augusta, 123 - São Paulo',
		date: '2025-07-01',
		status: 'Finalizado',
		total: '150,99',
	},
	{
		id: '2',
		supermarket: 'Carrefour',
		location: 'Av. Brasil, 234 - Rio de Janeiro',
		date: '2025-07-02',
		status: 'Pendente',
		total: '89,5',
	},
	{
		id: '3',
		supermarket: 'Supermercado Dia',
		location: 'Rua das Flores, 87 - Belo Horizonte',
		date: '2025-07-03',
		status: 'Cancelado',
		total: '45,75',
	},
	{
		id: '4',
		supermarket: 'Assaí Atacadista',
		location: 'Av. Paulista, 1450 - São Paulo',
		date: '2025-07-04',
		status: 'Finalizado',
		total: '220.1',
	},
	{
		id: '5',
		supermarket: 'Extra',
		location: 'Rua do Comércio, 77 - Salvador',
		date: '2025-07-05',
		status: 'Pendente',
		total: '102,9',
	},
	{
		id: '6',
		supermarket: 'Atacadão',
		location: 'Av. Getúlio Vargas, 300 - Recife',
		date: '2025-07-06',
		status: 'Finalizado',
		total: '310',
	},
	{
		id: '7',
		supermarket: 'Supermercado São Vicente',
		location: 'Rua 7 de Setembro, 55 - Campinas',
		date: '2025-07-07',
		status: 'Finalizado',
		total: '75,25',
	},
	{
		id: '8',
		supermarket: 'Oba Hortifruti',
		location: 'Av. das Nações, 400 - Brasília',
		date: '2025-07-08',
		status: 'Cancelado',
		total: '58.0',
	},
	{
		id: '9',
		supermarket: 'Supermercado Hirota',
		location: 'Rua Japão, 90 - São Paulo',
		date: '2025-07-09',
		status: 'Pendente',
		total: '199,99',
	},
	{
		id: '10',
		supermarket: 'Coop',
		location: 'Av. Kennedy, 200 - Santo André',
		date: '2025-07-10',
		status: 'Finalizado',
		total: '138,4',
	},
	{
		id: '11',
		supermarket: 'Makro',
		location: 'Rod. Raposo Tavares, 3000 - Osasco',
		date: '2025-07-11',
		status: 'Finalizado',
		total: '287,3',
	},
	{
		id: '12',
		supermarket: 'Savegnago',
		location: 'Av. Independência, 800 - Ribeirão Preto',
		date: '2025-07-12',
		status: 'Cancelado',
		total: '61,45',
	},
	{
		id: '13',
		supermarket: 'Zaffari',
		location: 'Rua Porto Alegre, 120 - Porto Alegre',
		date: '2025-07-13',
		status: 'Pendente',
		total: '83,6',
	},
	{
		id: '14',
		supermarket: 'Sonda',
		location: 'Av. Interlagos, 1000 - São Paulo',
		date: '2025-07-14',
		status: 'Finalizado',
		total: '145,0',
	},
	{
		id: '15',
		supermarket: 'Mambo',
		location: 'Rua da Paz, 432 - Campinas',
		date: '2025-07-15',
		status: 'Finalizado',
		total: '127,8',
	},
	{
		id: '16',
		supermarket: 'Super Muffato',
		location: 'Av. Brasil, 750 - Londrina',
		date: '2025-07-16',
		status: 'Cancelado',
		total: '98,3',
	},
	{
		id: '17',
		supermarket: 'Veran',
		location: 'Rua Dom Pedro II, 345 - Guarulhos',
		date: '2025-07-17',
		status: 'Finalizado',
		total: '109,7',
	},
	{
		id: '18',
		supermarket: 'Supermercado Bahamas',
		location: 'Av. Juiz de Fora, 654 - Juiz de Fora',
		date: '2025-07-18',
		status: 'Pendente',
		total: '59',
	},
	{
		id: '19',
		supermarket: 'Supermercado Líder',
		location: 'Rua Pará, 112 - Belém',
		date: '2025-07-19',
		status: 'Finalizado',
		total: '176,4',
	},
	{
		id: '20',
		supermarket: 'Supermercado Bretas',
		location: 'Av. Goiás, 280 - Goiânia',
		date: '2025-07-20',
		status: 'Finalizado',
		total: '134,25',
	},
];

const statusFilterFn: FilterFn<PurchaseItem> = (
	row,
	columnId,
	filterValue: string[],
) => {
	if (!filterValue?.length) return true;
	const status = row.getValue(columnId) as string;
	return filterValue.includes(status);
};

interface GetColumnsProps {
	setData: React.Dispatch<React.SetStateAction<PurchaseItem[]>>;
	data: PurchaseItem[];
}

const getColumns = ({
	data,
	setData,
}: GetColumnsProps): ColumnDef<PurchaseItem>[] => [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Selecionar tudo"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={value => row.toggleSelected(!!value)}
				aria-label="Selecionar linha"
			/>
		),
		size: 28,
		enableSorting: false,
		enableHiding: false,
	},
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
		filterFn: statusFilterFn,
	},
	{
		header: 'Valor Total',
		accessorKey: 'total',
		cell: ({ row }) => (
			<span className="text-foreground font-medium">
				{formatCurrency(row.original.total)}
			</span>
		),
		size: 110,
	},
	{
		id: 'actions',
		header: () => <span className="sr-only">Ações</span>,
		cell: ({ row }) => (
			<RowActions setData={setData} data={data} item={row.original} />
		),
		size: 60,
		enableHiding: false,
	},
];

export default function HistoryTable() {
	const id = useId();
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});
	const inputRef = useRef<HTMLInputElement>(null);

	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'supermarket',
			desc: false,
		},
	]);

	const [data, setData] = useState<PurchaseItem[]>(() => [...defaultData]);

	const columns = useMemo(() => getColumns({ data, setData }), [data]);

	const handleDeleteRows = () => {
		const selectedRows = table.getSelectedRowModel().rows;
		const updatedData = data.filter(
			item => !selectedRows.some(row => row.original.id === item.id),
		);
		setData(updatedData);
		table.resetRowSelection();
	};

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		enableSortingRemoval: false,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		state: {
			sorting,
			pagination,
			columnFilters,
			columnVisibility,
		},
	});

	// Extract complex expressions into separate variables
	const statusColumn = table.getColumn('status');
	const statusFacetedValues = statusColumn?.getFacetedUniqueValues();
	const statusFilterValue = statusColumn?.getFilterValue();

	// Update useMemo hooks with simplified dependencies
	const uniqueStatusValues = useMemo(() => {
		if (!statusColumn) return [];
		const values = Array.from(statusFacetedValues?.keys() ?? []);
		return values.sort();
	}, [statusColumn, statusFacetedValues]);

	const statusCounts = useMemo(() => {
		if (!statusColumn) return new Map();
		return statusFacetedValues ?? new Map();
	}, [statusColumn, statusFacetedValues]);

	const selectedStatuses = useMemo(() => {
		return (statusFilterValue as string[]) ?? [];
	}, [statusFilterValue]);

	const handleStatusChange = (checked: boolean, value: string) => {
		const filterValue = table.getColumn('status')?.getFilterValue() as string[];
		const newFilterValue = filterValue ? [...filterValue] : [];

		if (checked) {
			newFilterValue.push(value);
		} else {
			const index = newFilterValue.indexOf(value);
			if (index > -1) {
				newFilterValue.splice(index, 1);
			}
		}

		table
			.getColumn('status')
			?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
	};

	return (
		<div className="space-y-4">
			{/* Actions */}
			<div className="flex flex-wrap items-center justify-between gap-3">
				{/* Left side */}
				<div className="flex items-center gap-3">
					{/* Filter by name */}
					<div className="relative">
						<Input
							id={`${id}-input`}
							ref={inputRef}
							className={cn(
								'peer bg-background from-accent/60 to-accent min-w-60 bg-gradient-to-br ps-9',
								Boolean(table.getColumn('supermarket')?.getFilterValue()) &&
									'pe-9',
							)}
							value={
								(table.getColumn('supermarket')?.getFilterValue() ??
									'') as string
							}
							onChange={e =>
								table.getColumn('supermarket')?.setFilterValue(e.target.value)
							}
							placeholder="Pesquisar por supermercado"
							type="text"
							aria-label="Pesquisar por supermercado"
						/>
						<div className="text-muted-foreground/60 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
							<RiSearch2Line size={20} aria-hidden="true" />
						</div>
						{Boolean(table.getColumn('supermarket')?.getFilterValue()) && (
							<button
								className="text-muted-foreground/60 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
								aria-label="Clear filter"
								onClick={() => {
									table.getColumn('supermarket')?.setFilterValue('');
									if (inputRef.current) {
										inputRef.current.focus();
									}
								}}
							>
								<RiCloseCircleLine size={16} aria-hidden="true" />
							</button>
						)}
					</div>
				</div>
				{/* Right side */}
				<div className="flex items-center gap-3">
					{/* Delete button */}
					{table.getSelectedRowModel().rows.length > 0 && (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<Button className="ml-auto" variant="outline">
									<RiDeleteBinLine
										className="-ms-1 opacity-60"
										size={16}
										aria-hidden="true"
									/>
									Deletar
									<span className="border-border bg-background text-muted-foreground/70 ms-1 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
										{table.getSelectedRowModel().rows.length}
									</span>
								</Button>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
									<div
										className="border-border flex size-9 shrink-0 items-center justify-center rounded-full border"
										aria-hidden="true"
									>
										<RiErrorWarningLine className="opacity-80" size={16} />
									</div>
									<AlertDialogHeader>
										<AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
										<AlertDialogDescription>
											Esta ação não poderá ser desfeita. Isso irá deletar
											permanentemente. {table.getSelectedRowModel().rows.length}
											selecionada{' '}
											{table.getSelectedRowModel().rows.length === 1
												? 'linha'
												: 'linhas'}
											.
										</AlertDialogDescription>
									</AlertDialogHeader>
								</div>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancelar</AlertDialogCancel>
									<AlertDialogAction onClick={handleDeleteRows}>
										Deletar
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					)}
					{/* Filter by status */}
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">
								<RiFilter3Line
									className="text-muted-foreground/60 -ms-1.5 size-5"
									size={20}
									aria-hidden="true"
								/>
								Filtro
								{selectedStatuses.length > 0 && (
									<span className="border-border bg-background text-muted-foreground/70 ms-3 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
										{selectedStatuses.length}
									</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto min-w-36 p-3" align="end">
							<div className="space-y-3">
								<div className="text-muted-foreground/60 text-xs font-medium uppercase">
									Status
								</div>
								<div className="space-y-3">
									{uniqueStatusValues.map((value, i) => (
										<div key={value} className="flex items-center gap-2">
											<Checkbox
												id={`${id}-${i}`}
												checked={selectedStatuses.includes(value)}
												onCheckedChange={(checked: boolean) =>
													handleStatusChange(checked, value)
												}
											/>
											<Label
												htmlFor={`${id}-${i}`}
												className="flex grow justify-between gap-2 font-normal"
											>
												{value}{' '}
												<span className="text-muted-foreground ms-2 text-xs">
													{statusCounts.get(value)}
												</span>
											</Label>
										</div>
									))}
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			{/* Table */}
			<Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id} className="hover:bg-transparent">
							{headerGroup.headers.map(header => {
								return (
									<TableHead
										key={header.id}
										style={{ width: `${header.getSize()}px` }}
										className="bg-sidebar text-primary border-border relative h-9 border-y text-xs select-none first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r lg:text-sm"
									>
										{header.isPlaceholder ? null : header.column.getCanSort() ? (
											<div
												className={cn(
													header.column.getCanSort() &&
														'flex h-full cursor-pointer items-center gap-2 select-none',
												)}
												onClick={header.column.getToggleSortingHandler()}
												onKeyDown={e => {
													// Enhanced keyboard handling for sorting
													if (
														header.column.getCanSort() &&
														(e.key === 'Enter' || e.key === ' ')
													) {
														e.preventDefault();
														header.column.getToggleSortingHandler()?.(e);
													}
												}}
												tabIndex={header.column.getCanSort() ? 0 : undefined}
											>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												{{
													asc: (
														<RiArrowUpSLine
															className="shrink-0 opacity-60"
															size={16}
															aria-hidden="true"
														/>
													),
													desc: (
														<RiArrowDownSLine
															className="shrink-0 opacity-60"
															size={16}
															aria-hidden="true"
														/>
													),
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										) : (
											flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)
										)}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<tbody aria-hidden="true" className="table-row h-1"></tbody>
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
							<TableCell
								colSpan={columns.length}
								className="text-center text-xs lg:text-sm"
							>
								Nenhum resultado encontrado.
							</TableCell>
						</TableRow>
					)}
				</TableBody> */}
				<CustomTableBody columns={columns} table={table} />
				<tbody aria-hidden="true" className="table-row h-1"></tbody>
			</Table>

			{/* Pagination */}
			{/* {table.getRowModel().rows.length > 0 && (
				<div className="flex items-center justify-between pt-2">
					<span
						className="text-muted-foreground text-xs md:text-sm"
						aria-live="polite"
					>
						Página{' '}
						<span className="text-foreground">
							{table.getState().pagination.pageIndex + 1}
						</span>{' '}
						de <span className="text-foreground">{table.getPageCount()}</span>
					</span>
					<Pagination className="w-fit">
						<PaginationContent className="gap-3">
							<PaginationItem>
								<Button
									variant="default"
									className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
									aria-label="Ir para a página anterior"
								>
									Anterior
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button
									variant="default"
									className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
									aria-label="Ir para a próxima página"
								>
									Próxima
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)} */}
			<SupermarketTablePagination
				pageIndex={pagination.pageIndex}
				pageCount={table.getPageCount()}
				canPreviousPage={table.getCanPreviousPage()}
				canNextPage={table.getCanNextPage()}
				onPrevious={() => table.previousPage()}
				onNext={() => table.nextPage()}
			/>
		</div>
	);
}

function RowActions({
	setData,
	data,
	item,
}: {
	setData: React.Dispatch<React.SetStateAction<PurchaseItem[]>>;
	data: PurchaseItem[];
	item: PurchaseItem;
}) {
	const [isUpdatePending, startUpdateTransition] = useTransition();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	// const handleStatusToggle = () => {
	// 	startUpdateTransition(() => {
	// 		const updatedData = data.map(dataItem => {
	// 			if (dataItem.id === item.id) {
	// 				return {
	// 					...dataItem,
	// 					status: item.status === 'Finalizado' ? 'Cancelado' : 'Finalizado',
	// 				};
	// 			}
	// 			return dataItem;
	// 		});
	// 		setData(updatedData);
	// 	});
	// };

	const handleDelete = () => {
		startUpdateTransition(() => {
			const updatedData = data.filter(dataItem => dataItem.id !== item.id);
			setData(updatedData);
			setShowDeleteDialog(false);
		});
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<div className="flex justify-end">
						<Button
							size="icon"
							variant="ghost"
							className="text-muted-foreground/60 shadow-none"
							aria-label="Edit item"
						>
							<RiMoreLine className="size-5" size={20} aria-hidden="true" />
						</Button>
					</div>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-auto">
					<DropdownMenuItem variant="default">
						<PenLine />
						Editar Compra
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Text />
						Ver Detalhes
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => setShowDeleteDialog(true)}
						variant="destructive"
					>
						<Trash />
						Deletar Compra
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete this
							contact.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isUpdatePending}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isUpdatePending}
							className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white shadow-xs"
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
