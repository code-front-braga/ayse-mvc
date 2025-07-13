import '@/styles/globals.css';

import { alumni, inter, zain } from '@/lib/google-fonts/font';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body
				className={`${inter.className} ${alumni.className} ${zain.className} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
