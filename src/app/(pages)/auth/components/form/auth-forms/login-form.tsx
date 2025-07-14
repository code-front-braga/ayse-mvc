'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, MailIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { CustomFormField } from '@/components/custom-form-field';
import { Spinner } from '@/components/ui/kibo-ui/spinner';
import { Button } from '@/ui/button';
import { Form } from '@/ui/form';

import { loginSchema, LoginSchemaData } from '../../../zod-schemas/forms';

export const LoginForm = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();
	const form = useForm<LoginSchemaData>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	});

	const passwordInputType = isVisible ? 'text' : 'password';

	const toggleVisibility = () => setIsVisible(prev => !prev);

	const handleLoginSubmit = (data: LoginSchemaData) => {
		startTransition(async () => {
			await new Promise(resolve => setTimeout(resolve, 2000));
			console.log(data);
		});
	};

	return (
		<div className="mt-4 w-full max-w-sm">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleLoginSubmit)}
					className="flex flex-col gap-6"
				>
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

					<CustomFormField
						control={form.control}
						name="password"
						type={passwordInputType}
						autoComplete="current-password"
						disabled={isPending}
						label="Senha"
						placeholder="Senha"
						icon={
							<button type="button" onClick={toggleVisibility}>
								{isVisible ? (
									<Eye size={14} color="#ff781a" aria-hidden="true" />
								) : (
									<EyeClosed size={14} color="#ff781a" aria-hidden="true" />
								)}
							</button>
						}
					/>

					<Button type="submit">
						{isPending ? <Spinner variant="bars" /> : 'Entrar'}
					</Button>
				</form>
			</Form>
		</div>
	);
};
