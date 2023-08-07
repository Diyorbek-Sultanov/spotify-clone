import type { Metadata } from 'next'

import Header from '@/components/Header'

import { getSongsByTitle } from '@/actions/getSongsByTitle'

import SearchContent from './components/SearchContent'
import SearchInput from './components/SearchInput'

export const metadata: Metadata = {
	title: 'Spotify clone | Search',
	description: 'this is spotify clone search page'
}

interface ISearchProps {
	searchParams: {
		title: string
	}
}

export default async function SearchPage({ searchParams }: ISearchProps) {
	const songs = await getSongsByTitle(searchParams.title)

	console.log(searchParams.title)

	return (
		<div className='bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto'>
			<Header>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1
						className='capitalize
					 text-white text-3xl font-semibold'
					>
						search
					</h1>
					<SearchInput />
				</div>
			</Header>
			<SearchContent songs={songs} />
		</div>
	)
}
