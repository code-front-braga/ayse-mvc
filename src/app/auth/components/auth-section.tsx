const AuthSection = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="bg-background grid h-full min-h-svh gap-6 p-6 lg:grid-cols-2 lg:p-0">
			{children}
		</section>
	);
};

export default AuthSection;
