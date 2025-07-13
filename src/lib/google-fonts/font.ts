import { Alumni_Sans_Pinstripe, Inter, Zain } from 'next/font/google';

const inter = Inter({
	subsets: ['latin'],
	weight: ['200', '400', '700', '900'],
});

const alumni = Alumni_Sans_Pinstripe({
	subsets: ['latin'],
	weight: ['400'],
});

const zain = Zain({
	subsets: ['latin'],
	weight: ['200', '400', '700', '900'],
});

export { alumni, inter, zain };
