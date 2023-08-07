'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import type { IconType } from 'react-icons'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'

import Box from '@/components/Box'
import Library from '@/components/Library'
import SidebarItem from '@/components/SidebarItem'

import { usePlayer } from '@/hooks/usePlayer'

import { ISong } from '@/types'

export interface ISidebarNav {
	Icon: IconType
	label: string
	active: boolean
	href: string
}

interface ISidebarProps {
	songs: ISong[]
}

const Sidebar: React.FC<PropsWithChildren<ISidebarProps>> = ({
	children,
	songs
}) => {
	const pathname = usePathname()
	const player = usePlayer()

	const routes: ISidebarNav[] = useMemo(
		() => [
			{
				Icon: HiHome,
				label: 'Home',
				active: pathname !== '/search',
				href: '/'
			},
			{
				Icon: BiSearch,
				label: 'Search',
				active: pathname === '/search',
				href: '/search'
			}
		],
		[pathname]
	)

	return (
		<div
			className={clsx('flex h-full', player.activeId && 'h-[calc(100%-80px)]')}
		>
			<aside className='hidden md:flex flex-col h-full gap-y-2 bg-black w-[300px] p-2'>
				<Box>
					<div className='flex flex-col gap-y-4 px-5 py-4'>
						{routes.map(item => (
							<SidebarItem key={item.label} item={item} />
						))}
					</div>
				</Box>
				<Box className='overflow-y-auto h-full'>
					<Library songs={songs} />
				</Box>
			</aside>
			<main className='h-full flex-1 overflow-y-auto py-2'>{children}</main>
		</div>
	)
}

export default Sidebar
