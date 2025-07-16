import { Button } from '@/ui/button';
import { Pagination, PaginationContent, PaginationItem } from '@/ui/pagination';

type SupermarketTablePaginationProps = {
	canPreviousPage: boolean;
	onPrevious: () => void;
	canNextPage: boolean;
	onNext: () => void;
	pageCount: number;
	pageIndex: number;
};

export const SupermarketTablePagination = ({
	pageIndex,
	pageCount,
	canPreviousPage,
	canNextPage,
	onPrevious,
	onNext,
}: SupermarketTablePaginationProps) => {
	return (
		<div className="flex items-center justify-between pt-2">
			<span className="text-muted-foreground text-xs md:text-sm">
				Página {pageIndex + 1} de {pageCount}
			</span>
			<Pagination className="w-fit">
				<PaginationContent className="gap-3">
					<PaginationItem>
						<Button
							variant="default"
							onClick={onPrevious}
							disabled={!canPreviousPage}
						>
							Anterior
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button variant="default" onClick={onNext} disabled={!canNextPage}>
							Próxima
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
};
