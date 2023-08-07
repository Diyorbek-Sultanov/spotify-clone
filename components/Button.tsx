import clsx from 'clsx'
import { forwardRef } from 'react'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(
	({ className, children, disabled, type = 'button', ...rest }, ref) => {
		return (
			<button
				className={clsx(
					'w-full rounded-full p-3 bg-green-500 cursor-pointer border border-transparent text-black font-bold hover:opacity-75 transition disabled:cursor-not-allowed disabled:opacity-50',
					className
				)}
				type={type}
				disabled={disabled}
				ref={ref}
				{...rest}
			>
				{children}
			</button>
		)
	}
)

Button.displayName = 'Button'

export default Button
