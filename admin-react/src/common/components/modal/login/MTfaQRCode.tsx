'use client'

import {Dialog, Transition} from "@headlessui/react";
import React, {Fragment} from "react";
import Image from "next/image";
import CloseSvg from "../../../assets/icons/close.svg";
import CButton from "@/common/components/form/CButton";

export default function MTfaQRCode(props: {
	show: boolean
	setShow: any
	qrCode: string
	otpImageUrl?: string
	onConfirm: any
}) {
	return (
		<Transition.Root show={props.show} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={props.setShow}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto" style={{ userSelect: "none"}}>
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
							<Dialog.Panel className="relative transform overflow-hidden w-[328px] rounded-2xl p-6 bg-white text-left shadow-xl transition-all">
								<div className={'flex flex-col w-full items-center'}>
									<div className={'flex flex-row w-full justify-between mb-1'}>
										<div className={'text-lg font-bold'}>{''}</div>
										<button className={'p-2'} onClick={() => {props.setShow(false)}}>
											<Image
												src={CloseSvg}
												alt={'close'}
												width={12} height={12}
											/>
										</button>
									</div>
									<img src={props.qrCode} width={200} height={200} alt={'123'}/>
									<CButton
										text={'Confirm'}
										onClick={() => {
											if(props.onConfirm) props.onConfirm();
										}}
									/>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}