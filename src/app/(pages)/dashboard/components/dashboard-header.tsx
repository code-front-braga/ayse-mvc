import { Plus } from 'lucide-react';

import { Button } from '@/ui/button';
import { SidebarTrigger } from '@/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';

export const DashboardHeader = () => {
	return (
		<header className="w-full">
			<div className="flex w-full justify-between">
				<SidebarTrigger />

				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="default" size="icon">
							<Plus />
						</Button>
					</TooltipTrigger>
					<TooltipContent side="left">Cadastrar nova compra</TooltipContent>
				</Tooltip>
			</div>
		</header>
	);
};
