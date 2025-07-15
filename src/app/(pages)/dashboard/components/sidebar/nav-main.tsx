'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/clsx/utils';
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/ui/sidebar';

interface NavMainProps {
	links: {
		icon?: LucideIcon;
		title: string;
		url: string;
	}[];
}

export const NavMain = ({ links }: NavMainProps) => {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarMenu>
				{links.map(link => (
					<SidebarMenuItem key={link.title}>
						<SidebarMenuButton asChild className="">
							<Link
								href={link.url}
								prefetch
								className={cn(
									'truncate',
									pathname === link.url
										? 'text-background bg-primary shadow-md'
										: 'text-secondary-foreground',
								)}
							>
								{link.icon && <link.icon />}
								{link.title}
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
};
