import type { ComponentProps, HTMLAttributes } from 'react';

import { cn } from '@/lib/clsx/utils';
import { Badge } from '@/ui/badge';

export type StatusProps = ComponentProps<typeof Badge> & {
	status: 'maintenance' | 'degraded' | 'offline' | 'online';
};

export const Status = ({ className, status, ...props }: StatusProps) => (
	<Badge
		className={cn('flex items-center gap-2', 'group', status, className)}
		variant="secondary"
		{...props}
	/>
);

export type StatusIndicatorProps = HTMLAttributes<HTMLSpanElement>;

export const StatusIndicator = ({ ...props }: StatusIndicatorProps) => (
	<span className="relative flex h-2 w-2" {...props}>
		<span
			className={cn(
				'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
				'group-[.online]:bg-emerald-500',
				'group-[.offline]:bg-red-500',
				'group-[.maintenance]:bg-blue-500',
				'group-[.degraded]:bg-primary',
			)}
		/>
		<span
			className={cn(
				'relative inline-flex h-2 w-2 rounded-full',
				'group-[.online]:bg-emerald-500',
				'group-[.offline]:bg-red-500',
				'group-[.maintenance]:bg-blue-500',
				'group-[.degraded]:bg-primary',
			)}
		/>
	</span>
);

export type StatusLabelProps = HTMLAttributes<HTMLSpanElement>;

export const StatusLabel = ({
	className,
	children,
	...props
}: StatusLabelProps) => (
	<span className={cn('text-muted-foreground', className)} {...props}>
		{children ?? (
			<>
				<span className="hidden group-[.online]:block">finalizada</span>
				<span className="hidden group-[.offline]:block">cancelada</span>
				<span className="hidden group-[.maintenance]:block">pendente</span>
				<span className="hidden group-[.degraded]:block">em andamento</span>
			</>
		)}
	</span>
);
