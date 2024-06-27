'use client';

import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

interface IToggleButton {
    enabled: boolean;
    setEnabled: (checked: boolean) => void;
    text?: string;
}

// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function CToggleButton(props: IToggleButton) {
    return (
        <div className={'flex flex-row gap-x-4'}>
            {props.text &&
                <div className={props.enabled ? 'text-text font-semibold' : 'text-gray-300 font-semibold'}>
                    {props.text ? props.text : props.enabled ? 'Active' : 'Inactive'}
                </div>
            }
            <Switch
                checked={props.enabled}
                onChange={props.setEnabled}
                className={classNames(
                    props.enabled ? 'bg-primary' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-mainLight1 focus:ring-offset-2',
                )}
            >
			<span
                aria-hidden='true'
                className={classNames(
                    props.enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                )}
            />
            </Switch>
        </div>
    );
}