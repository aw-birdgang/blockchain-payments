'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import CloseSvg from '../../assets/icons/close.svg';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MQuickSignInModal(props: {
    show: boolean
    setShow: (value: boolean) => void
    targetUrl?: string
}) {
    const router = useRouter();
    const userList = [
        { name: 'member_id', password: 'password' },
        { name: 'daniel', password: '123123' },
    ];

    async function onClick(user: {
        name: string
        password: string
    }) {
        try {
            await signIn('credentials', {
                username: user.name,
                password: user.password,
                redirect: false,
            });
            if (props.targetUrl) {
                router.push(props.targetUrl);
            } else {
                router.refresh();
            }
            alert('Successfully signed in');
            props.setShow(false);
        } catch (e) {

        }
    }

    return (
        <Transition.Root show={props.show} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={props.setShow}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 overflow-y-auto' style={{ userSelect: 'none' }}>
                    <div className='flex min-h-full items-end justify-center text-center items-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative transform overflow-hidden w-[328px] rounded-2xl p-6 bg-white text-left shadow-xl transition-all'>
                                <div className={'flex flex-col w-full items-center'}>
                                    <div className={'flex flex-row w-full justify-between mb-1'}>
                                        <div className={'text-lg font-bold'}>{''}</div>
                                        <button className={'p-2'} onClick={() => {
                                            props.setShow(false);
                                        }}>
                                            <Image
                                                src={CloseSvg}
                                                alt={'close'}
                                                width={12} height={12}
                                            />
                                        </button>
                                    </div>
                                    <div className={'flex flex-col w-full mt-4 border-t'}>
                                        {
                                            userList.map((user) => {
                                                return <div key={JSON.stringify(user)} className={'w-full px-4 py-2 flex flex-row justify-start items-center border-b'}>
                                                    <div className={'flex flex-1'}>{user.name}</div>
                                                    <button className={'flex flex-none px-2 py-2 bg-gray07 rounded-md text-white'}
                                                            onClick={() => onClick(user)}
                                                    >{'Sign In'}</button>
                                                </div>;
                                            })
                                        }
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}