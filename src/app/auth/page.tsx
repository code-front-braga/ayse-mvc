import AuthHeader from './components/auth-header';
import AuthSection from './components/auth-section';
import AuthTabs from './components/auth-tabs';

const AuthPage = () => {
	return (
		<AuthSection>
			<AuthHeader />
			<AuthTabs />
		</AuthSection>
	);
};

export default AuthPage;
