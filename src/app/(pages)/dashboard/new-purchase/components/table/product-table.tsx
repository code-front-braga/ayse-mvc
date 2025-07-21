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
import { Check, PenLine, Plus, Text, Trash, X } from 'lucide-react';
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

import { SupermarketTablePagination } from '../../../components/table';
import CustomProductTable from './custom-product-table';

export interface ProductProps {
	category: string;
	quantity: string;
	product: string;
	price: string;
	total: string;
	id: string;
}

export const defaultData: ProductProps[] = [
	{
		id: '1',
		product: 'Arroz Tipo 1',
		category: 'Mercearia',
		price: '25,90',
		quantity: '2',
		total: '51,80',
	},
	{
		id: '2',
		product: 'Leite Integral',
		category: 'Laticínios',
		price: '5,90',
		quantity: '3',
		total: '17,70',
	},
	{
		id: '3',
		product: 'Café Torrado',
		category: 'Bebidas',
		price: '18,50',
		quantity: '1',
		total: '18,50',
	},
	{
		id: '4',
		product: 'Sabonete Dove',
		category: 'Higiene',
		price: '3,70',
		quantity: '6',
		total: '22,20',
	},
	{
		id: '5',
		product: 'Papel Higiênico 12x',
		category: 'Limpeza',
		price: '22,90',
		quantity: '1',
		total: '22,90',
	},
	{
		id: '6',
		product: 'Detergente Líquido',
		category: 'Limpeza',
		price: '2,99',
		quantity: '4',
		total: '11,96',
	},
	{
		id: '7',
		product: 'Macarrão Espaguete',
		category: 'Mercearia',
		price: '4,25',
		quantity: '2',
		total: '8,50',
	},
	{
		id: '8',
		product: 'Queijo Mussarela',
		category: 'Frios',
		price: '35,90',
		quantity: '1',
		total: '35,90',
	},
	{
		id: '9',
		product: 'Presunto Cozido',
		category: 'Frios',
		price: '29,99',
		quantity: '1',
		total: '29,99',
	},
	{
		id: '10',
		product: 'Iogurte Natural',
		category: 'Laticínios',
		price: '3,50',
		quantity: '6',
		total: '21,00',
	},
	{
		id: '11',
		product: 'Farinha de Trigo',
		category: 'Mercearia',
		price: '6,70',
		quantity: '2',
		total: '13,40',
	},
	{
		id: '12',
		product: 'Feijão Carioca',
		category: 'Mercearia',
		price: '8,45',
		quantity: '2',
		total: '16,90',
	},
	{
		id: '13',
		product: 'Açúcar Refinado',
		category: 'Mercearia',
		price: '4,60',
		quantity: '2',
		total: '9,20',
	},
	{
		id: '14',
		product: 'Refrigerante Cola 2L',
		category: 'Bebidas',
		price: '7,50',
		quantity: '3',
		total: '22,50',
	},
	{
		id: '15',
		product: 'Água Mineral 1,5L',
		category: 'Bebidas',
		price: '2,00',
		quantity: '6',
		total: '12,00',
	},
	{
		id: '16',
		product: 'Sabão em Pó',
		category: 'Limpeza',
		price: '18,80',
		quantity: '1',
		total: '18,80',
	},
	{
		id: '17',
		product: 'Desodorante Aerosol',
		category: 'Higiene',
		price: '9,90',
		quantity: '2',
		total: '19,80',
	},
	{
		id: '18',
		product: 'Óleo de Soja',
		category: 'Mercearia',
		price: '6,50',
		quantity: '3',
		total: '19,50',
	},
	{
		id: '19',
		product: 'Molho de Tomate',
		category: 'Mercearia',
		price: '3,80',
		quantity: '4',
		total: '15,20',
	},
	{
		id: '20',
		product: 'Creme Dental',
		category: 'Higiene',
		price: '4,90',
		quantity: '2',
		total: '9,80',
	},
];

const categoryFilterFn: FilterFn<ProductProps> = (
	row,
	columnId,
	filterValue: string[],
) => {
	if (!filterValue?.length) return true;
	const category = row.getValue(columnId) as string;
	return filterValue.includes(category);
};

interface GetColumnsProps {
	setData: React.Dispatch<React.SetStateAction<ProductProps[]>>;
	data: ProductProps[];
}

const getColumns = ({
	data,
	setData,
}: GetColumnsProps): ColumnDef<ProductProps>[] => [
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
		header: 'Produto',
		accessorKey: 'product',
		cell: ({ row }) => (
			<span className="font-medium">{row.original.product}</span>
		),
		size: 140,
		enableHiding: false,
	},
	{
		header: 'Categoria',
		accessorKey: 'category',
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.original.category}</span>
		),
		size: 140,
		filterFn: categoryFilterFn,
	},
	{
		header: 'Preço',
		accessorKey: 'price',
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.original.price}</span>
		),
		size: 120,
	},
	{
		header: 'Quantidade',
		accessorKey: 'quantity',
		cell: ({ row }) => (
			<span className="text-muted-foreground">{row.original.quantity}</span>
		),
		size: 120,
	},
	{
		header: 'Total',
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
			id: 'product',
			desc: false,
		},
	]);

	const [data, setData] = useState<ProductProps[]>(() => [...defaultData]);

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
	const statusColumn = table.getColumn('category');
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
		const filterValue = table
			.getColumn('category')
			?.getFilterValue() as string[];
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
			.getColumn('category')
			?.setFilterValue(newFilterValue.length ? newFilterValue : undefined);
	};

	return (
		<div className="flex flex-col space-y-4">
			<div className="bg-sidebar flex flex-wrap items-center justify-between gap-3 rounded-sm border p-4">
				<div className="flex items-center gap-3">
					<h2 className="text-lg font-semibold">Lista de Compras</h2>
					<Badge variant="secondary" className="text-xs">
						{data.length} {data.length === 1 ? 'item' : 'itens'}
					</Badge>
				</div>
				<div className="flex items-center gap-3">
					<Button variant="default">
						<Plus className="-ms-1 size-4" />
						Adicionar Produto
					</Button>
					<Button variant="outline">
						<X className="-ms-1 size-4" />
						Cancelar
					</Button>
					<Button className="bg-green-600 hover:bg-green-700">
						<Check className="-ms-1 size-4" />
						Finalizar Compra
					</Button>
				</div>
			</div>
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
								Boolean(table.getColumn('product')?.getFilterValue()) && 'pe-9',
							)}
							value={
								(table.getColumn('product')?.getFilterValue() ?? '') as string
							}
							onChange={e =>
								table.getColumn('product')?.setFilterValue(e.target.value)
							}
							placeholder="Pesquisar por produto"
							type="text"
							aria-label="Pesquisar por produto"
						/>
						<div className="text-muted-foreground/60 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 peer-disabled:opacity-50">
							<RiSearch2Line size={20} aria-hidden="true" />
						</div>
						{Boolean(table.getColumn('product')?.getFilterValue()) && (
							<button
								className="text-muted-foreground/60 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
								aria-label="Limpar filtro"
								onClick={() => {
									table.getColumn('product')?.setFilterValue('');
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
								<Button className="ml-auto" variant="destructive">
									<RiDeleteBinLine
										className="-ms-1"
										size={16}
										aria-hidden="true"
									/>
									Deletar
									<span className="border-border bg-background text-muted-foreground ms-1 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
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
											permanentemente. {table.getSelectedRowModel().rows.length}{' '}
											{table.getSelectedRowModel().rows.length === 1
												? 'produto'
												: 'produtos'}{' '}
											selecionada.
										</AlertDialogDescription>
									</AlertDialogHeader>
								</div>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancelar</AlertDialogCancel>

									<Button variant="destructive" onClick={handleDeleteRows}>
										Deletar
									</Button>
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
									Categoria
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

				<CustomProductTable columns={columns} table={table} />
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
		</div>
	);
}

function RowActions({
	setData,
	data,
	item,
}: {
	setData: React.Dispatch<React.SetStateAction<ProductProps[]>>;
	data: ProductProps[];
	item: ProductProps;
}) {
	const [isUpdatePending, startUpdateTransition] = useTransition();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
						Editar Produto
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
						Deletar Produto
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Tem certeza?</AlertDialogTitle>
						<AlertDialogDescription>
							Esta ação não poderá ser desfeita. Isso irá deletar
							permanentemente.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isUpdatePending}>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isUpdatePending}
							className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white shadow-xs"
						>
							Deletar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
