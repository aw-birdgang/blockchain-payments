'use client'

import React, {useState} from "react";
import CTextField from "./CTextField";
import Image from "next/image";
import WindowSvg from "../../assets/icons/window.svg";
import MPlayerSearchModal from "@/common/components/modal/search/MPlayerSearchModal";
import {SIZE_DEFAULT_TEXT_FIELD_WIDTH} from "@/common/constants/values";
import {ISearchField} from "@/common/components/form/CSearchField";

export interface ISearchPlayerField extends ISearchField {
	onOpened?: Function
	onPlayerSelected?: Function
	onClosed?: Function
}

export default function CSearchPlayerField(props: ISearchPlayerField) {
	const [showModal, setShowModal] = useState(false);

	function onSubmit(e: any) {
		e.preventDefault();
		if(props.onOpened) props.onOpened();
		setShowModal(true);
	}

	return (<div className={'flex flex-row'}>
			<MPlayerSearchModal
				show={showModal}
				setShow={setShowModal}
				onPlayerSelected={props.onPlayerSelected}
				onClosed={props.onClosed}
			/>
			<form className={''} onSubmit={(e) => {
				onSubmit(e);
			}}>
				<div className={'flex flex-row justify-start items-center'}>
					<div className={'relative'}>
						<div className={''}>
							<CTextField
								id={props.id} value={props.value} setValue={props.setValue} width={props.width ?? SIZE_DEFAULT_TEXT_FIELD_WIDTH}
								singleLine={true} label={props.label} hint={props.hint}
								placeholder={props.placeholder}
								maxLength={props.maxLength} type={props.type} disabled={true}/>
						</div>
						<div
							className={'cursor-pointer'}
							onClick={onSubmit}>
							<Image
								className={'absolute right-3 top-2.5'}
								src={WindowSvg}
								alt={'warning'}
								width={16} height={16}
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}