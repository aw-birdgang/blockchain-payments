import UnderConstruction from "../../assets/icons/under_construction.png";
import Image from "next/image";
import React from "react";
import {SHOW_UNDER_CONSTRUCTION} from "@/common/constants/values";

export default function CUnderConstruction({ children } : {
	children: React.ReactNode
}) {
	const show = SHOW_UNDER_CONSTRUCTION ? true : false;
	return <div>{
		show ? <div className={'relative'}>
			<div className={'absolute backdrop-blur-sm bg-white/10 w-full h-full z-10'}></div>
			<div className={'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20'}>
				<div className={'flex flex-row justify-center items-center gap-x-4 bg-gray-300/10 border border-gray-300/50 px-6 py-4 rounded-full'}>
					<Image className={''} src={UnderConstruction} alt={'under_construction'} width={72} height={72}/>
					<div className={'text-xl font-bold'}>{"This area is currently being prepared."}</div>
				</div>
			</div>
			{children}
		</div> : <div>
			{children}
		</div>
	}</div>
}