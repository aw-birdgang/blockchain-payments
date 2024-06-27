'use client';

export default function CSelectedNumber(props: {
    ballList: number[]
    bonus?: number
}) {
    return <>
        <div className={'flex flex-row justify-start item-center'}>
            <div className={'flex flex-row justify-start'}>
                {props.ballList.map((ball) => {
                    return <div
                        key={`selected-number-${ball}`}
                        className={'flex flex-row justify-center items-center text-2xl font-bold w-[50px] h-[50px] mr-2 rounded-full bg-primary-light text-primary'}>
                        {ball}
                    </div>;
                })}
            </div>
            {props.bonus ?
                <div className={'flex flex-row items-center'}>
                    <div className={'text-3xl font-bold text-yellow mr-2'}>{`+`}</div>
                    <div
                        className={'flex flex-row justify-center items-center text-2xl font-bold w-[50px] h-[50px] rounded-full bg-yellow text-text'}>
                        {props.bonus}
                    </div>
                </div>
                :
                undefined}
        </div>
    </>;
}