import UnderConstruction from "../../assets/icons/under_construction.png";
import Image from "next/image";
import React from "react";
import {SHOW_UNDER_CONSTRUCTION} from "@/common/constants/values";

/**
 * 현재 디버깅 중이거나 개발 중인 메뉴인 경우 공사중 아이콘으로 표시하는 컴포넌트
 * @param size 아이콘 사이즈
 * @constructor
 */
export default function CUnderConstructionIcon({ size }: {
	size?: number
}) {
	const show = SHOW_UNDER_CONSTRUCTION;
	return <div>{
		show ? 	<div className={'relative'}>
			<Image className={''} src={UnderConstruction} alt={'under_construction'} width={size ?? 24} height={size ?? 24}/>
		</div> : undefined
	}</div>
}