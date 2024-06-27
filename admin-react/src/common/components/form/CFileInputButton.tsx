'use client'

import React from "react";

interface IFileInputButton {
	className?: string
	selectedImage: any
	setSelectedImage: (image: any) => void
	imageUrl: string
	setImageUrl: (url: string) => void
	onClick?: Function
	disabled?: boolean
}

export default function CFileInputButton(props: IFileInputButton) {
	return (
		<div className={`${props.className ?? ''}`}>
			<input
				type="file"
				className={``}
				onClick={(e) => {
					if(!props.disabled && props.onClick) props.onClick(e);
				}}
				style={{ userSelect: "none"}}
			/>
		</div>
	)
}