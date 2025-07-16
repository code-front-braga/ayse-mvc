'use client';

import { ChartNoAxesCombined, LayoutGrid, ShoppingBag } from 'lucide-react';
import * as React from 'react';

import { AllRoutes } from '@/app/enums/all-routes';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/ui/sidebar';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';

const data = {
	user: {
		name: 'Leonardo Braga',
		email: 'leo@example.com',
		avatar: '/avatars/shadcn.jpg',
	},

	navMain: [
		{
			title: 'Dashboard',
			url: AllRoutes.DASHBOARD_HOME,
			icon: LayoutGrid,
		},
		{
			title: 'Minhas Compras',
			url: AllRoutes.DASHBOARD_PURCHASES_HISTORY,
			icon: ShoppingBag,
		},
	],
};

export const DashboardSidebar = ({
	...props
}: React.ComponentProps<typeof Sidebar>) => {
	return (
		<Sidebar {...props} collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton className="pointer-events-none data-[slot=sidebar-menu-button]:!p-1.5">
							<ChartNoAxesCombined className="!size-4" color="#ff781a" />
							<span className="text-primary">ayse</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain links={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
		</Sidebar>
	);
};
