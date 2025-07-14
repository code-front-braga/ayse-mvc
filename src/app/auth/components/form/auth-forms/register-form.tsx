'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MailIcon, User } from 'lucide-react';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import {
	registerSchema,
	RegisterSchemaData,
} from '@/app/auth/zod-schemas/forms';
import { CustomFormField } from '@/components/custom-form-field';
import { Spinner } from '@/components/ui/kibo-ui/spinner';
import { Button } from '@/ui/button';
import { Form } from '@/ui/form';

import {
	ConfirmPasswordField,
	PasswordField,
	PasswordStrengthBar,
} from '../password-fields';

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();
	const form = useForm<RegisterSchemaData>({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
	});

	const handleRegisterSubmit = (data: RegisterSchemaData) => {
		startTransition(async () => {
			await new Promise(resolve => setTimeout(resolve, 2000));
			console.log(data);
		});
	};

	return (
		<div className="w-full max-w-sm">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleRegisterSubmit)}
					className="flex flex-col gap-6"
				>
					<CustomFormField
						control={form.control}
						name="name"
						type="text"
						autoComplete="name"
						disabled={isPending}
						label="Nome"
						placeholder="Nome"
						icon={<User size={14} color="#ff781a" aria-hidden="true" />}
					/>

					<CustomFormField
						control={form.control}
						name="email"
						type="email"
						autoComplete="email"
						disabled={isPending}
						label="Email"
						placeholder="Email"
						icon={<MailIcon size={14} color="#ff781a" aria-hidden="true" />}
					/>

					<div className="flex items-center gap-2">
						<PasswordField
							control={form.control}
							name="password"
							disabled={isPending}
						/>
						<ConfirmPasswordField
							control={form.control}
							name="confirmPassword"
							passwordFieldName="password"
							disabled={isPending}
						/>
					</div>
					<Button type="submit">
						{isPending ? <Spinner variant="bars" /> : 'Cadastrar'}
					</Button>
				</form>
			</Form>

			<PasswordStrengthBar<RegisterSchemaData> control={form.control} />
		</div>
	);
};
