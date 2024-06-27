export default function CCheckboxListItem(props: {
	checked: boolean
	setChecked: Function
	text: string
}) {
	return <div className={'flex flex-row gap-x-4'}>
		<input type="checkbox" checked={props.checked} onClick={() => {
			if(props.setChecked) props.setChecked(!props.checked);
		}}/>
		<div>{props.text}</div>
	</div>
}