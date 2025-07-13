'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeClosed, MailIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import { Input } from '@/ui/input';

import { loginSchema, LoginSchemaData } from '../zod-schemas/forms';

const LoginForm = () => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const form = useForm<LoginSchemaData>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	});
	const passwordInputType = isVisible ? 'text' : 'password';
	const toggleVisibility = () => setIsVisible(prev => !prev);

	const handleLoginSubmit = (data: LoginSchemaData) => {
		console.log(data);
	};

	return (
		<div className="mt-4 w-full max-w-sm">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleLoginSubmit)}
					className="flex flex-col gap-6"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="relative">
								<FormLabel className="text-xs md:text-sm">Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="email"
										placeholder="Email"
										className="peer pe-9"
									/>
								</FormControl>
								<div className="text-muted-foreground/80 pointer-events-none absolute end-0 top-[31px] flex items-center justify-center pe-3 peer-disabled:opacity-50 md:top-[34px]">
									<MailIcon size={14} color="#ff781a" aria-hidden="true" />
								</div>

								<FormMessage className="absolute -bottom-4" />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="relative">
								<FormLabel className="text-xs md:text-sm">Senha</FormLabel>
								<FormControl>
									<Input
										{...field}
										type={passwordInputType}
										placeholder="Senha"
										className="peer pe-9"
									/>
								</FormControl>

								<button
									type="button"
									onClick={toggleVisibility}
									className="text-muted-foreground/80 absolute end-0 top-[32px] flex items-center justify-center pe-3 peer-disabled:opacity-50 md:top-[34px]"
								>
									{isVisible ? (
										<Eye size={14} color="#ff781a" aria-hidden="true" />
									) : (
										<EyeClosed size={14} color="#ff781a" aria-hidden="true" />
									)}
								</button>

								<FormMessage className="absolute -bottom-4" />
							</FormItem>
						)}
					/>

					<Button type="submit">Entrar</Button>
				</form>
			</Form>
		</div>
	);
};

export default LoginForm;
