import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";

export default function MFrame(props: {
	children: React.ReactNode
	show: boolean
	setShow: (show: boolean) => void
	preventClose?: boolean
}) {
	return <Transition.Root show={props.show} as={Fragment}>
		<Dialog as="div" className="relative z-10" onClose={(close) => {
			if(
				props.preventClose === undefined ||
				props.preventClose === false
			) props.setShow(close)
		}}>
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
			</Transition.Child>

			<div className="fixed inset-0 z-10 overflow-y-auto" style={{userSelect: "none"}}>
				<div className="flex min-h-full items-end justify-center text-center items-center sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<Dialog.Panel className="relative transform overflow-hidden w-[640px] rounded-2xl bg-white text-left shadow-xl transition-all">
							<div>
								{props.children}
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</Dialog>
	</Transition.Root>
}