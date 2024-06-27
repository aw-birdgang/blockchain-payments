'use client'

import {Dialog, Transition} from "@headlessui/react";
import { Fragment } from 'react'
import WarnSvg from '../../assets/icons/warn.svg';
import CloseSvg from '../../assets/icons/close.svg';
import Image from "next/image";
import CButton from "@/common/components/form/CButton";
import {THEME_BUTTON} from "@/common/models/components";
import MDraggableFrame from "@/common/components/modal/MDraggableFrame";

export default function MBasicModal(props: {
	title?: string
	show: boolean
	setShow: (value: boolean) => void
	onYesClicked: Function
	onNoClicked?: Function
}) {
	return (
		<MDraggableFrame show={props.show} setShow={props.setShow}>
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
				<Image
					className={'mb-2'}
					src={WarnSvg}
					alt={'warning'}
					width={40} height={40}
				/>
				<div className={'text-center text-2xl text-gray90 font-bold mb-8'}>Verification</div>
				<div className={'text-center mb-8'} style={{ whiteSpace: 'pre-line'}}>{`${props.title ?? 'Are you changing\nthe status of the lottery?'}`}</div>
				<div className={'flex w-full h-[48px] gap-x-4'}>
					<CButton className={'flex flex-1 flex-row justify-center text-center'} text={"No"} onClick={props.onNoClicked} color={THEME_BUTTON.white}/>
					<CButton className={'flex flex-1 flex-row justify-center text-center'} text={"Yes"} onClick={props.onYesClicked}/>
				</div>
			</div>
		</MDraggableFrame>
	)
}