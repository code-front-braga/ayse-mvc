const AuthSection = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="bg-background flex flex-col items-center gap-6 p-6 md:p-10">
			{children}
		</section>
	);
};

export default AuthSection;
