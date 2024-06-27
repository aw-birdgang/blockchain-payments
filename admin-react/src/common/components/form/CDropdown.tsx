'use client';

import React, { Fragment, useState } from 'react';
import { Listbox, Switch, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { SIZE_DEFAULT_TEXT_FIELD_WIDTH } from '@/common/constants/values';

export interface IDropdown {
    id: string;
    name: string;
    value: any;
}

// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function CDropdown(props: {
    id?: string
    list: IDropdown[]
    value?: IDropdown
    setValue: Function
    className?: string
    label?: string
    frontLabel?: string
    width?: number
}) {
    return (<div className={'flex flex-col'}>
            {props.label && <div className={'text-sm font-medium leading-6 text-gray-900'}>{props.label}</div>}

            <div className={'flex flex-row items-center gap-x-4'}>
                {props.frontLabel ? <div className={'text-text font-semibold'}>{props.frontLabel}</div> : undefined}
                <Listbox value={props.value} onChange={(v) => props.setValue(v)}>
                    {({ open }) => (
                        <>
                            <div className={`relative`} style={{ width: `${props.width ? `${props.width}px` : `${SIZE_DEFAULT_TEXT_FIELD_WIDTH}px`}` }}>
                                <Listbox.Button
                                    className='relative w-full cursor-default rounded-md bg-white h-8 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-primary outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6'>
                                    <span className='block truncate'>{props.value ? props.value.name : '-'}</span>
                                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
              </span>
                                </Listbox.Button>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave='transition ease-in duration-100'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'>
                                    <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                                        {props.list && props.list.map((person) =>
                                                <div key={JSON.stringify(person)}>
                                                    <Listbox.Option
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'bg-primary text-white' : 'text-gray-900',
                                                                'relative cursor-default select-none py-2 pl-8 pr-4',
                                                            )
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
										                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
										                          {person.name}
										                        </span>

                                                                {selected ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-text',
                                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                                                        )}
                                                                    >
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                </div>,
                                        )}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </>
                    )}
                </Listbox>
            </div>
        </div>
    );
}