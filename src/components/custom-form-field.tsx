'use client';

import { Control, FieldValues, Path } from 'react-hook-form';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/ui/form';
import { Input } from '@/ui/input';

interface CustomFormFieldProps<T extends FieldValues> {
	children?: React.ReactNode;
	icon?: React.ReactNode;
	autoComplete?: string;
	placeholder?: string;
	control: Control<T>;
	disabled?: boolean;
	label?: string;
	name: Path<T>;
	type?: string;
}

export function CustomFormField<T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	type = 'text',
	autoComplete,
	disabled = false,
	icon,
	children,
}: CustomFormFieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="relative">
					{label && (
						<FormLabel className="text-xs md:text-sm">{label}</FormLabel>
					)}
					<FormControl>
						<Input
							{...field}
							type={type}
							placeholder={placeholder}
							disabled={disabled}
							autoComplete={autoComplete}
							className="peer pe-9"
						/>
					</FormControl>

					{icon && (
						<div className="text-muted-foreground/80 absolute end-0 top-[32px] flex items-center justify-center pe-3 peer-disabled:opacity-50 md:top-[34px]">
							{icon}
						</div>
					)}

					{children}

					<FormMessage className="absolute -bottom-4" />
				</FormItem>
			)}
		/>
	);
}
