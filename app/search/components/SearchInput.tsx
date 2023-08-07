'use client'

import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'

import Input from '@/components/Input'

import { useDebounce } from '@/hooks/useDebounce'

const SearchInput: React.FC = () => {
	const [value, setValue] = useState('')
	const router = useRouter()

	const debounceValue = useDebounce(value, 400)

	useEffect(() => {
		const query = {
			title: debounceValue
		}

		const url = qs.stringifyUrl(
			{
				url: '/search',
				query
			},
			{ skipNull: true, skipEmptyString: true }
		)

		router.push(url)
	}, [debounceValue, router])

	return (
		<Input
			value={value}
			onChange={e => setValue(e.target.value)}
			placeholder='What do you want to listen to'
		/>
	)
}

export default SearchInput
