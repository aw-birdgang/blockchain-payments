'use client'

import React from "react";
import CButton from "../form/CButton";
import {THEME_BUTTON} from "@/common/models/components";
import {useLanguageStore} from "@/common/states/locale";

export default function CCardSaveButton(props: {
	firstButtonText?: string
	firstButtonColor?: THEME_BUTTON
	onFirstButtonClicked?: Function
	secondButtonText?: string
	secondButtonColor?: THEME_BUTTON
	onSecondButtonClicked?: Function
}) {
	const lang = useLanguageStore().langSet
	return <div className={'flex flex-row gap-x-4 justify-end p-4'}>
		<CButton text={props.firstButtonText ?? lang.save} color={props.firstButtonColor} onClick={() => {
			if(props.onFirstButtonClicked) props.onFirstButtonClicked(false)
		}}/>
		{
			props.secondButtonText ?
				<CButton text={props.secondButtonText ?? lang.save} color={props.secondButtonColor} onClick={() => {
					if(props.onSecondButtonClicked) props.onSecondButtonClicked(false)
				}}/> : undefined
		}
	</div>
}