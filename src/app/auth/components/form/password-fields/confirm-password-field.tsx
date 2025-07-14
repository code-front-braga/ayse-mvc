'use client';

import { Eye, EyeClosed } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
	Control,
	FieldValues,
	Path,
	useController,
	useWatch,
} from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

interface ConfirmPasswordFieldProps<T extends FieldValues> {
	passwordFieldName: Path<T>; // normalmente: 'password'
	placeholder?: string;
	control: Control<T>;
	disabled?: boolean;
	label?: string;
	name: Path<T>; // normalmente: 'confirmPassword'
}

export const ConfirmPasswordField = <T extends FieldValues>({
	control,
	name,
	passwordFieldName,
	label = 'Confirmar Senha',
	placeholder = 'Confirme sua senha',
	disabled = false,
}: ConfirmPasswordFieldProps<T>) => {
	const [visible, setVisible] = useState(false);
	const { field } = useController({ control, name });

	const confirmPassword = useWatch({ control, name });
	const originalPassword = useWatch({ control, name: passwordFieldName });

	const passwordsMatch = useMemo(() => {
		return confirmPassword === originalPassword && confirmPassword.length > 0;
	}, [confirmPassword, originalPassword]);

	const passwordInputType = visible ? 'text' : 'password';

	return (
		<FormItem className="relative">
			<FormLabel className="text-xs md:text-sm">{label}</FormLabel>
			<FormControl>
				<Input
					{...field}
					type={passwordInputType}
					placeholder={placeholder}
					disabled={disabled}
					className="peer pe-9"
				/>
			</FormControl>

			<button
				type="button"
				onClick={() => setVisible(prev => !prev)}
				className="text-muted-foreground/80 absolute end-0 top-[32px] flex items-center justify-center pe-3 peer-disabled:opacity-50 md:top-[36px]"
			>
				{visible ? (
					<Eye size={14} color="#ff781a" />
				) : (
					<EyeClosed size={14} color="#ff781a" />
				)}
			</button>

			{!passwordsMatch && confirmPassword.length > 0 && (
				<p className="text-destructive absolute -bottom-4 text-xs">
					Não coincidem.
				</p>
			)}

			<FormMessage className="absolute -bottom-4" />
		</FormItem>
	);
};
