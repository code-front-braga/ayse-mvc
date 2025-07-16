import DashboardChart from './components/chart/dashboard-chart';
import { SectionCards } from './components/section-cards';
import { SupermarketTable } from './components/table/supermarket-table';

const DashboardHomePage = () => {
	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<SectionCards />
			<div className="grid grid-cols-1 gap-4">
				<DashboardChart />
				<SupermarketTable />
			</div>
		</div>
	);
};

export default DashboardHomePage;
