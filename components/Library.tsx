import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'

import MediaItem from '@/components/MediaItem'

import { useAuthModal } from '@/hooks/useAuthModal'
import { useOnPlay } from '@/hooks/useOnPlay'
import { useUploadModal } from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'

import { ISong } from '@/types'

const Library: React.FC<{ songs: ISong[] }> = ({ songs }) => {
	const { user } = useUser()
	const authModal = useAuthModal()
	const uploadModal = useUploadModal()
	const onPlay = useOnPlay(songs)

	const handleClick = () => {
		if (!user) {
			return authModal.onOpen()
		}

		return uploadModal.onOpen()
	}

	return (
		<div className='flex flex-col'>
			<div className='flex items-center justify-between px-5 pt-4'>
				<div className='inline-flex items-center gap-x-2' onClick={handleClick}>
					<TbPlaylist className='text-neutral-400' size={26} />
					<p className='text-neutral-400 font-medium text-base'>Your Library</p>
				</div>
				<AiOutlinePlus
					className='text-neutral-400 cursor-pointer hover:text-white transition'
					onClick={handleClick}
					size={20}
				/>
			</div>
			<div className='flex flex-col gap-y-2 mt-4 px-3'>
				{songs.map(song => (
					<MediaItem
						key={song.id}
						song={song}
						onClick={(id: string) => onPlay(id)}
					/>
				))}
			</div>
		</div>
	)
}

export default Library
