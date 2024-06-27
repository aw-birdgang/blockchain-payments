'use client';

import React from 'react';
import { THEME_BUTTON } from '@/common/models/components';

interface IButton {
    text: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    color?: THEME_BUTTON;
    onClick?: Function;
    disabled?: boolean;
    marginRight?: boolean;
    width?: number;
}

export default function CButton(props: IButton) {
    const colorOption =
        props.color === THEME_BUTTON.main ? `text-white bg-gray06 hover:text-white hover:bg-gray05 border border-transparent` :
            props.color === THEME_BUTTON.white ? `bg-white text-gray90 hover:bg-gray01 border border-gray30 ` :
                props.color === THEME_BUTTON.warning ? `text-white bg-red text-gray90 hover:bg-red/50 border border-transparent ` :
                    props.color === THEME_BUTTON.disabled ? `text-red bg-gray02 text-white hover:bg-gray50/50 border border-gray01 ` :
                        `text-white bg-gray06 hover:text-white hover:bg-gray05`;


    return (
        <button
            type={props.type ?? 'button'}
            className={`items-center rounded-md px-3 py-2 text-sm font-semibold  
			${colorOption} ${props.marginRight ? 'me-4' : ''} 
			${props.className ?? ''}`}
            onClick={() => {
                if (!props.disabled && props.onClick) props.onClick();
            }}
            onSubmit={() => {
                if (props.type === 'submit' && props.onClick) props.onClick();
            }
            }
            style={{ userSelect: 'none', width: `${props.width ? `${props.width}px` : null}` }}>
            {props.text}
        </button>
    );
}