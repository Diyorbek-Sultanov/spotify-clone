import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'

import Sidebar from '@/components/Sidebar'

import RootProvider from '@/providers/RootProvider'

import { getSongByUserId } from '@/actions/getSongsByUserId'

import Player from '@/components/Player'
import './globals.css'

const figtree = Figtree({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Spotify clone',
	description: 'Spotify clone description'
}

export const revalidate = 0

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const userSongs = await getSongByUserId()

	return (
		<html lang='en'>
			<body className={figtree.className}>
				<RootProvider>
					<Sidebar songs={userSongs}>{children}</Sidebar>
					<Player />
				</RootProvider>
			</body>
		</html>
	)
}
