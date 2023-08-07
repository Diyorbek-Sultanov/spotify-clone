import {
	useSessionContext,
	useSupabaseClient
} from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Modal from '@/components/Modal'

import { useAuthModal } from '@/hooks/useAuthModal'

const AuthModal = () => {
	const supabaseClient = useSupabaseClient()
	const router = useRouter()
	const { session } = useSessionContext()
	const { onClose, isOpen } = useAuthModal()

	useEffect(() => {
		if (session) {
			router.refresh()
			onClose()
		}
	}, [router, onClose, session])

	const handleChange = (open: boolean) => {
		if (!open) {
			onClose()
		}
	}

	return (
		<Modal
			title={'Welcome back'}
			descr={'Login to your account'}
			isOpen={isOpen}
			onChange={handleChange}
		>
			<Auth
				theme='dark'
				providers={['github']}
				magicLink
				supabaseClient={supabaseClient}
				appearance={{
					theme: ThemeSupa,
					variables: {
						default: {
							colors: {
								brand: '#404040',
								brandAccent: '#22c55e'
							}
						}
					}
				}}
			/>
		</Modal>
	)
}

export default AuthModal
