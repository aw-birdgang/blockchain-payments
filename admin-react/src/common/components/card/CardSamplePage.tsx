'use client';

import {useState} from "react";
import CTestBox from "@/common/components/CTestBox";
import CCardContainer from "@/common/components/card/CCardContainer";
import CCardHeading from "@/common/components/card/CCardHeading";
import CCardItemAction from "@/common/components/card/CCardItemAction";
import CCardItemButton from "@/common/components/card/CCardItemButton";
import CCardItemStack from "@/common/components/card/CCardItemStack";
import CCardItemText from "@/common/components/card/CCardItemText";
import CCardItemTextField from "@/common/components/card/CCardItemTextField";
import CCardItemTitle from "@/common/components/card/CCardItemTitle";
import CCardSaveButton from "@/common/components/card/CCardSaveButton";

export default function CardSamplePage() {
	const [textField, setTextField] = useState('');
	const [modal, setModal] = useState(false);

	return <div className={'flex flex-col p-6 mb-12'}>
		<div className={'grid grid-cols-1 gap-4'}>
			{/* CCardContainer */}
			<CTestBox title={'CCardContainer'} description={'카드 컴포넌트 영역을 만듭니다.'}>
				<CCardContainer id={'sample-card-container'}>
					<div className={'w-[200px] h-[100px]'}></div>
				</CCardContainer>
			</CTestBox>

			{/* CCardHeading */}
			<CTestBox title={'CCardHeading'} description={'카드 형태의 페이지 제목입니다. 오른쪽에 버튼을 추가할 수 있습니다.'}>
				<CCardHeading title={'Title'} description={'Description'} firstButtonText={'First'} secondButtonText={'Second'}/>
			</CTestBox>

			{/* CCardItemAction */}
			<CTestBox title={'CCardItemAction'} description={'카드 내부의 제목/내용 컴포넌트입니다. 임의의 컴포넌트를 horizontal/vertical 로 추가할 수 있습니다. '}>
				<CCardItemAction title={'Title'} description={'Description'}>
					<div className={'p-2 bg-emerald-200 text-emerald-600 rounded-md'}>extra component</div>
				</CCardItemAction>
			</CTestBox>

			{/* CCardItemButton */}
			<CTestBox title={'CCardItemButton'} description={'카드 내부의 제목/내용 컴포넌트입니다. 오른쪽에 버튼을 추가할 수 있습니다.'}>
				<CCardItemButton title={'Title'} description={'Description'}
				                 firstButtonText={'First'} secondButtonText={'Second'}/>
			</CTestBox>

			{/* CCardItemStackItem */}
			<CTestBox title={'CCardItemStackItem'} description={'제목/설명/부설명 으로 이루어진 grid 형태의 컴포넌트입니다.'}>
				<div className={'grid grid-cols-3'}>
					<CCardItemStack title={'Title1'} description={'Description1'} secondDescription={'Second description'}/>
					<CCardItemStack title={'Title2'} description={'Description2'} secondDescription={'Second description'}/>
					<CCardItemStack title={'Title3'} description={'Description3'} secondDescription={'Second description'}/>
				</div>
			</CTestBox>

			<CTestBox title={'CCardItemText'} description={'카드 내부의 제목/내용 컴포넌트입니다. 오른쪽에 버튼을 추가할 수 있습니다.'}>
				<CCardItemText title={'Title'} description={'Description'} text={'CCardItemButton'}/>
			</CTestBox>

			{/* CCardItemTextField */}
			<CTestBox title={'CCardItemTextField'} description={'카드 내부의 제목/내용 컴포넌트입니다. 오른쪽에 버튼을 추가할 수 있습니다.'}>
				<CCardItemTextField id={'c-text-component-card-textfield'} title={'Title'} description={'Description'}
					value={textField} setValue={setTextField}
				/>
			</CTestBox>

			{/* CCardItemTitle */}
			<CTestBox title={'CCardItemTitle'} description={'카드의 제목용 컴포넌트입니다. 오른쪽에 임의의 컴포넌트를 추가할 수 있습니다.'}>
				<CCardItemTitle title={'Title'} description={'Description'} action={
					<div className={'p-2 bg-emerald-200 text-emerald-600 rounded-md'}>extra component</div>
				}/>
			</CTestBox>

			{/* CCardSaveButton */}
			<CTestBox title={'CCardSaveButton'} description={'카드 하단의 버튼 그룹입니다.'}>
				<CCardSaveButton firstButtonText={'Cancel'} secondButtonText={'Save'}/>
			</CTestBox>
		</div>
	</div>
}