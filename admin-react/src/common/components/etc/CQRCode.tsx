import {toDataURL} from "qrcode";
import React from "react";

export default async function CQRCode({
	text, version, errorCorrectionLevel, size
}: {
	text: string
	version: number
	errorCorrectionLevel: 'H'|'Q'|'M'|'L'
	size?: number
}) {

	async function generateQRCode(text: string) {
		return toDataURL(text, {
			version,
			errorCorrectionLevel,
		})
	}

	const qrCode = await generateQRCode(text);
	return <div>
		<img src={qrCode} width={size} height={size} alt={'qrcode'}/>
	</div>
}