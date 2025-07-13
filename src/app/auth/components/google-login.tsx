import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';

const GoogleLogin = () => {
	return (
		<>
			<div className="relative">
				<Separator />
				<span className="bg-background absolute top-1/2 left-1/2 text-muted-foreground text-sm -translate-x-1/2 -translate-y-1/2 px-2">
					Ou
				</span>
			</div>
			<Button variant="outline" type="button" className="w-full">
				<FcGoogle />
				Continue com Google
			</Button>
		</>
	);
};

export default GoogleLogin;
