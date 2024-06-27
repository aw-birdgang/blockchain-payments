export default function CPageDivider({ first, second, third }: {
	first: React.ReactNode
	second?: React.ReactNode
	third?: React.ReactNode
}) {
	return <div className={'flex flex-wrap xl:flex-row gap-x-4'}>
		{ first ? <div className={'w-full xl:flex-1'}>{first}</div> : undefined}
		{ second ? <div className={'w-full xl:flex-1'}>{second}</div> : undefined}
		{ third ? <div className={'w-full xl:flex-1'}>{third}</div> : undefined}
	</div>
}