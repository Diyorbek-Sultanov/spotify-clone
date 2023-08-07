import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { ISong } from '@/types'

export const useLoadSongUrl = (song: ISong) => {
	const supabaseClient = useSupabaseClient()

	if (!song) return null

	const { data: songPath } = supabaseClient.storage
		.from('songs')
		.getPublicUrl(song.song_path)

	return songPath.publicUrl
}
