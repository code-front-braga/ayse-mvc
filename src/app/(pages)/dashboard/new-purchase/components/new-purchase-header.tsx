import {
	Status,
	StatusIndicator,
	StatusLabel,
} from '@/components/ui/kibo-ui/status';
import { Badge } from '@/ui/badge';

import { CustomCard } from '../../components/curstom-card';

const NewPurchaseHeader = () => {
	return (
		<header className="*:data-[slot=card]:bg-sidebar grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs md:*:data-[slot=card]:transition-all md:*:data-[slot=card]:duration-300 md:*:data-[slot=card]:hover:-translate-y-1.5 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<CustomCard
				description="Total"
				title="R$ 500,00"
				actionChildren={
					// <Badge variant="outline">
					// 	<span
					// 		className="bg-primary size-1.5 rounded-full animate-pulse"
					// 		aria-hidden="true"
					// 	></span>
					// 	Em andamento
					// </Badge>
					<Status status="degraded" variant="outline">
						<StatusIndicator />
						<StatusLabel />
					</Status>
				}
				footerChildren={
					<div className="flex w-full items-center justify-between">
						<Badge>Atakarejo</Badge>
						<Badge>20 produtos cadastrados</Badge>
					</div>
				}
			/>
		</header>
	);
};

export default NewPurchaseHeader;
