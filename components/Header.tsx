'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FaUserAlt } from 'react-icons/fa'
import { HiHome, HiSearch } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'

import Button from '@/components/Button'

import { useAuthModal } from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { toast } from 'react-hot-toast'

interface IHeaderProps {
	className?: string
	children: React.ReactNode
}

const Header: React.FC<IHeaderProps> = ({ children, className }) => {
	const router = useRouter()
	const { onOpen } = useAuthModal()

	const supabaseClient = useSupabaseClient()
	const { user } = useUser()

	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut()

		router.refresh()

		if (error) {
			toast.error(error.message)
		} else {
			toast.success('Logged out')
		}
	}

	return (
		<div
			className={clsx('bg-gradient-to-b from-emerald-800 h-fit p-6', className)}
		>
			<div className='w-full mb-4 flex items-center justify-between'>
				<div className='hidden md:flex items-center gap-x-2'>
					<button
						className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
						onClick={() => router.back()}
					>
						<RxCaretLeft className='text-white' size={25} />
					</button>
					<button
						className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'
						onClick={() => router.forward()}
					>
						<RxCaretRight className='text-white' size={25} />
					</button>
				</div>
				<div className='flex md:hidden items-center gap-x-2'>
					<button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition-all'>
						<HiHome className='text-black' size={20} />
					</button>
					<button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition-all'>
						<HiSearch className='text-black' size={20} />
					</button>
				</div>
				<div className='flex justify-between items-center gap-x-4'>
					{user ? (
						<div className='flex items-center gap-x-4'>
							<div>
								<Button className='bg-white px-6 py-2' onClick={handleLogout}>
									Log out
								</Button>
							</div>
							<div>
								<Button onClick={() => router.push('/account')}>
									<FaUserAlt />
								</Button>
							</div>
						</div>
					) : (
						<>
							<div>
								<Button className='px-5 py-2' onClick={onOpen}>
									Sign up
								</Button>
							</div>
							<div>
								<Button className='bg-white px-6 py-2' onClick={onOpen}>
									Sign in
								</Button>
							</div>
						</>
					)}
				</div>
			</div>
			{children}
		</div>
	)
}

export default Header
