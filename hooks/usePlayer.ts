import { create } from 'zustand'

interface IPlayerProps {
	ids: string[]
	activeId?: string
	setId: (id: string) => void
	setIds: (ids: string[]) => void
	reset: () => void
}

export const usePlayer = create<IPlayerProps>(set => ({
	ids: [],
	activeId: undefined,
	setId: (id: string) => set({ activeId: id }),
	setIds: (ids: string[]) => set({ ids: ids }),
	reset: () => set({ ids: [], activeId: undefined })
}))
