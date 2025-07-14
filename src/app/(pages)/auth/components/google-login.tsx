import { Separator } from '@/ui/separator';

import { GoogleForm } from './form/auth-forms';

export const GoogleLogin = () => {
	return (
		<div className="mt-6">
			<div className="relative">
				<Separator />
				<span className="bg-background text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs">
					Ou
				</span>
			</div>
			<GoogleForm />
		</div>
	);
};
