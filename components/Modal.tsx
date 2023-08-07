import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'

interface IModalProps {
	isOpen: boolean
	onChange: (open: boolean) => void
	title: string
	descr: string
	children: React.ReactNode
}

const Modal: React.FC<IModalProps> = ({
	isOpen,
	onChange,
	title,
	descr,
	children
}) => {
	return (
		<Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
			<Dialog.Portal>
				<Dialog.Overlay className='bg-neutral-900/90 fixed inset-0 backdrop-blur-sm' />
				<Dialog.Content className='fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[85vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] bg-neutral-800 rounded-lg p-6 focus:outline-none'>
					<Dialog.Title className='font-bold mb-4 capitalize text-xl text-center'>
						{title}
					</Dialog.Title>
					<Dialog.Description className='text-center leading-normal mb-5 text-sm'>
						{descr}
					</Dialog.Description>
					<div>{children}</div>
					<Dialog.Close asChild>
						<button className='text-neutral-400 hover:text-white absolute top-3 right-3 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none transition'>
							<IoMdClose size={22} />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export default Modal
