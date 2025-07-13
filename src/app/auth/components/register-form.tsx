'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, Eye, EyeClosed, MailIcon, User, XIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
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

import { registerSchema, RegisterSchemaData } from '../zod-schemas/forms';

const RegisterForm = () => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState<boolean>(false);
	const form = useForm<RegisterSchemaData>({
		resolver: zodResolver(registerSchema),
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
	});

	const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);
	const toggleConfirmPasswordVisibility = () =>
		setIsConfirmPasswordVisible(prev => !prev);

	const passwordInputType = isPasswordVisible ? 'text' : 'password';
	const confirmPasswordInputType = isConfirmPasswordVisible
		? 'text'
		: 'password';

	const handleRegisterSubmit = (data: RegisterSchemaData) => {
		console.log(data);
	};

	const checkStrength = (password: string) => {
		const requirements = [
			{ regex: /.{6,}/, text: 'Pelo menos 6 caracteres' },
			{ regex: /[0-9]/, text: 'Pelo menos 1 número' },
			{ regex: /[a-z]/, text: 'Pelo menos 1 letra minúscula' },
			{ regex: /[A-Z]/, text: 'Pelo menos 1 letra maiúscula' },
			{ regex: /[^A-Za-z0-9]/, text: 'Pelo menos 1 caracter especial' },
		];

		return requirements.map(req => ({
			met: req.regex.test(password),
			text: req.text,
		}));
	};

	const password = form.watch('password');
	const strength = checkStrength(password);
	const strengthScore = useMemo(
		() => strength.filter(req => req.met).length,
		[strength],
	);

	const getStrengthColor = (score: number) => {
		if (score === 0) return 'bg-border';
		if (score <= 1) return 'bg-red-500';
		if (score <= 2) return 'bg-orange-500';
		if (score === 3) return 'bg-amber-500';
		return 'bg-emerald-500';
	};

	const getStrengthText = (score: number) => {
		if (score === 0) return 'Digite uma senha';
		if (score <= 2) return 'Senha fraca';
		if (score === 3) return 'Senha média';
		return 'Senha forte';
	};

	return (
		<div className="w-full max-w-sm">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleRegisterSubmit)}
					className="flex flex-col gap-6"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem className="relative">
								<FormLabel className="text-xs md:text-sm">Nome</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="email"
										maxLength={25}
										placeholder="Seu nome"
										className="peer pe-9"
									/>
								</FormControl>
								<div className="text-muted-foreground/80 pointer-events-none absolute end-0 top-7.5 flex items-center justify-center pe-3 peer-disabled:opacity-50 md:top-[34px]">
									<User size={14} color="#ff781a" aria-hidden="true" />
								</div>

								<FormMessage className="absolute -bottom-4" />
							</FormItem>
						)}
					/>

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
								<div className="text-muted-foreground/80 pointer-events-none absolute end-0 top-7.5 flex items-center justify-center pe-3 peer-disabled:opacity-50 md:top-[34px]">
									<MailIcon size={14} color="#ff781a" aria-hidden="true" />
								</div>

								<FormMessage className="absolute -bottom-4" />
							</FormItem>
						)}
					/>

					<div className="flex items-center gap-2">
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
										onClick={togglePasswordVisibility}
										className="text-muted-foreground/80 absolute end-0 top-[32px] flex items-center justify-center pe-3 peer-disabled:opacity-50 md:top-[36px]"
									>
										{isPasswordVisible ? (
											<Eye size={14} color="#ff781a" aria-hidden="true" />
										) : (
											<EyeClosed size={14} color="#ff781a" aria-hidden="true" />
										)}
									</button>

									<FormMessage className="absolute -bottom-4" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="relative">
									<FormLabel className="text-xs md:text-sm">
										Confirme a Senha
									</FormLabel>
									<FormControl>
										<Input
											{...field}
											type={confirmPasswordInputType}
											placeholder="Confirme a senha"
											className="peer pe-9"
										/>
									</FormControl>

									<button
										type="button"
										onClick={toggleConfirmPasswordVisibility}
										className="text-muted-foreground/80 absolute end-0 top-[32px] flex items-center justify-center pe-3 peer-disabled:opacity-50 md:top-[36px]"
									>
										{isConfirmPasswordVisible ? (
											<Eye size={14} color="#ff781a" aria-hidden="true" />
										) : (
											<EyeClosed size={14} color="#ff781a" aria-hidden="true" />
										)}
									</button>

									<FormMessage className="absolute -bottom-4" />
								</FormItem>
							)}
						/>
					</div>

					<Button>Cadastrar</Button>
				</form>
			</Form>

			<div
				className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
				role="progressbar"
				aria-valuenow={strengthScore}
				aria-valuemin={0}
				aria-valuemax={4}
				aria-label="Força da senha"
			>
				<div
					className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
					style={{ width: `${(strengthScore / 4) * 100}%` }}
				></div>
			</div>

			<div className="flex flex-col gap-1">
				<p className="text-foreground mb-1 text-sm font-medium">
					{getStrengthText(strengthScore)}.
				</p>
				<span className="mb-2 text-xs">Deve conter:</span>
			</div>

			<ul
				className="bg-primary-foreground space-y-1.5 rounded p-2"
				aria-label="Requisitos de senha"
			>
				{strength.map((req, index) => (
					<li key={index} className="flex items-center gap-2">
						{req.met ? (
							<CheckIcon
								size={16}
								className="text-emerald-500"
								aria-hidden="true"
							/>
						) : (
							<XIcon
								size={16}
								className="text-muted-foreground/80"
								aria-hidden="true"
							/>
						)}
						<span
							className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}
						>
							{req.text}
							<span className="sr-only">
								{req.met
									? ' - Requisito atendido'
									: ' - Requisito não atendido'}
							</span>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RegisterForm;
