'use client'

import PlayerContent from '@/components/PlayerContent'

import { useGetSongById } from '@/hooks/useGetSongById'
import { useLoadSongUrl } from '@/hooks/useLoadSongUrl'
import { usePlayer } from '@/hooks/usePlayer'

const Player: React.FC = () => {
	const player = usePlayer()
	const { song } = useGetSongById(player.activeId!)

	const songUrl = useLoadSongUrl(song!)

	if (!songUrl || !song || !player.activeId) return null

	return (
		<div className='fixed bottom-0 bg-black w-full py-2 h-[80px] px-4'>
			<PlayerContent song={song} songUrl={songUrl} key={songUrl} />
		</div>
	)
}

export default Player
