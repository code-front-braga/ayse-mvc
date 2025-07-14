'use client';

import { Eye, EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@/ui/form';
import { Input } from '@/ui/input';

interface PasswordFieldProps<T extends FieldValues> {
	placeholder?: string;
	control: Control<T>;
	disabled?: boolean;
	label?: string;
	name: Path<T>;
}

export const PasswordField = <T extends FieldValues>({
	control,
	name,
	label = 'Senha',
	placeholder = 'Digite sua senha',
	disabled = false,
}: PasswordFieldProps<T>) => {
	const [visible, setVisible] = useState(false);
	const { field } = useController({ control, name });

	return (
		<FormItem className="relative">
			<FormLabel className="text-xs md:text-sm">{label}</FormLabel>
			<FormControl>
				<Input
					{...field}
					type={visible ? 'text' : 'password'}
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

			<FormMessage className="absolute -bottom-4" />
		</FormItem>
	);
};
