import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import uniqid from 'uniqid'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Modal from '@/components/Modal'

import { useUploadModal } from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'

interface IForm {
	author: string
	title: string
	song: string | null
	image: string | null
}

const UploadModal = () => {
	const [isLoading, setIsLoading] = useState(false)
	const uploadModal = useUploadModal()
	const { user } = useUser()
	const supabaseClient = useSupabaseClient()
	const router = useRouter()

	const { register, reset, handleSubmit } = useForm<IForm>({
		defaultValues: {
			author: '',
			title: '',
			song: null,
			image: null
		},
		mode: 'onChange'
	})

	const handleChange = (open: boolean) => {
		if (!open) {
			reset()
			uploadModal.onClose()
		}
	}

	const onSubmitHandler: SubmitHandler<IForm> = async data => {
		try {
			setIsLoading(true)

			const imgaeFile = data.image?.[0]
			const songFile = data.song?.[0]

			if (!imgaeFile || !songFile || !user) {
				toast.error('Missing fields')
				return
			}

			const uniqID = uniqid()

			// song upload
			const { data: songData, error: songError } = await supabaseClient.storage
				.from('songs')
				.upload(`song-${data.title}-${uniqID}`, songFile, {
					cacheControl: '3600',
					upsert: false
				})

			if (songError) {
				setIsLoading(false)
				return toast.error('Failed song upload')
			}

			// image upload
			const { data: imageData, error: imageError } =
				await supabaseClient.storage
					.from('images')
					.upload(`image-${data.title}-${uniqID}`, imgaeFile, {
						cacheControl: '3600',
						upsert: false
					})

			if (imageError) {
				setIsLoading(false)
				return toast.error('Failed image upload')
			}

			const { error: supabaseError } = await supabaseClient
				.from('songs')
				.insert({
					title: data.title,
					song_path: songData.path,
					image_path: imageData.path,
					author: data.author,
					user_id: user.id
				})

			if (supabaseError) {
				setIsLoading(false)
				return toast.error(supabaseError.message)
			}

			router.refresh()
			setIsLoading(false)
			toast.success('Song created!')
			reset()
			uploadModal.onClose()
		} catch (error) {
			toast.error('Somthing went wrong')
		}
	}

	return (
		<Modal
			isOpen={uploadModal.isOpen}
			title={'Add a song'}
			descr={'Upload an mp3 file'}
			onChange={handleChange}
		>
			<form
				className='flex flex-col gap-y-4'
				onSubmit={handleSubmit(onSubmitHandler)}
			>
				<Input
					id={'title'}
					disabled={isLoading}
					{...register('title', { required: 'Title is required' })}
					placeholder={'Song title'}
				/>
				<Input
					id={'author'}
					disabled={isLoading}
					{...register('author', { required: 'Author is required' })}
					placeholder={'Author'}
				/>
				<div>
					<div className='pb-1'>select a song</div>
					<Input
						id={'song'}
						type={'file'}
						disabled={isLoading}
						accept='.mp3'
						{...register('song', { required: 'Song is required' })}
					/>
				</div>
				<div>
					<div className='pb-1'>select an image</div>
					<Input
						id={'image'}
						type={'file'}
						disabled={isLoading}
						accept='image/*'
						{...register('image', { required: 'Image is required' })}
					/>
				</div>
				<Button disabled={isLoading} type='submit'>
					Create
				</Button>
			</form>
		</Modal>
	)
}

export default UploadModal
