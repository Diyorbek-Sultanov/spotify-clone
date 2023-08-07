import clsx from 'clsx'

interface IBoxProps {
	children: React.ReactNode
	className?: string
}

const Box: React.FC<IBoxProps> = ({ children, className }) => {
	return (
		<div className={clsx('bg-neutral-900 rounded-lg w-full', className)}>
			{children}
		</div>
	)
}

export default Box
