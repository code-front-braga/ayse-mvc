import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/ui/button';

export const GoogleForm = () => {
	return (
		<form
			action={async () => {
				'use server';
			}}
			className="mt-6"
		>
			<Button variant="outline" type="submit" className="w-full">
				<FcGoogle />
				Continue com Google
			</Button>
		</form>
	);
};
