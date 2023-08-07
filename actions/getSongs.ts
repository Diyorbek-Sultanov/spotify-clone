import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { ISong } from '@/types'

export const getSongs = async (): Promise<ISong[]> => {
	const supabase = createServerComponentClient({
		cookies: cookies
	})

	const { data, error } = await supabase
		.from('songs')
		.select('*')
		.order('created_at', { ascending: false })

	if (error) {
		console.log(error)
	}

	return (data as any) || []
}
