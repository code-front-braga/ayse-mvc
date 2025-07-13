import { z } from 'zod';

const emailSchema = z.email({ error: 'Email inválido.' }).trim();

export const loginSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, { error: 'Senha é obrigatória.' }).trim(),
});

export type LoginSchemaData = z.infer<typeof loginSchema>;

// PASSWORD REGEX
const UPPER_CASE_REGEX = /[A-Z]/;
const LOWER_CASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;
const SPECIAL_CHARACTER_REGEX = /[^A-Za-z0-9]/;

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(1, { error: 'Nome é obrigatório.' })
			.max(25, { error: 'Permitido até 25 caracteres.' })
			.trim()
			.transform(value =>
				value
					.toLowerCase()
					.split(' ')
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' '),
			),
		email: emailSchema,
		password: z
			.string()
			.min(6, { error: 'Pelo menos 6 caracteres.' })
			.trim()
			.regex(UPPER_CASE_REGEX, { error: 'Pelo menos 1 letra maiúscula.' })
			.regex(LOWER_CASE_REGEX, { error: 'Pelo menos 1 letra minúscula.' })
			.regex(NUMBER_REGEX, { error: 'Pelo menos 1 número' })
			.regex(SPECIAL_CHARACTER_REGEX, {
				error: 'Pelo menos 1 caracter especial.',
			}),
		confirmPassword: z.string().min(1, { error: 'Confirme sua senha.' }).trim(),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		error: 'Não coincidem.',
	});

export type RegisterSchemaData = z.infer<typeof registerSchema>;
