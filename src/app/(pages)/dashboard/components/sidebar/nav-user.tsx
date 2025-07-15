'use client';

import { GripVertical, LogOut, User } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/ui/sidebar';

interface NavUserProps {
	user: {
		avatar: string;
		email: string;
		name: string;
	};
}

export const NavUser = ({ user }: NavUserProps) => {
	const { isMobile } = useSidebar();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton size="lg" className="bg-primary/20">
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={user.avatar} alt={user.name} />
								<AvatarFallback className="bg-primary text-background rounded-lg">
									CN
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="text-primary truncate">{user.name}</span>
								<span className="text-muted-foreground truncate text-xs">
									{user.email}
								</span>
							</div>
							<GripVertical color="#ff781a" className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? 'bottom' : 'right'}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback className="bg-primary text-background rounded-lg">
										CN
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="text-primary truncate">{user.name}</span>
									<span className="text-muted-foreground truncate text-xs">
										{user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link
									href="/dashboard/account"
									className="text-muted-foreground flex w-full cursor-pointer items-center gap-2"
								>
									<User color="#ff781a" />
									Conta
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<button className="text-muted-foreground flex w-full cursor-pointer items-center gap-2">
								<LogOut color="#ff781a" />
								Sair
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
