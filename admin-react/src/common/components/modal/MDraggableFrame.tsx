'use client';

import React, { useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';
import Image from 'next/image';
import CloseSvg from '@/common/assets/icons/close.svg';
import { useLanguageStore } from '@/common/states/locale';

export default function MDraggableFrame(props: {
    width?: number
    height?: number
    show: boolean
    setShow: Function
    title?: string
    onClosed?: () => void
    children: React.ReactNode
}) {
    const lang = useLanguageStore().langSet;
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const nodeRef = React.useRef(null);

    function handleOnDrag(data: DraggableData) {
        setPosition({ x: data.x, y: data.y }); // 드래그를 하는 동안 컴포넌트의 위치를 업데이트 해준다.
    };

    return props.show ?
        <div className={'fixed top-0 left-0 w-screen h-screen z-20'}>
            <div
                onClick={() => {
                    props.setShow(false);
                }}
                className={'fixed top-0 left-0 w-full h-full bg-gray-500/20 blur-sm'}></div>
            <div className={'w-full h-full flex flex col justify-start items-center z-40'}>
                <div className={'flex-none'}></div>
                <div className={'grow flex flex-col justify-center items-center'}>
                    <Draggable
                        defaultPosition={{ x: 0, y: 0 }}
                        position={{ x: position.x, y: position.y }}
                        handle={'strong'}
                        onDrag={(_, data) => handleOnDrag(data)}
                        nodeRef={nodeRef}
                    >
                        <div
                            ref={nodeRef}
                            style={{
                                width: `${props.width ? `${props.width}px` : '640px'}`,
                                height: `${props.height ? `${props.height}px` : undefined}`,
                            }}
                            className={'flex flex-col bg-white border cursor-auto'}>
                            {/* Title */}
                            <strong>
                                <div className={'flex flex-row items-center bg-gray06 py-2 px-4 cursor-move text-white'}>
                                    <div className={'flex-1'}>{props.title ?? lang.popup}</div>
                                    <div className={'bg-white rounded-sm'}>
                                        <button className={'p-2'} onClick={() => {
                                            if (props.onClosed) props.onClosed();
                                            props.setShow(false);
                                        }}>
                                            <Image
                                                src={CloseSvg}
                                                alt={'close'}
                                                width={12} height={12}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </strong>
                            {/* Contents */}
                            <div className={'w-full h-full justify-center items-center'}>
                                {props.children}
                            </div>
                        </div>
                    </Draggable>
                </div>
                <div className={'flex-none'}></div>
            </div>
        </div>
        : undefined;
}