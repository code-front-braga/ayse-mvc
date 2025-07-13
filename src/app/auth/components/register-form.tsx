'use client';

import {
	CheckIcon,
	EyeIcon,
	EyeOffIcon,
	MailIcon,
	User,
	XIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Label } from '@/ui/label';

const RegisterForm = () => {
	const [password, setPassword] = useState<string>('');
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const toggleVisibility = () => setIsVisible(prev => !prev);

	const checkStrength = (pass: string) => {
		const requirements = [
			{ regex: /.{8,}/, text: 'Pelo menos 8 caracteres' },
			{ regex: /[0-9]/, text: 'Pelo menos 1 número' },
			{ regex: /[a-z]/, text: 'Pelo menos 1 letra minúscula' },
			{ regex: /[A-Z]/, text: 'Pelo menos 1 letra maiúscula' },
		];

		return requirements.map(req => ({
			met: req.regex.test(pass),
			text: req.text,
		}));
	};

	const strength = checkStrength(password);

	const strengthScore = useMemo(() => {
		return strength.filter(req => req.met).length;
	}, [strength]);

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
			<form onSubmit={() => {}} className="flex flex-col gap-6">
				<div className="*:not-first:mt-2">
					<Label>Nome</Label>
					<div className="relative">
						<Input className="peer pe-9" placeholder="Nome" type="text" />
						<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
							<User size={16} aria-hidden="true" />
						</div>
					</div>
				</div>
				<div className="*:not-first:mt-2">
					<Label>Email</Label>
					<div className="relative">
						<Input className="peer pe-9" placeholder="Email" type="email" />
						<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
							<MailIcon size={16} aria-hidden="true" />
						</div>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<div className="flex flex-1 flex-col gap-1">
						<Label>Criar Senha</Label>
						<div className="relative">
							<Input
								className="pe-9"
								placeholder="Password"
								type={isVisible ? 'text' : 'password'}
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
							<button
								className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
								type="button"
								onClick={toggleVisibility}
								aria-label={isVisible ? 'Hide password' : 'Show password'}
								aria-pressed={isVisible}
								aria-controls="password"
							>
								{isVisible ? (
									<EyeIcon size={16} aria-hidden="true" />
								) : (
									<EyeOffIcon size={16} aria-hidden="true" />
								)}
							</button>
						</div>
					</div>
					<div className="flex flex-1 flex-col gap-1">
						<Label>Confirme a Senha</Label>
						<Input placeholder="******" />
					</div>
				</div>

				<Button>Cadastrar</Button>
			</form>

			<div
				className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full"
				role="progressbar"
				aria-valuenow={strengthScore}
				aria-valuemin={0}
				aria-valuemax={4}
				aria-label="Password strength"
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

			{/* Password requirements list */}
			<ul className="space-y-1.5" aria-label="Password requirements">
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
								{req.met ? ' - Requirement met' : ' - Requirement not met'}
							</span>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RegisterForm;
