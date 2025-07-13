import { z } from 'zod';

import {
	LoginErrorMessages,
	RegisterErrorMessages,
} from '../enums/form-error-messages';

const emailSchema = z.email({ error: LoginErrorMessages.EMAIL_ERROR }).trim();

export const loginSchema = z.object({
	email: emailSchema,
	password: z
		.string()
		.min(1, { error: LoginErrorMessages.PASSWORD_ERROR })
		.trim(),
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
			.min(1, { error: RegisterErrorMessages.NAME_MIN_ERROR })
			.max(25, { error: RegisterErrorMessages.NAME_MAX_ERROR })
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
			.min(6, { error: RegisterErrorMessages.PASSWORD_MIN_ERROR })
			.trim()
			.regex(UPPER_CASE_REGEX, {
				error: RegisterErrorMessages.PASSWORD_UPPERCASE_ERROR,
			})
			.regex(LOWER_CASE_REGEX, {
				error: RegisterErrorMessages.PASSWORD_LOWERCASE_ERROR,
			})
			.regex(NUMBER_REGEX, {
				error: RegisterErrorMessages.PASSWORD_NUMBER_ERROR,
			})
			.regex(SPECIAL_CHARACTER_REGEX, {
				error: RegisterErrorMessages.PASSWORD_SPECIAL_CARACTER_ERROR,
			}),
		confirmPassword: z
			.string()
			.min(1, { error: RegisterErrorMessages.CONFIRM_PASSWORD_ERROR })
			.trim(),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		error: RegisterErrorMessages.PASSWORDS_MATCH_ERROR,
	});

export type RegisterSchemaData = z.infer<typeof registerSchema>;
