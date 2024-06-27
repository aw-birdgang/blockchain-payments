// CRowDivider
// 한 영역을 가로로 동일한 비율로 나눠서 각자 분리된 내부 영역을 만듭니다.
// 예) [        ] => [ 1  |  2 ] , [ 1 | 2 | 3 ]
export default function CRowDivider(props: {
    firstArea: React.ReactNode
    secondArea: React.ReactNode
    thirdArea?: React.ReactNode
    className?: string
}) {
    return <div className={`w-full flex flex-wrap justify-evenly gap-x-4 ${props.className}`}>
        {props.firstArea &&
            <div className={'flex flex-row flex-1'}>
                {props.firstArea}
            </div>
        }
        {props.secondArea &&
            <div className={'flex flex-row flex-1'}>
                {props.secondArea}
            </div>
        }
        {props.thirdArea &&
            <div className={'flex flex-row flex-1'}>
                {props.thirdArea}
            </div>
        }
    </div>;
}