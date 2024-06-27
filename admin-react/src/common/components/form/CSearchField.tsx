'use client'

import React, {useState} from "react";
import CTextField from "./CTextField";
import Image from "next/image";
import SearchSvg from "../../assets/icons/search.svg";
import CalendarSvg from "../../assets/icons/calendar.svg";
import {useRouter} from "next/navigation";
import MCalendarModal from "@/common/components/modal/MCalendarModal";

export interface ISearchField {
	label?: string
	frontLabel?: string
	id: string
	type?: "text"|"email"|"password"|"number"
	placeholder?: string
	hint?: string
	width?: number
	value: string
	setValue?: Function
	onSearched?: Function
	searchUrl?: string
	maxLength?: number
	onDatePicked?: Function
	onSecondDatePicked?: Function
}

export default function CSearchField(props: ISearchField) {
	const router = useRouter();
	const [calendar, setCalendar] = useState(false);
	const [calendar2, setCalendar2] = useState(false);

	function onSubmit(e: any) {
		e.preventDefault();
		if(props.searchUrl) {
			router.push(`${props.searchUrl}${props.value}`);
			return;
		}
		if(props.onSearched) props.onSearched(props.value);
	}

	return (<div className={'flex flex-row'}>
			<MCalendarModal show={calendar} setShow={setCalendar} onYesClicked={(value: Date) => {
				if(props.onDatePicked) {
					props.onDatePicked(value);
					if(props.onSecondDatePicked) setCalendar2(true);
				}
			}}/>
			<MCalendarModal show={calendar2} setShow={setCalendar2} onYesClicked={(value: Date) => {
				if(props.onSecondDatePicked) props.onSecondDatePicked(value);
			}}/>
			<form className={''} onSubmit={(e) => {
				onSubmit(e);
			}}>
				<div className={'flex flex-row justify-start items-center'}>
					<div className={'relative'}>
						<div className={'flex flex-row gap-x-4'}>
							<CTextField
								id={props.id} value={props.value} setValue={props.setValue} width={props.width}
								singleLine={true} label={props.label} frontLabel={props.frontLabel} hint={props.hint}
								placeholder={props.placeholder}
								maxLength={props.maxLength} type={props.type}/>
						</div>
						{
							props.searchUrl || props.onSearched ?
								<div
									className={'cursor-pointer'}
									onClick={onSubmit}
								>
									<Image
										className={'absolute right-3 top-2.5'}
										src={SearchSvg}
										alt={'warning'}
										width={16} height={16}
									/>
								</div>
								: undefined
						}
					</div>
				</div>
			</form>
			{
				props.onDatePicked && <button
                    className={'ms-2 px-3 py-2 border border-gray-300 hover:border-mainLight1 rounded-md cursor-pointer'}
                    onClick={() => {
						setCalendar(true)
					}}>
                    <Image
                        className={''}
                        src={CalendarSvg}
                        alt={'warning'}
                        width={14} height={14}
                    />
                </button>
			}
		</div>
	)
}