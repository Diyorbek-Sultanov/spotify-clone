'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'

import { useOnPlay } from '@/hooks/useOnPlay'
import { useUser } from '@/hooks/useUser'

import { ISong } from '@/types'

const LikedContent: React.FC<{ songs: ISong[] }> = ({ songs }) => {
	const router = useRouter()
	const { user, isLoading } = useUser()
	const onPlay = useOnPlay(songs)

	useEffect(() => {
		if (!isLoading && !user) {
			router.replace('/')
		}
	}, [isLoading, user, router])

	if (songs.length === 0) {
		return (
			<div className='flex flex-col gap-y-2 px-6 w-full text-neutral-400'>
				No liked songs.
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-y-2 w-full p-6'>
			{songs.map(song => (
				<div className='flex items-center gap-x-4 w-full' key={song.id}>
					<div className='flex-1'>
						<MediaItem onClick={(id: string) => onPlay(id)} song={song} />
					</div>
					<LikeButton songId={song.id} />
				</div>
			))}
		</div>
	)
}

export default LikedContent
