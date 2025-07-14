import { User, UserPlus } from 'lucide-react';

import { Tabs, TabsContent, TabsList } from '@/ui/tabs';

import CustomTabsTrigger, {
	CustomTabsTriggerProps,
} from './custom-tabs-trigger';
import { LoginForm, RegisterForm } from './form/auth-forms';
import { GoogleLogin } from './google-login';

const tabs: CustomTabsTriggerProps[] = [
	{
		value: 'login-tab',
		title: 'Login',
		icon: User,
	},
	{
		value: 'register-tab',
		title: 'Cadastro',
		icon: UserPlus,
	},
];

const AuthTabs = () => {
	return (
		<Tabs defaultValue="login-tab" className="w-full max-w-sm">
			<TabsList className="mb-3 gap-1 self-center bg-transparent">
				{tabs.map(tab => (
					<CustomTabsTrigger
						key={tab.value}
						title={tab.title}
						value={tab.value}
						icon={tab.icon}
					/>
				))}
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
