'use client'

import Image from 'next/image'

import { useLoadImage } from '@/hooks/useLoadImage'

import { ISong } from '@/types'

interface IMediaItemProps {
	song: ISong
	onClick?: (id: string) => void
}

const MediaItem: React.FC<IMediaItemProps> = ({ song, onClick }) => {
	const imageUrl = useLoadImage(song)

	const handleClick = () => {
		if (onClick) {
			return onClick(song.id)
		}

		// TODO: Default turn on player
	}

	return (
		<div
			className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/60 w-full p-2 rounded-md transition'
			onClick={handleClick}
		>
			<div className='relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md'>
				<Image className='object-cover' fill src={imageUrl || ''} alt='image' />
			</div>
			<div className='flex flex-col gap-y-1 overflow-hidden'>
				<p className='truncate text-white'>{song.title}</p>
				<p className='truncate text-neutral-400 text-sm'>{song.author}</p>
			</div>
		</div>
	)
}

export default MediaItem
