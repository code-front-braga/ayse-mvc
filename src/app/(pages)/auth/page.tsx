import Image from 'next/image';

import { AuthHeader } from './components/auth-header';
import { AuthSection } from './components/auth-section';
import { AuthTabs } from './components/auth-tabs';

const AuthPage = () => {
	return (
		<AuthSection>
			<div className="flex h-full flex-col items-center justify-center gap-6">
				<AuthHeader />
				<AuthTabs />
			</div>
			<div className="bg-primary relative hidden lg:block">
				<Image
					src="/auth-bg.jpg"
					alt=""
					fill
					className="object-cover opacity-55"
				/>
				<p className="text-background font-zain absolute top-2/6 left-4 w-xl text-4xl font-bold">
					Controle todos os seus gastos em supermercados.
				</p>
			</div>
		</AuthSection>
	);
};

export default AuthPage;
