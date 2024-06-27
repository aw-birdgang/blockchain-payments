export enum BADGE_COLOR {
	blue, red, yellow,green,teal, purple, gray
}

export interface IBadge {
	text: string
	color: BADGE_COLOR,
	onClick?: Function,
}

export default function CBadge(props: IBadge) {
	let bgColor = `bg-blue-200`;
	let textColor = `text-blue-600`;

	if(props.color === BADGE_COLOR.blue) {
		bgColor = `bg-blue-200`;
		textColor = `text-blue-600`;
	}
	else if(props.color === BADGE_COLOR.red) {
		bgColor = `bg-rose-200`;
		textColor = `text-rose-600`;
	}
	else if(props.color === BADGE_COLOR.yellow) {
		bgColor = `bg-amber-200`;
		textColor = `text-amber-600`;
	}
	else if(props.color === BADGE_COLOR.green) {
		bgColor = `bg-green-200`;
		textColor = `text-green-600`;
	}
	else if(props.color === BADGE_COLOR.teal) {
		bgColor = `bg-teal-200`;
		textColor = `text-teal-600`;
	}
	else if(props.color === BADGE_COLOR.purple) {
		bgColor = `bg-purple-200`;
		textColor = `text-purple-600`;
	}
	else if(props.color === BADGE_COLOR.gray) {
		bgColor = `bg-gray-200`;
		textColor = `text-gray-600`;
	}
	return <button
		className={`w-auto flex flex-row justify-center items-center rounded-full text-[10px] font-bold ${bgColor} ${textColor} px-2 py-1`}
		onClick={() => {
			if(props.onClick) props.onClick();
		}}
	>
		{props.text}
	</button>
}