'use client'

// 텍스트, 텍스트필드 형식이 토글 가능한 텍스트필드
import CCardItemTextField, {ITextField} from "@/common/components/card/CCardItemTextField";
import CCardItemText from "@/common/components/card/CCardItemText";

export default function CCardItemToggleTextField(props: {
	editMode?: boolean
	textField: ITextField
}) {
	return <div className={''}>
		{
			props.editMode ?
				<CCardItemTextField
					{...props.textField}
				/> :
				<CCardItemText
					title={props.textField.title ?? ''}
					description={props.textField.description ?? ''}
					text={props.textField.value}
					unit={props.textField.unit}
				/>
		}
	</div>
}