import { Separator } from '@/ui/separator';
import { SidebarProvider } from '@/ui/sidebar';

import { DashboardHeader } from './components/dashboard-header';
import { DashboardSidebar } from './components/sidebar/dashboard-sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<DashboardSidebar variant="floating" />
			<main className="w-full px-4 py-2">
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<DashboardHeader />
						{/* <Separator /> */}
						{children}
					</div>
				</div>
			</main>
		</SidebarProvider>
	);
};

export default DashboardLayout;
