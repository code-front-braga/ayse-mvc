const capitalizeWords = (input: string) => {
	return input
		.toLowerCase()
		.split(' ')
		.filter(Boolean)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export default capitalizeWords;
