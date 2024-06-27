'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

export interface IPageNavigationComponent {
    currentPage: string;
    setCurrentPage: Function;
    totalPage: number;
    currentCount: number;
    totalCount: number;
    listSize: number;
    url: string;
}

export default function CListPageNavigation(props: IPageNavigationComponent) {
    const router = useRouter();

    function onSubmit(e: any) {
        e.preventDefault();
        const value = parseInt(props.currentPage);
        if (!isNaN(value) && value > 0 && value <= props.totalPage) {
            props.setCurrentPage(value);
            router.push(`${props.url}?page=${value}`);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-row items-center justify-center mb-6'>
                <div className='flex flex-row items-center gap-x-4'>
                    <div
                        className={'flex flex-row justify-center items-center w-8 h-8 bg-mainLight1/30 rounded-full cursor-pointer'}
                        onClick={() => {
                            const value = parseInt(props.currentPage) - 1;
                            if (!isNaN(value) && value > 0 && value <= props.totalPage) {
                                props.setCurrentPage(value);
                                router.push(`${props.url}?page=${value}`);
                            }
                        }}>
                        <ChevronLeftIcon className='h-5 w-5 text-text' aria-hidden='true' />
                    </div>
                    <div className={'flex flex-row items-center text-text font-semibold gap-x-4'}>
                        <input
                            className={'flex flex-row w-16 border border-mainLight/30 rounded-md px-2 py-2 justify-center'}
                            value={props.currentPage}
                            onChange={(e) => {
                                e.preventDefault();
                                props.setCurrentPage(e.target.value);
                            }}
                        />
                        <div>/</div>
                        <div className={'text-text'}>{props.totalPage}</div>
                    </div>
                    <div
                        className={'flex flex-row justify-center items-center w-8 h-8 bg-mainLight1/30 rounded-full cursor-pointer'}
                        onClick={() => {
                            const value = parseInt(props.currentPage) + 1;
                            if (!isNaN(value) && value > 0 && value <= props.totalPage) {
                                props.setCurrentPage(value);
                                router.push(`${props.url}?page=${value}`);
                            }
                        }}>
                        <ChevronRightIcon className='h-5 w-5 text-text' aria-hidden='true' />
                    </div>
                </div>
            </div>
        </form>
    );
}
