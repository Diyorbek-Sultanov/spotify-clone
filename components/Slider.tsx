import * as RadixSlider from '@radix-ui/react-slider'

interface ISliderProps {
	value?: number
	onChange?: (value: number) => void
}

const Slider: React.FC<ISliderProps> = ({ value = 1, onChange }) => {
	const handleChange = (newValue: number[]) => {
		onChange?.(newValue[0])
	}

	return (
		<RadixSlider.Root
			className='relative flex items-center w-full h-10 select-none touch-none'
			defaultValue={[1]}
			value={[value]}
			onValueChange={handleChange}
			max={1}
			step={0.1}
			aria-label='Volume'
		>
			<RadixSlider.Track className='bg-neutral-900 relative grow rounded-full h-[3px]'>
				<RadixSlider.Range className='absolute bg-white rounded-full h-full' />
			</RadixSlider.Track>
		</RadixSlider.Root>
	)
}

export default Slider
