import { useEffect, useState } from 'react'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
//@ts-ignore
import useSound from 'use-sound'

import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'
import Slider from '@/components/Slider'

import { usePlayer } from '@/hooks/usePlayer'

import { ISong } from '@/types'

interface IPlayerContent {
	song: ISong
	songUrl: string
}

const PlayerContent: React.FC<IPlayerContent> = ({ song, songUrl }) => {
	const player = usePlayer()
	const [volume, setVolume] = useState(1)
	const [isPlaying, setIsPlaying] = useState(false)

	const Icon = isPlaying ? BsPauseFill : BsPlayFill
	const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

	const onPlayNext = () => {
		if (player.ids.length === 0) return

		const currentIndex = player.ids.findIndex(id => id === player.activeId)
		const nextSong = player.ids[currentIndex + 1]

		if (!nextSong) {
			return player.setId(player.ids[0])
		}

		player.setId(nextSong)
	}

	const onPlayPrev = () => {
		if (player.ids.length === 0) return

		const currentIndex = player.ids.findIndex(id => id === player.activeId)
		const prevSong = player.ids[currentIndex - 1]

		if (!prevSong) {
			return player.setId(player.ids[player.ids.length - 1])
		}

		player.setId(prevSong)
	}

	const [play, { pause, sound }] = useSound(songUrl, {
		volume: volume,
		onplay: () => setIsPlaying(true),
		onend: () => {
			setIsPlaying(false)
			onPlayNext()
		},
		onpause: () => setIsPlaying(false),
		format: ['mp3']
	})

	useEffect(() => {
		sound?.play()

		return () => sound?.unload()
	}, [sound])

	const handlePlay = () => {
		if (!isPlaying) {
			play()
		} else {
			pause()
		}
	}

	const toggleMute = () => {
		if (volume === 0) {
			setVolume(1)
		} else {
			setVolume(0)
		}
	}

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 h-full'>
			<div className='flex w-full justify-start'>
				<div className='flex items-center gap-x-4'>
					<MediaItem song={song} />
					<LikeButton songId={song.id} />
				</div>
			</div>
			<div className='flex md:hidden col-auto w-full justify-end items-center'>
				<div
					className='w-10 h-10 flex items-center justify-center rounded-full bg-green-500 cursor-pointer p-1 hover:bg-green-500/80 transition'
					onClick={handlePlay}
				>
					<Icon className='text-black' size={30} />
				</div>
			</div>
			<div className='hidden md:flex items-center justify-center gap-x-6 w-full max-w-[722px]'>
				<AiFillStepBackward
					onClick={onPlayPrev}
					size={30}
					className='text-neutral-400 hover:text-white transition cursor-pointer'
				/>
				<div
					className='w-10 h-10 flex items-center justify-center bg-green-500 rounded-full cursor-pointer p-1 hover:bg-green-500/80 transition'
					onClick={handlePlay}
				>
					<Icon size={30} className='text-black' />
				</div>
				<AiFillStepForward
					onClick={onPlayNext}
					size={30}
					className='text-neutral-400 hover:text-white transition cursor-pointer'
				/>
			</div>
			<div className='hidden md:flex w-full justify-end pr-2'>
				<div className='flex items-center gap-x-2 w-[120px]'>
					<VolumeIcon
						size={30}
						onClick={toggleMute}
						className='cursor-pointer'
					/>
					<Slider value={volume} onChange={value => setVolume(value)} />
				</div>
			</div>
		</div>
	)
}

export default PlayerContent
