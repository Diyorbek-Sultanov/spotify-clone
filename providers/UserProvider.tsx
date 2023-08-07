'use client'

import type { FC, PropsWithChildren } from 'react'

import { UserContextProvider } from '@/hooks/useUser'

const UserProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return <UserContextProvider>{children}</UserContextProvider>
}

export default UserProvider
