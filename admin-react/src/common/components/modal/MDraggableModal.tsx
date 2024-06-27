'use client';

import React, { useState } from 'react';
import Draggable, { DraggableData } from 'react-draggable';

export default function MDraggableModal(props: {
    show: boolean
    setShow: (show: boolean) => void
}) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    function handleOnDrag(data: DraggableData) {
        setPosition({ x: data.x, y: data.y }); // 드래그를 하는 동안 컴포넌트의 위치를 업데이트 해준다.
    };

    return props.show ?
        <div className={'absolute top-0 left-0 w-screen h-screen'}>
            <div
                onClick={() => {
                    props.setShow(false);
                }}
                className={'absolute top-0 left-0 w-full h-full bg-gray-500/20 blur-sm'}></div>
            <div className={'w-full h-full flex justify-center items-center'}>
                <Draggable
                    defaultPosition={{ x: 0, y: 0 }}
                    position={{ x: position.x, y: position.y }}
                    handle={'strong'}
                    onDrag={(_, data) => handleOnDrag(data)}
                >
                    <div className={'flex flex-col w-[640px] h-[480px] bg-white border cursor-auto'}>
                        {/* Title */}
                        <strong>
                            <div className={'bg-primary py-1 px-2 cursor-move text-white'}>Drag Here</div>
                        </strong>
                        {/* Contents */}
                        <div className={'w-full h-full justify-center items-center'}>
                            <button className={'border p-2'} onClick={() => {
                                props.setShow(false);
                            }}>This is Draggable
                            </button>
                        </div>
                    </div>
                </Draggable>
            </div>
        </div>
        : undefined;
}