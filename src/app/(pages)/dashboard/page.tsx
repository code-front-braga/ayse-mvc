import DashboardChart from './components/chart/dashboard-chart';
import { SectionCards } from './components/section-cards';

const DashboardHomePage = () => {
	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<SectionCards />
			<div className="grid grid-cols-1 @xl/main:grid-cols-2">
				<DashboardChart />
        
			</div>
		</div>
	);
};

export default DashboardHomePage;
