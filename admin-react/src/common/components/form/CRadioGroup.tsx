import { IDropdown } from "@/common/components/form/CDropdown";

export default function CRadioGroup(props: {
	id: string
	list: IDropdown[]
	selected: IDropdown
	setSelected: Function
	onSelected?: Function
	label?: string
	orientation?: 'horizontal' | 'vertical'
}) {
	return (
		<div>
			{props.label && <label className="text-base text-gray-900">{props.label ?? "Title"}</label>}
			<fieldset className="">
				<legend className="sr-only">Notification method</legend>
				<div className={`flex ${props.orientation === "vertical" ? 'flex-col space-y-4' : 'flex-row items-center space-x-4'}`}>
					{props.list.map((item, index) => (
						<div key={`${props.id}_${item.id}`} className="flex items-center">
							<input
								id={`${props.id}_${item.id}`}
								name={`${props.id}_${item.id}`}
								type="radio"
								value={item.name ?? ""}
								checked={props.selected.id === props.list[index].id}
								onChange={(e) => {
									if (props.onSelected) props.onSelected(item);
									props.setSelected(props.list[index]);
								}}
								className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
							/>
							<label
								htmlFor={item.id} className="pl-3 block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
								onClick={() => {
									if (props.onSelected) props.onSelected(item);
									props.setSelected(props.list[index]);
								}}
							>
								{item.name}
							</label>
						</div>
					))}
				</div>
			</fieldset>
		</div>
	);
}