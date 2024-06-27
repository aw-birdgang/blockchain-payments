'use client';

import {useEffect} from "react";

export default function CBasicPagePopAlert({alertMessage}: {
	alertMessage?: string
}) {
	useEffect(() => {
		if(alertMessage) {
			alert(alertMessage)
		}
	}, [])

	return <div></div>;
}