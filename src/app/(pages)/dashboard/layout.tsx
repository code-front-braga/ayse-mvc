import { SidebarProvider, SidebarTrigger } from '@/ui/sidebar';

import { DashboardSidebar } from './components/sidebar/dashboard-sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<DashboardSidebar variant="floating" />
			<main className="w-full">
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						{/* <SiteHeader /> */}
						<SidebarTrigger />
						{children}
					</div>
				</div>
			</main>
		</SidebarProvider>
	);
};

export default DashboardLayout;
