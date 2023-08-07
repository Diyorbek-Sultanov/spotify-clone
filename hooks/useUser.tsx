import { User } from '@supabase/auth-helpers-nextjs'
import {
	useSessionContext,
	useUser as useSupaUser
} from '@supabase/auth-helpers-react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { ISubscription, IUserDetails } from '@/types'

type TUserContext = {
	accessToken: string | null
	user: User | null
	userDetails: IUserDetails | null
	isLoading: boolean
	subscription: ISubscription | null
}

export const UserContext = createContext<TUserContext | undefined>(undefined)

export interface Props {
	[propsName: string]: any
}

export const UserContextProvider = (props: Props) => {
	const {
		session,
		isLoading: isUserLoading,
		supabaseClient: supabase
	} = useSessionContext()
	const user = useSupaUser()
	const accessToken = session?.access_token ?? null
	const [isLoadingData, setIsLoadingData] = useState(false)
	const [userDetails, setuserDetails] = useState<IUserDetails | null>(null)
	const [subscription, setsubscription] = useState<ISubscription | null>(null)

	const getUserDetails = () => supabase.from('users').select('*').single()
	const getSubscription = () =>
		supabase
			.from('subscription')
			.select('*, prices(*, products(*))')
			.in('status', ['trialing', 'active'])
			.single()

	useEffect(() => {
		if (user && !isLoadingData && !userDetails && !subscription) {
			setIsLoadingData(true)

			Promise.allSettled([getUserDetails(), getSubscription()]).then(result => {
				const userDetailsPromise = result[0]
				const subscriptionPromise = result[1]

				if (userDetailsPromise.status === 'fulfilled') {
					setuserDetails(userDetailsPromise.value.data as IUserDetails)
				}

				if (subscriptionPromise.status === 'fulfilled') {
					setsubscription(subscriptionPromise.value.data as ISubscription)
				}

				setIsLoadingData(false)
			})
		} else if (!user && !isUserLoading && !isLoadingData) {
			setuserDetails(null)
			setsubscription(null)
		}
	}, [user, isUserLoading])

	const value = useMemo(
		() => ({
			accessToken,
			user,
			userDetails,
			subscription,
			isLoading: isUserLoading || isLoadingData
		}),
		[accessToken, isLoadingData, isUserLoading, subscription, user, userDetails]
	)

	return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
	const context = useContext(UserContext)

	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider')
	}

	return context
}
