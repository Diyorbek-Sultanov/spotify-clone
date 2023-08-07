import type { Metadata } from 'next'
import Image from 'next/image'

import Header from '@/components/Header'

import { getLikedSongs } from '@/actions/getLikedSongs'

import LikedContent from './components/LikedContent'

export const metadata: Metadata = {
	title: 'Spotify clone | liked',
	description: 'this is spotify liked page'
}

export const revalidate = 0

export default async function LikedPage() {
	const songs = await getLikedSongs()

	return (
		<div className='w-full h-full rounded-lg bg-neutral-900 overflow-hidden overflow-y-auto'>
			<Header>
				<div className='mt-20'>
					<div className='flex flex-col md:flex-row items-center gap-x-5'>
						<div className='relative h-32 w-32 lg:w-44 lg:h-44'>
							<Image src={'/images/liked.png'} fill alt='liked' />
						</div>
						<div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
							<p className='capitalize hidden md:block font-semibold text-sm'>
								playlist
							</p>
							<h1 className='text-4xl font-bold sm:text-5xl lg:text-7xl'>
								Liked songs
							</h1>
						</div>
					</div>
				</div>
			</Header>
			<LikedContent songs={songs} />
		</div>
	)
}
