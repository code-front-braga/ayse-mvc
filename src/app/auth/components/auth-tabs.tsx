import { User, UserPlus } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs';

import GoogleLogin from './google-login';
import LoginForm from './login-form';
import RegisterForm from './register-form';

const AuthTabs = () => {
	return (
		<Tabs defaultValue="login-tab" className="w-full max-w-sm">
			<TabsList className="mb-3 gap-1 self-center bg-transparent">
				<TabsTrigger
					value="login-tab"
					className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded data-[state=active]:shadow-lg"
				>
					<User
						className="-ms-0.5 me-1.5 opacity-60"
						size={16}
						aria-hidden="true"
					/>
					Login
				</TabsTrigger>
				<TabsTrigger
					value="register-tab"
					className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded data-[state=active]:shadow-lg"
				>
					<UserPlus
						className="-ms-0.5 me-1.5 opacity-60"
						size={16}
						aria-hidden="true"
					/>
					Cadastro
				</TabsTrigger>
			</TabsList>

			<TabsContent value="login-tab" className="mt-6">
				<LoginForm />
				<GoogleLogin />
			</TabsContent>
			<TabsContent value="register-tab">
				<RegisterForm />
			</TabsContent>
		</Tabs>
	);
};

export default AuthTabs;
