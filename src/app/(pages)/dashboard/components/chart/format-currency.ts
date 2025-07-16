export function formatCurrency(
	value: (number | string)[] | number | string,
): string {
	if (Array.isArray(value)) {
		return value.map(formatCurrency).join(', ');
	}
	const num = typeof value === 'number' ? value : parseFloat(value);
	return num.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
	});
}
