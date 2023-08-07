import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import { ISong } from '@/types'

export const useGetSongById = (id: string) => {
	const { supabaseClient } = useSessionContext()

	const [isLoading, setIsLoadig] = useState(false)
	const [song, setSong] = useState<ISong | undefined>(undefined)

	useEffect(() => {
		if (!id) {
			return
		}

		setIsLoadig(true)

		const fetchSong = async () => {
			const { data, error } = await supabaseClient
				.from('songs')
				.select('*')
				.eq('id', id)
				.single()

			if (error) {
				setIsLoadig(false)
				return toast.error(error.message)
			}

			setSong(data as ISong)
			setIsLoadig(false)
		}

		fetchSong()
	}, [id, supabaseClient])

	return useMemo(
		() => ({
			isLoading,
			song
		}),
		[song, isLoading]
	)
}
