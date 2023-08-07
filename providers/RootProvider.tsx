'use client'

import type { FC, PropsWithChildren } from 'react'

import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ToasterProvider from './ToasterProvider'

const RootProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<SupabaseProvider>
			<UserProvider>
				<ToasterProvider />
				<ModalProvider />
				{children}
			</UserProvider>
		</SupabaseProvider>
	)
}

export default RootProvider
