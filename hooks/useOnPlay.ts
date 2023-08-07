import { useAuthModal } from '@/hooks/useAuthModal'
import { usePlayer } from '@/hooks/usePlayer'
import { useUser } from '@/hooks/useUser'

import { ISong } from '@/types'

export const useOnPlay = (songs: ISong[]) => {
	const player = usePlayer()
	const authModal = useAuthModal()
	const { user } = useUser()

	const onPlay = (id: string) => {
		if (!user) {
			return authModal.onOpen()
		}

		player.setId(id)
		player.setIds(songs.map(song => song.id))
	}

	return onPlay
}
