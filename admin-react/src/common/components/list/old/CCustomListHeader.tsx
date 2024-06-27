'use client'

import React from "react";

export default function CCustomListHeader(props: {
	dataList: React.ReactNode[]
	head?: boolean
	onClick?: Function
	border?: boolean
	fullBorder?: boolean
	action?: React.ReactNode
	secondAction?: React.ReactNode
	thirdAction?: React.ReactNode
	customChildren?: React.ReactNode
}) {
	return <div
		key={props.dataList.toString()}
		className={`flex flex-row 
			${props.border || props.border === undefined ? 'border-b border-gray-200' : ''} 
			${props.fullBorder ? 'px-6' : 'mx-4'} py-4 ${props.onClick ? 'cursor-pointer ' : ''}
			${props.fullBorder ? '' : 'mx-4 '} 
			${props.onClick ? 'cursor-pointer ' :  ''}
			text-xs text-gray-600 font-medium
			`}
		onClick={() => { if(props.onClick) props.onClick() }}>
		{
			props.customChildren ? props.customChildren :
			<div className={'w-full flex flex-row justify-between items-center'}>
				{props.dataList.map((data) => {
					return <div
						key={data?.toString()}
						className={`flex-1 flex flex-row justify-center items-start text-center`}
						style={{ whiteSpace: 'pre-line' }}>
						{data}
					</div>
				})}
				{props.action ?
					<div className={'flex-1  flex flex-row justify-center items-center'}>{props.action}</div> : <></>}
				{props.secondAction ?
					<div className={'flex-1  flex flex-row justify-center items-center'}>{props.secondAction}</div> : <></>}
				{props.thirdAction ?
					<div className={'flex-1  flex flex-row justify-center items-center'}>{props.thirdAction}</div> : <></>}
			</div>

		}
	</div>
}