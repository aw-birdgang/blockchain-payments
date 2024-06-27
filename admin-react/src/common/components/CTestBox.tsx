'use client'

import React from "react";

export default function CTestBox({ children, title, description }: {
	children: React.ReactNode
	title: string
	description?: string
}) {
	return <div className={'flex flex-col'}>
		<div className={'font-medium text-gray-700'}>{title}</div>
		<div className={'text-sm text-gray-500 mb-2'}>{description}</div>
		<div className={'rounded-md border border-gray-200 bg-white p-4 mb-6'}>
			{children}
		</div>
	</div>
}