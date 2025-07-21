import { Plus } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/ui/alert-dialog';
import { AlertDialogFooter, AlertDialogHeader } from '@/ui/alert-dialog';
import { Button } from '@/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';

import CreatePurchaseForm from '../../components/forms/create-purchase-form';

interface CreatePurchaseDialogProps {
	setIsDialogOpen: (param: boolean) => void;
	setIsSheetOpen: (param: boolean) => void;
	isDialogOpen: boolean;
}

const CreatePurchaseDialog = ({
	setIsDialogOpen,
	setIsSheetOpen,
	isDialogOpen,
}: CreatePurchaseDialogProps) => {
	return (
		<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<Tooltip>
				<TooltipTrigger asChild>
					<AlertDialogTrigger asChild>
						<Button variant="default" size="icon">
							<Plus />
						</Button>
					</AlertDialogTrigger>
				</TooltipTrigger>
				<TooltipContent side="left">Cadastrar nova compra</TooltipContent>
			</Tooltip>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Crie Uma Compra</AlertDialogTitle>
					<AlertDialogDescription>
						Para começar, digite o nome e o endereço do supermercado.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<CreatePurchaseForm
					setIsDialogOpen={setIsDialogOpen}
					setIsSheetOpen={setIsSheetOpen}
				/>
				<AlertDialogFooter>
					<AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CreatePurchaseDialog;
