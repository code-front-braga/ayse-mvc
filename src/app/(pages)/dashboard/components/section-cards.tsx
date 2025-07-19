import {
	ArrowUpRight,
	Award,
	CircleQuestionMark,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/ui/tooltip';

import { CustomCard } from './curstom-card';

export const SectionCards = () => {
	return (
    // Verificar condição: se não houver compra, não deverá aparecer nenhum card
    // Aparecer o supermercado mais frequentado somente quando houver mais de uma compra no mesmo supermercado
		<div className="*:data-[slot=card]:bg-sidebar grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs md:*:data-[slot=card]:transition-all md:*:data-[slot=card]:duration-300 md:*:data-[slot=card]:hover:-translate-y-1.5 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<CustomCard
				description="Gasto Total"
				title="R$ 3.250,00"
				actionChildren={
					<div className="flex items-center gap-1">
						<Badge
							variant="outline"
							className="border-primary/25 text-primary/90 bg-primary/10 rounded-sm font-bold"
						>
							+ R$ 300,00
						</Badge>
						<Tooltip>
							<TooltipTrigger>
								<CircleQuestionMark size={12} color="#ff781a" />
							</TooltipTrigger>
							<TooltipContent side="top" className="shadow-lg">
								<p>Valor somado após a última compra</p>
							</TooltipContent>
						</Tooltip>
					</div>
				}
				footerChildren={
					<span className="text-primary/75 line-clamp-1 font-medium">
						Valor acumulado
					</span>
				}
			/>
			<CustomCard
				description="Compra Mais Recente"
				title="R$ 600,00"
				actionChildren={
					<Badge
						variant="outline"
						className="border-primary/25 text-primary/90 bg-primary/10 rounded-sm font-bold"
					>
						22/04/1991
					</Badge>
				}
				footerChildren={
					<>
						<span className="text-primary/75 line-clamp-1 font-medium">
							Realizada no Atakarejo
						</span>
						<div className="flex w-full items-center justify-between">
							<span className="text-gray-800">Rua Jurema, n° 608</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link href="">
										<ArrowUpRight size={16} color="#ff781a" />
									</Link>
								</TooltipTrigger>
								<TooltipContent side="bottom" className="shadow-lg">
									<p>Ver detalhes da compra</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</>
				}
			/>
			<CustomCard
				description="Mais Frequentado"
				title="Atakarejo"
				actionChildren={
					<Badge
						variant="outline"
						className="border-primary/25 text-primary/90 bg-primary/10 rounded-sm font-bold"
					>
						<Award />
					</Badge>
				}
				footerChildren={
					<>
						<span className="text-primary/75 line-clamp-1 font-medium">
							Total gasto: R$ 1.000,00
						</span>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href=""
									className="text-primary flex items-center gap-1 text-xs underline underline-offset-2"
								>
									10 visitas registradas
									<ArrowUpRight size={16} color="#ff781a" />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="bottom" className="shadow-lg">
								<p>Ver compras</p>
							</TooltipContent>
						</Tooltip>
					</>
				}
			/>
			<CustomCard
				description="Gasto em Julho"
				title="R$ 1.650,00"
				actionChildren={
					<div className="flex items-center gap-1">
						<Badge
							variant="outline"
							className="border-primary/25 text-primary/90 bg-primary/10 rounded-sm font-bold"
						>
							+ R$ 250,00
						</Badge>
						<Tooltip>
							<TooltipTrigger>
								<CircleQuestionMark size={12} color="#ff781a" />
							</TooltipTrigger>
							<TooltipContent side="left" className="shadow-lg">
								<p>Última adição neste mês</p>
							</TooltipContent>
						</Tooltip>
					</div>
				}
				footerChildren={
					<>
						<Badge
							variant="outline"
							className="border-primary/25 rounded-sm bg-emerald-50 font-bold text-emerald-500"
						>
							{/* Se for negativo, cor vermelha */}
							<TrendingUp /> 12%
						</Badge>

						<Tooltip>
							<TooltipTrigger>
								<Link
									href=""
									className="text-primary line-clamp-1 flex items-center gap-1 text-xs font-medium underline underline-offset-2"
								>
									em relação ao mês passado
									<ArrowUpRight size={12} />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="bottom" className="shadow-lg">
								Ver compras do mês anterior
							</TooltipContent>
						</Tooltip>
					</>
				}
			/>
		</div>
	);
};
