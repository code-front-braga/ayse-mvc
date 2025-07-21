import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/ui/sheet';

import AddProductForm from '../../components/forms/add-product-form';

interface AddProductSheetProps {
	setIsSheetOpen: (param: boolean) => void;
	isSheetOpen: boolean;
}

const AddProductSheet = ({
	isSheetOpen,
	setIsSheetOpen,
}: AddProductSheetProps) => {
	return (
		<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
			<SheetContent className="w-full">
				<SheetHeader>
					<SheetTitle>Adicione Produtos</SheetTitle>
					<SheetDescription>Preencha os campos abaixo.</SheetDescription>
				</SheetHeader>
				<AddProductForm setIsSheetOpen={setIsSheetOpen} />
			</SheetContent>
		</Sheet>
	);
};

export default AddProductSheet;
