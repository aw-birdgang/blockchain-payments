export default function CClickableText(props: {
    text: string
    onClick: Function
}) {
    return <div
        className={'underline text-text hover:text-blue-700 cursor-pointer break-all'}
        onClick={() => props.onClick()}
    >
        {props.text}
    </div>;
}