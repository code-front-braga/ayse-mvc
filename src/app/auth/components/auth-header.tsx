import { ChartNoAxesCombined } from 'lucide-react';

const AuthHeader = () => {
	return (
		<header className="flex mt-12 flex-col items-center gap-2 self-center md:flex-row">
			<div className="flex items-center gap-1">
				<h1 className="font-inter text-primary text-3xl md:text-4xl">ayse</h1>
				<ChartNoAxesCombined size={16} className="text-primary self-baseline" />
			</div>
			<p className="text-muted-foreground self-baseline text-xs">
				all your supermarket expenses
			</p>
		</header>
	);
};

export default AuthHeader;
