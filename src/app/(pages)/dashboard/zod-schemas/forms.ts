import z from 'zod';

import capitalizeWords from '@/helpers/capitalize-words';

export const createPurchaseSchema = z.object({
	name: z
		.string()
		.min(1, { error: 'Nome do supermercado é obrigatório.' })
		.max(20, { error: 'Até 20 caracteres.' })
		.trim()
		.transform(capitalizeWords),
	address: z.string().trim().transform(capitalizeWords),
});

export type CreatePurchaseSchemaData = z.infer<typeof createPurchaseSchema>;

export const addProductSchema = z.object({
	name: z
		.string()
		.min(1, { error: 'Campo Obrigatório.' })
		.max(20, { error: 'Até 20 caracteres.' })
		.trim()
		.transform(capitalizeWords),
	category: z.string().min(1, { error: 'Campo Obrigatório.' }),
	price: z
		.string()
		.min(0.01, { message: 'Digite um preço válido' })
		.refine(n => Number(n) > 0, { message: 'Deve ser maior que 0' }),

	quantity: z
		.string()
		.min(1, { message: 'Digite um número' })
		.refine(n => Number(n) > 0, { message: 'Deve ser maior que 0' }),
	details: z.string().trim(),
});

export type AddProductSchemaData = z.infer<typeof addProductSchema>;
