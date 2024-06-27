'use client';

import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { SELECT_BALL_NUMBER, TOTAL_BALL_NUMBER } from '@/common/constants/values';

export interface IBall {
    num: number;
    selected: boolean;
    isBonus: boolean;
}

export function getNumberListFromBallList(ballList: IBall[]) {
    const numberList: number[] = [];
    for (let i = 0; i < SELECT_BALL_NUMBER; i++) {
        try {
            numberList.push(ballList[i].num);
        } catch (e) {
            numberList.push(0);
        }
    }
    return numberList;
}

export default function CNumberSelector(props: {
    ballListState: [IBall[], Dispatch<SetStateAction<IBall[]>>]
    selectedBallListState: [number[], Dispatch<SetStateAction<number[]>>]
    bonusBallState: [(number | undefined), Dispatch<SetStateAction<number | undefined>>]
    isBonus: boolean
}) {
    const numberList: IBall[] = [];
    for (let i = 1; i <= TOTAL_BALL_NUMBER; i++) {
        numberList.push({
            num: i,
            selected: false,
            isBonus: false,
        });
    }

    const [ballList, setBallList] = props.ballListState;
    const [selectedBallList, setSelectedBallList] = props.selectedBallListState;
    const [bonusBall, setBonusBall] = props.bonusBallState;

    return <>
        <div style={{ userSelect: 'none' }} className={'flex flex-col justify-start item-center px-6 py-6 w-full'}>
            <div className={'flex flex-wrap gap-4'}>
                {ballList.map((ball) => {
                    return <div
                        key={`number-selector-${ball.num}`}
                        className={ballList[ball.num - 1].selected ?
                            ballList[ball.num - 1].isBonus ?
                                'flex flex-row justify-center items-center text-2xl font-black w-[50px] h-[50px] rounded-full bg-yellow text-gray06 shadow-sm shadow-gray04/40' :
                                'flex flex-row justify-center items-center text-2xl font-black w-[50px] h-[50px] rounded-full bg-primary-light text-primary shadow-sm shadow-gray04/40' :
                            'flex flex-row justify-center items-center text-2xl font-bold w-[50px] h-[50px] rounded-full bg-white text-gray06 shadow-sm shadow-gray04/40'}
                        onClick={() => {
                            // 이미 선택된 공이면 취소
                            if (ballList[ball.num - 1].selected) {
                                const newBallList = [...ballList];
                                newBallList[ball.num - 1] = {
                                    num: ball.num,
                                    selected: false,
                                    isBonus: false,
                                };
                                setBallList(newBallList);

                                const newSelectedBallList = selectedBallList.filter(value => value !== ball.num).map((value) => value);
                                setSelectedBallList([...newSelectedBallList]);
                                if (ball.num === bonusBall) {
                                    setBonusBall(undefined);
                                }
                            }
                            // 선택되지 않은 공이면 선택
                            else {
                                if (selectedBallList.length >= SELECT_BALL_NUMBER && !props.isBonus) {
                                    alert(`You have already selected ${SELECT_BALL_NUMBER} balls.`);
                                    return;
                                }
                                if (selectedBallList.length >= SELECT_BALL_NUMBER && bonusBall) {
                                    alert(`You have already selected ${SELECT_BALL_NUMBER + 1} balls.`);
                                    return;
                                }
                                const isBonus = props.isBonus && selectedBallList.length >= SELECT_BALL_NUMBER && !bonusBall;
                                const newBallList = [...ballList];
                                newBallList[ball.num - 1] = {
                                    num: ball.num,
                                    selected: true,
                                    isBonus: isBonus,
                                };
                                setBallList(newBallList);

                                if (isBonus) {
                                    setBonusBall(ball.num);
                                } else {
                                    const newSelectedBallList = [...selectedBallList, ball.num];
                                    newSelectedBallList.sort((a, b) => {
                                        if (a > b) return 1;
                                        else if (a === b) return 0;
                                        else return -1;
                                    });
                                    setSelectedBallList(newSelectedBallList);
                                }
                            }
                        }}>
                        {ball.num}
                    </div>;
                })}
            </div>
        </div>
    </>;
}