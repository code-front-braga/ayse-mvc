import { LucideIcon } from 'lucide-react';

import { TabsTrigger } from '@/ui/tabs';

export interface CustomTabsTriggerProps {
	icon: LucideIcon;
	title: string;
	value: string;
}

export const CustomTabsTrigger = ({
	icon: Icon,
	title,
	value,
}: CustomTabsTriggerProps) => {
	return (
		<TabsTrigger
			value={value}
			className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded data-[state=active]:shadow-lg"
		>
			<Icon
				className="-ms-0.5 me-1.5 opacity-60"
				size={16}
				aria-hidden="true"
			/>
			{title}
		</TabsTrigger>
	);
};
