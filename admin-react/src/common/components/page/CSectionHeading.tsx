'use client'

import React from "react";

interface ICardHeadingComponent {
	title: string
}

export default function CSectionHeading(props: ICardHeadingComponent) {
	return  <div className="w-full border-b border-gray-200 pb-5">
		<h3 className="text-base font-semibold leading-6 text-gray-900">{props.title}</h3>
	</div>
}