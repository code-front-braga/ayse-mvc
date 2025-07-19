import { ColumnDef, flexRender, Table } from '@tanstack/react-table';

import { TableBody, TableCell, TableRow } from '@/ui/table';

import { PurchaseItem } from './table/supermarket-table-columns';

interface CustomTableBodyProps {
	columns: ColumnDef<PurchaseItem>[];
	table: Table<PurchaseItem>;
}

const CustomTableBody = ({ table, columns }: CustomTableBodyProps) => {
	return (
		<TableBody>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map(row => (
					<TableRow key={row.id} className="hover:bg-primary/10">
						{row.getVisibleCells().map(cell => (
							<TableCell key={cell.id} className="truncate text-xs lg:text-sm">
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
		</TableBody>
	);
};

export default CustomTableBody;
