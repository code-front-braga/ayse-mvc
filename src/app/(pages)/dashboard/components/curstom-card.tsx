import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/ui/card';

interface CustomCardProps {
	actionChildren?: React.ReactNode;
	footerChildren?: React.ReactNode;
	description: string;
	title: string;
}

export const CustomCard = ({
	description,
	title,
	actionChildren,
	footerChildren,
}: CustomCardProps) => {
	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription className="text-primary/70">
					{description}
				</CardDescription>
				<CardTitle className="text-primary font-semibold tabular-nums @[250px]/card:text-xl">
					{title}
				</CardTitle>
				<CardAction>{actionChildren}</CardAction>
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1.5 text-sm">
				{footerChildren}
			</CardFooter>
		</Card>
	);
};
