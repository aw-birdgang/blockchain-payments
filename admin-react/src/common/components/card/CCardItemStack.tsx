'use client'

import React from "react";

export default function CCardItemStack(props: {
	title: string
	description: string
	secondDescription?: string
	onClick?: Function
	border?: boolean
	fullBorder?: boolean
}) {
	return <div
		key={JSON.stringify(`${props.title}_${props.description}_${props.secondDescription}`)}
		className={`flex flex-col justify-start items-start w-[232px]  
			${props.border || props.border === undefined ? 'border-b border-gray30' : ''} 
			${props.fullBorder ? 'px-6' : 'mx-6'} py-6 ${props.onClick ? 'cursor-pointer' : ''}`}
		onClick={() => { if(props.onClick) props.onClick() }}>
		<div className={'flex flex-row justify-start items-center mb-2'}>
			<div className={'text-sm text-gray90 font-semibold me-1'}>{props.title}</div>
			<div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
				<div className="h-2 w-2 rounded-full bg-current" />
			</div>
		</div>
		<div className={'flex flex-row justify-start items-start'}>
			<span className={'text-xs text-gray90 me-2'}>{`${props.description}`}</span>
			<span className={'text-xs text-gray50'}>{props.secondDescription}</span>
		</div>
	</div>
}