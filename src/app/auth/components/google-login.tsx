import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';

const GoogleLogin = () => {
	return (
		<div className='mt-6'>
			<div className="relative">
				<Separator />
				<span className="bg-background text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs">
					Ou
				</span>
			</div>
			<form
				action={async () => {
					'use server';
				}}
        className='mt-6'
			>
				<Button variant="outline" type="submit" className="w-full">
					<FcGoogle />
					Continue com Google
				</Button>
			</form>
		</div>
	);
};

export default GoogleLogin;
