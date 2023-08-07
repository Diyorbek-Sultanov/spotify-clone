import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay?: number): T {
	const [debounced, setDebounced] = useState<T>(value)

	useEffect(() => {
		const timer = setTimeout(() => setDebounced(value), delay || 500)

		return () => clearTimeout(timer)
	}, [delay, value])

	return debounced
}
