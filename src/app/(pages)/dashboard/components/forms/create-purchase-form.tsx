'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { CustomFormField } from '@/components/custom-form-field';
import { Button } from '@/ui/button';
import { Form } from '@/ui/form';

import {
	createPurchaseSchema,
	CreatePurchaseSchemaData,
} from '../../zod-schemas/forms';

interface CreatePurchaseFormProps {
	setIsDialogOpen: (param: boolean) => void;
	setIsSheetOpen: (param: boolean) => void;
}

const CreatePurchaseForm = ({
	setIsDialogOpen,
	setIsSheetOpen,
}: CreatePurchaseFormProps) => {
	const form = useForm<CreatePurchaseSchemaData>({
		resolver: zodResolver(createPurchaseSchema),
		defaultValues: { name: '', address: '' },
	});
	const router = useRouter();

	const handleCreatePurchaseSubmit = (data: CreatePurchaseSchemaData) => {
		setIsDialogOpen(false);
		setIsSheetOpen(true);
		router.push('/dashboard/new-purchase');
		form.reset();
		console.log(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleCreatePurchaseSubmit)}
				className="flex flex-col gap-6"
			>
				<CustomFormField
					control={form.control}
					name="name"
					type="text"
					label="Nome do Supermercado"
					placeholder="Ex.: Atakarejo"
				/>
				<CustomFormField
					control={form.control}
					name="address"
					type="text"
					label="Endereço do Supermercado"
					placeholder="Ex.: Rua Jurema"
				/>

				<Button type="submit" variant="default">
					Continuar
				</Button>
			</form>
		</Form>
	);
};

export default CreatePurchaseForm;
