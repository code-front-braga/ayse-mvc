import { Table } from '@/ui/table';

const CustomTable = ({ children }: { children: React.ReactNode }) => {
	return (
		<Table className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
			{children}
		</Table>
	);
};

export default CustomTable;
