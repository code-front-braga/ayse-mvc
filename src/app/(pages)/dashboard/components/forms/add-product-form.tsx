'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { CustomFormField } from '@/components/custom-form-field';
import { Button } from '@/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/ui/select';
import { Textarea } from '@/ui/textarea';

import {
	addProductSchema,
	AddProductSchemaData,
} from '../../zod-schemas/forms';

const AddProductForm = ({
	setIsSheetOpen,
}: {
	setIsSheetOpen: (param: boolean) => void;
}) => {
	const form = useForm<AddProductSchemaData>({
		resolver: zodResolver(addProductSchema),
		defaultValues: {
			name: '',
			category: '',
			details: '',
			price: '',
			quantity: '',
		},
	});

	const handleAddProductSubmit = (data: AddProductSchemaData) => {
		setIsSheetOpen(false);
		console.log(data);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleAddProductSubmit)}
				className="flex h-full flex-col p-4"
			>
				<div className="flex h-full flex-col gap-6">
					<div className="flex w-full items-center gap-2">
						<CustomFormField
							control={form.control}
							name="name"
							type="text"
							label="Produto"
							placeholder="Produto"
							className="flex-1"
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem className="relative w-full min-w-0 flex-1">
									<FormLabel className="text-xs md:text-sm">
										Categoria
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="w-full min-w-0">
												<SelectValue placeholder="Selecione uma categoria" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="m@example.com">
												m@example.com
											</SelectItem>
											<SelectItem value="m@google.com">m@google.com</SelectItem>
											<SelectItem value="m@support.com">
												m@support.com
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage className="absolute -bottom-4" />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex items-center gap-2">
						<CustomFormField
							control={form.control}
							name="price"
							type="text"
							label="Preço"
							placeholder="R$ 0,00"
						/>

						<CustomFormField
							control={form.control}
							name="quantity"
							type="text"
							label="Quantidade"
							placeholder="0"
						/>
					</div>

					<FormField
						control={form.control}
						name="details"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xs md:text-sm">
									Alguma Observação?
								</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										placeholder="Observação..."
										className="min-h-36 resize-none placeholder:text-sm placeholder:lg:text-base"
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>

				<Button type="submit" variant="default">
					Adicionar Produto
				</Button>
			</form>
		</Form>
	);
};

export default AddProductForm;
