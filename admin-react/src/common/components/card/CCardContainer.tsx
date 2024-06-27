'use client'

import React from "react";
import Loading from '../../assets/icons/loading.svg';
import Image from "next/image";
import CCardSaveButton from "@/common/components/card/CCardSaveButton";
import {THEME_BUTTON} from "@/common/models/components";

interface ICardContainer {
	id?: string
	children: React.ReactNode
	className?: string
	editMode?: boolean
	saveButton?: boolean
	onSaveButtonClicked?: Function
	onCancelButtonClicked?: Function
	loading?: boolean
	setLoading?: Function
	round?: boolean
}

export default function CCardContainer(props: ICardContainer) {
	return <div
		className={`w-full relative transition-all duration-500 ease-out mb-6 ${props.className ?? ''}`}>
		<div className={`absolute w-[36px] h-[36px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 duration-300 ease-out rounded-md ${props.loading ? 'z-20 ' : '-z-10 '}`}>
			<Image className={'animate-spin'} src={Loading} alt={'loading'} width={36} height={36}/>
		</div>
		<div className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ease-out rounded-md ${props.loading ? 'bg-black/5 backdrop-blur-sm z-10' : '-z-10 '}`}></div>
		<div
			id={`container_${props.id}`}
			className={`w-full bg-white transition-all duration-500 ease-out border ${props.round === undefined || props.round === true ? 'rounded-md ' : '' } ${props.editMode ? 'border-mainLight1' : 'border-gray30'}`}>
			{props.children}
			{ props.editMode && props.saveButton !== false ?
				<CCardSaveButton
					firstButtonText={'Cancel'}
					firstButtonColor={THEME_BUTTON.white}
					onFirstButtonClicked={async () => {
						if(props.onCancelButtonClicked) {
							await props.onCancelButtonClicked();
						}
					}}
					secondButtonText={'Save'}
					secondButtonColor={THEME_BUTTON.main}
					onSecondButtonClicked={async () => {
						if(props.onSaveButtonClicked) {
							if(props.setLoading) props.setLoading(true);
							await props.onSaveButtonClicked();
							if(props.setLoading) props.setLoading(false);
						}
					}}
				/>
				 :
				<></>
			}
		</div>
	</div>
}