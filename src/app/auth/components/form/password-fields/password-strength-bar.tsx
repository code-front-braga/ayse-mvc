import { CheckIcon, XIcon } from 'lucide-react';
import { useMemo } from 'react';
import { Control, FieldValues, Path, useWatch } from 'react-hook-form';

interface PasswordStrengthBarProps<T extends FieldValues> {
	control: Control<T>;
	name?: Path<T>; // padrão: "password"
}

export const PasswordStrengthBar = <T extends FieldValues>({
	control,
	name = 'password' as Path<T>,
}: PasswordStrengthBarProps<T>) => {
	const password = useWatch({ control, name });

	const requirements = [
		{ regex: /.{6,}/, text: 'Pelo menos 6 caracteres' },
		{ regex: /[0-9]/, text: 'Pelo menos 1 número' },
		{ regex: /[a-z]/, text: 'Pelo menos 1 letra minúscula' },
		{ regex: /[A-Z]/, text: 'Pelo menos 1 letra maiúscula' },
		{ regex: /[^A-Za-z0-9]/, text: 'Pelo menos 1 caracter especial' },
	];

	const strength = useMemo(
		() =>
			requirements.map(req => ({
				met: req.regex.test(password || ''),
				text: req.text,
			})),
		[password],
	);

	const score = strength.filter(s => s.met).length;

	const getColor = () => {
		if (score === 0) return 'bg-border';
		if (score <= 1) return 'bg-red-500';
		if (score === 2) return 'bg-orange-500';
		if (score === 3) return 'bg-amber-500';
		return 'bg-emerald-500';
	};

	const getLabel = () => {
		if (score === 0) return 'Digite uma senha';
		if (score <= 2) return 'Senha fraca';
		if (score === 3) return 'Senha média';
		return 'Senha forte';
	};

	return (
		<div className="mt-2 space-y-2">
			<div
				className="bg-border h-1 w-full overflow-hidden rounded-full"
				role="progressbar"
				aria-valuenow={score}
				aria-valuemin={0}
				aria-valuemax={5}
				aria-label="Força da senha"
			>
				<div
					className={`h-full ${getColor()} transition-all duration-500 ease-out`}
					style={{ width: `${(score / 5) * 100}%` }}
				/>
			</div>

			<div className="flex flex-col gap-1">
				<span className="text-sm font-medium">{getLabel()}</span>
				<span className="text-muted-foreground text-xs">Deve conter:</span>
				<ul className="bg-primary-foreground space-y-1.5 rounded p-2">
					{strength.map((req, index) => (
						<li key={index} className="flex items-center gap-2">
							{req.met ? (
								<CheckIcon size={16} className="text-emerald-500" />
							) : (
								<XIcon size={16} className="text-muted-foreground/80" />
							)}
							<span
								className={`text-xs ${
									req.met ? 'text-emerald-600' : 'text-muted-foreground'
								}`}
							>
								{req.text}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
