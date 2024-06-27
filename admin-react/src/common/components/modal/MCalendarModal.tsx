'use client'

import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from 'react'
import CloseSvg from '../../assets/icons/close.svg';
import Image from "next/image";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import CTextField from "@/common/components/form/CTextField";
import CButton from "@/common/components/form/CButton";

export default function MCalendarModal(props: {
	title?: string
	show: boolean
	setShow: (value: boolean) => void
	onYesClicked: Function
	onNoClicked?: Function
}) {
	const [selected, setSelected] = useState(new Date());
	const [hour, setHour] = useState('0');
	const [hourValid, setHourValid] = useState(true);
	const [minute, setMinute] = useState('0');
	const [minuteValid, setMinuteValid] = useState(true);
	const [second, setSecond] = useState('0');
	const [secondValid, setSecondValid] = useState(true);

	async function onSubmit() {
		if(!hourValid || !minuteValid || !secondValid) return;
		const intHour = parseInt(hour);
		const intMinute = parseInt(minute);
		const intSecond = parseInt(second);
		const selectedHour = selected.getHours();
		const selectedMinute = selected.getMinutes();
		const selectedSecond = selected.getSeconds();

		selected.setHours(selectedHour + intHour);
		selected.setMinutes(selectedMinute + intMinute);
		selected.setSeconds(selectedSecond + intSecond);

		if(props.onYesClicked) props.onYesClicked(selected);
		if(props.setShow) props.setShow(false);
	}
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
							<Dialog.Panel className="relative transform overflow-hidden w-[400px] rounded-2xl p-6 bg-white text-left shadow-xl transition-all">
								<div className={'flex flex-col w-full items-center'}>
									<div className={'flex flex-row w-full justify-between mb-6'}>
										<div className={'text-lg font-bold'}>{'Choose a date'}</div>
										<button className={'p-2'} onClick={() => {props.setShow(false)}}>
											<Image
												src={CloseSvg}
												alt={'close'}
												width={12} height={12}
											/>
										</button>
									</div>
									{/*	*/}
									<Calendar
										value={selected} locale="en-EN"
										onChange={(value: any, event: any) => {
											setSelected(value)
										}}
									/>

									{/*	*/}
									<div className={'w-full mt-4'}>
										<div className={'w-full flex flex-row justify-evenly items-start'}>
											<CTextField
												id={'modal_calendar_hour'}
												value={hour}
												setValue={setHour}
												type={'number'}
												maxLength={2}
												placeholder={'HH'}
												singleLine={true} width={60} label={'Hour'}
												validCheck={(value: string) => {
													const intHour = parseInt(value);
													const valid = !(intHour >= 24 || intHour < 0);
													setHourValid(valid);
													return valid;
												}}
												invalidMessage={'Invalid'}
											/>
											<div className={'mt-7'}>:</div>
											<CTextField
												id={'modal_calendar_minute'}
												value={minute}
												setValue={setMinute}
												type={'number'}
												maxLength={2}
												placeholder={'MM'}
												singleLine={true} width={60} label={'Minute'}
												validCheck={(value: string) => {
													const intMinute = parseInt(value);
													const valid = !(intMinute >= 60 || intMinute < 0);
													setMinuteValid(valid);
													return valid;
												}}
												invalidMessage={'Invalid'}
											/>
											<div className={'mt-7'}>:</div>
											<CTextField
												id={'modal_calendar_second'}
												value={second}
												setValue={setSecond}
												type={'number'}
												singleLine={true} width={60} label={'Second'}
												maxLength={2}
												placeholder={'SS'}
												validCheck={(value: string) => {
													const intSecond = parseInt(value);
													const valid = !(intSecond >= 60 || intSecond < 0);
													setSecondValid(valid);
													return valid;
												}}
												invalidMessage={'Invalid'}
											/>
										</div>
										<div className={'w-full flex flex-row justify-center mt-4'}>
											<CButton text={'Submit'} width={200} onClick={() => {
												onSubmit();
											}}/>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}