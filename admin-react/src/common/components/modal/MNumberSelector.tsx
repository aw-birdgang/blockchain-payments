'use client'

import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from 'react'
import CloseSvg from '../../assets/icons/close.svg';
import Image from "next/image";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import CTextField from "@/common/components/form/CTextField";
import CButton from "@/common/components/form/CButton";
import {IBall} from "@/common/components/etc/CNumberSelector";

export default function MNumberSelector(props: {
	show: boolean
	setShow: (value: boolean) => void
	bonus?: boolean
	onSelected: Function
	onClosed?: Function
}) {

	const numberList: IBall[] = [];
	for(let i=1; i<=50; i++) {
		numberList.push({
			num: i,
			selected: false,
			isBonus: false
		});
	}

	const [ballList, setBallList] = useState(numberList);
	const [selectedBallList, setSelectedBallList] = useState<number[]>([]);
	const [bonusBall, setBonusBall] = useState<number|undefined>();

	return (
		<Transition.Root show={props.show} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => {
				if(props.onClosed) props.onClosed();
				props.setShow(false);
			}}>
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
							<Dialog.Panel className="relative transform overflow-hidden w-[680px] rounded-2xl p-6 bg-white text-left shadow-xl transition-all">
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

									<div style={{ userSelect: "none"}} className={"flex flex-col justify-start item-center px-6 py-6 w-full"}>
										<div className={"flex flex-wrap gap-4"}>
											{ballList.map((ball) => {
												return <div
													key={`number-selector-${ball.num}`}
													className={ ballList[ball.num-1].selected ?
														ballList[ball.num-1].isBonus ?
															"flex flex-row justify-center items-center text-base font-black w-[32px] h-[32px] rounded-full bg-yellow text-mainLight2 shadow-sm shadow-mainLight2/40" :
															"flex flex-row justify-center items-center text-base font-black w-[32px] h-[32px] rounded-full bg-mainLight1 text-mainLight2 shadow-sm shadow-mainLight2/40" :
														"flex flex-row justify-center items-center text-base font-bold w-[32px] h-[32px] rounded-full bg-white text-mainLight2 shadow-sm shadow-mainLight2/40"}
													onClick={() => {
														// 이미 선택된 공이면 취소
														if(ballList[ball.num-1].selected) {
															const newBallList = [...ballList];
															newBallList[ball.num-1] = {
																num: ball.num,
																selected: false,
																isBonus: false,
															};
															setBallList(newBallList);

															const newSelectedBallList = selectedBallList.filter(value => value !== ball.num).map((value) => value);
															setSelectedBallList([...newSelectedBallList]);
															if(ball.num === bonusBall) {
																setBonusBall(undefined);
															}
														}
														// 선택되지 않은 공이면 선택
														else {
															if(selectedBallList.length >= 6) {
																if (props.bonus && bonusBall) {
																	alert("You have already selected 7 balls.")
																	return;
																} else {
																	alert("You have already selected 6 balls.")
																	return;
																}
															}

															const isBonus = selectedBallList.length >= 6 && props.bonus && !bonusBall;
															const newBallList = [...ballList];
															newBallList[ball.num-1] = {
																num: ball.num,
																selected: true,
																isBonus: isBonus ?? false,
															};
															setBallList(newBallList);

															if(isBonus) {
																setBonusBall(ball.num);
															}
															else {
																const newSelectedBallList = [...selectedBallList, ball.num];
																newSelectedBallList.sort((a, b) => {
																	if(a > b) return 1;
																	else if(a === b) return 0;
																	else return -1;
																});
																setSelectedBallList(newSelectedBallList);
															}
														}
													}}>
													{ball.num}
												</div>
											})}
										</div>
									</div>

									<CButton text={'Save'} onClick={() => {
										if(props.onSelected) {
											const returnBallList = [...selectedBallList];
											if(bonusBall) returnBallList.push(bonusBall);
											props.onSelected(returnBallList)
											props.setShow(false);
										}
									}}/>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}