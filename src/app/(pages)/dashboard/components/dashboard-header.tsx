'use client';

import { useState } from 'react';

import { SidebarTrigger } from '@/ui/sidebar';
import { TooltipProvider } from '@/ui/tooltip';

import AddProductSheet from '../new-purchase/components/add-product-sheet';
import CreatePurchaseDialog from '../new-purchase/components/create-purchase-dialog';

export const DashboardHeader = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	return (
		<header className="w-full">
			<div className="flex w-full items-center justify-between">
				<SidebarTrigger />

				<TooltipProvider>
					<CreatePurchaseDialog
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
						setIsSheetOpen={setIsSheetOpen}
					/>
					<AddProductSheet
						isSheetOpen={isSheetOpen}
						setIsSheetOpen={setIsSheetOpen}
					/>
				</TooltipProvider>
			</div>
		</header>
	);
};
