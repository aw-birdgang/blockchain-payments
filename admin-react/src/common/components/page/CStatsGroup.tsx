'use client'

import React from "react";
import {NumberUtil} from "../../utils/NumberUtil"

// @ts-ignore
function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export interface IStats {
	title: string
	changeRate?: number
	amount: number
	unit?: string
}

export default function CStatsGroup(props: {
	dataList: IStats[]
	columnLength?: number
}) {
	return (
		<dl className={`mx-auto px-12 py-6 grid grid-cols-${props.columnLength ?? 1}`}>
			{props.dataList.map((stat) => (
				<div
					key={stat.title}
					className="flex flex-wrap items-baseline justify-between m-4 bg-white px-4 py-8 sm:px-6 xl:px-8 rounded-md shadow-lg shadow-gray-100 border border-gray-100/50"
				>
					<dt className="text-sm font-medium leading-6 text-gray-500">{stat.title}</dt>
					<dd
						className={classNames(
							stat.changeRate && stat.changeRate > 0 ? 'text-gray-700' : 'text-rose-600',
							'text-xs font-medium'
						)}
					>
						{stat.changeRate ? <div className={`${stat.changeRate > 0 ? 'text-red' : 'text-blue-500'} font-semibold`}>{`${stat.changeRate > 0 ? '+' : ''}${stat.changeRate}%`}</div> : <></>}
					</dd>
					<dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
						{`${stat.unit??''}${NumberUtil.getFloatingPointNumber(stat.amount, 0)}`}
					</dd>
				</div>
			))}
		</dl>
	)
}