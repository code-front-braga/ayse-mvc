import NewPurchaseHeader from './components/new-purchase-header';
import ProductTable from './components/table/product-table';

const NewPurchasePage = () => {
	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<NewPurchaseHeader />
			<div className="grid grid-cols-1 gap-4">
				<ProductTable />
			</div>
		</div>
	);
};

export default NewPurchasePage;
