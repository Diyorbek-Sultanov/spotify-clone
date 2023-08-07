import clsx from 'clsx'
import { forwardRef } from 'react'

type TInputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, TInputProps>(
	({ className, disabled, placeholder, type = 'text', ...rest }, ref) => {
		return (
			<input
				className={clsx(
					'flex w-full rounded-md bg-neutral-700 border border-transparent p-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:border-green-400 outline-none',
					className
				)}
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				{...rest}
				ref={ref}
			/>
		)
	}
)

Input.displayName = 'Input'

export default Input
