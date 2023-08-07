import clsx from 'clsx'
import Link from 'next/link'

import { ISidebar } from './Sidebar'

const SidebarItem: React.FC<{ item: ISidebar }> = ({ item }) => {
	return (
		<Link
			className={clsx(
				'flex h-auto items-center w-full gap-x-4 text-base font-medium cursor-pointer text-neutral-400 hover:text-white transition py-1 capitalize',
				item.active && 'text-white'
			)}
			href={item.href}
		>
			<item.Icon size={26} />
			<p className='truncate w-full'>{item.label}</p>
		</Link>
	)
}

export default SidebarItem
