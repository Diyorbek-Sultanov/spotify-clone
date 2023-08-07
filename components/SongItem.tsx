import Image from 'next/image'

import { useLoadImage } from '@/hooks/useLoadImage'

import { ISong } from '@/types'
import PlayButton from './PlayButton'

interface ISongItem {
	data: ISong
	onClick: (id: string) => void
}

const SongItem: React.FC<ISongItem> = ({ data, onClick }) => {
	const imagePath = useLoadImage(data)

	return (
		<div
			className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 hover:bg-neutral-400/10 transition p-3 cursor-pointer'
			onClick={() => onClick(data.id)}
		>
			<div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
				<Image
					className='object-cover'
					src={imagePath || ''}
					alt='song image'
					fill
				/>
			</div>
			<div className='flex flex-col gap-y-1 pt-4 w-full items-start'>
				<p className='font-semibold truncate w-full'>{data.title}</p>
				<p className='truncate text-neutral-400 text-sm w-full pb-4'>
					By {data.author}
				</p>
			</div>
			<div className='absolute bottom-24 right-5'>
				<PlayButton />
			</div>
		</div>
	)
}

export default SongItem
