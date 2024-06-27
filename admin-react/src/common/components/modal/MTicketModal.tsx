'use client'

import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from 'react'
import CloseSvg from '../../assets/icons/close.svg';
import Image from "next/image";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import CTextField from "@/common/components/form/CTextField";
import CButton from "@/common/components/form/CButton";
import MDraggableFrame from "@/common/components/modal/MDraggableFrame";
import {useLanguageStore} from "@/common/states/locale";
import CNumberList from "@/common/components/etc/CNumberList";

export default function MTicketModal(props: {
	title?: string
	show: boolean
	setShow: (value: boolean) => void
	onYesClicked: Function
	onNoClicked?: Function
}) {
	const lang = useLanguageStore().langSet;
	return (
		<MDraggableFrame title={'Ticket Popup'} show={props.show} setShow={props.setShow}>
			<div className={'flex flex-col w-full items-center py-10'}>
				<div className={'border rounded-xl px-10 py-8'}>
					<div className={'text-lg font-semibold mb-6'}>Ticket No. ####-####-####</div>
					<div className={'flex flex-col gap-y-4'}>
						{/* Draw */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.draw}:</div>
							<div>3</div>
						</div>
						{/* Player */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.player}:</div>
							<div>abcd@xxxx.com</div>
						</div>
						{/* Seller */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.seller}:</div>
							<div>Jack123@xxx.com</div>
						</div>
						{/* Agent */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.agent}:</div>
							<div>m1234@xxx.com</div>
						</div>
						{/* Winning Number */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.winning_numbers}:</div>
							<CNumberList customKey={'ticket_popup_winning_number'} list={[1,2,3,4,5,6]} bonus={40}/>
						</div>
						{/* Issued Number */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.issued_numbers}:</div>
							<CNumberList customKey={'ticket_popup_issued_number'} list={[2,4,6,8,10,12]}/>
						</div>
						{/* Issued Numbers */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.issue_date}:</div>
							<div>2023-02-21 15:32:15</div>
						</div>
						{/* Winning Rank */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.winning_rank}:</div>
							<div>1st</div>
						</div>
						{/* Claim Date */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.claim_date}:</div>
							<div>2023-02-21 15:32:15</div>
						</div>
						{/* Receipt No. */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.receipt_number}:</div>
							<div>1357</div>
						</div>
						{/* Claim Date */}
						<div className={'flex flex-row items-center'}>
							<div className={'w-[160px]'}>{lang.buy_date}:</div>
							<div>2023-02-21 15:32:15</div>
						</div>
					</div>
				</div>
			</div>
		</MDraggableFrame>
	)
}