'use client';

import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

export interface IBreadcrumbs {
    name: string;
    url: string;
}

export default function CBreadcrumbs(props: {
    path: IBreadcrumbs[]
}) {
    return <nav className='flex' aria-label='Breadcrumb'>
        <ol role='list' className={`flex items-center space-x-4 text-white`}>
            <li>
                <button className={'p-4'}>
                    <a href={'/'} className='text-text hover:text-primary'>
                        <HomeIcon className='h-5 w-5 flex-shrink-0' aria-hidden='true' />
                    </a>
                </button>
            </li>
            {props.path.map((page) => (
                <li key={page.name}>
                    <button className='p-4 flex flex-row justify-end items-center'>
                        <ChevronRightIcon className='h-5 w-5 flex-shrink-0 text-text' aria-hidden='true' />
                        <a
                            href={page.url}
                            className='ml-4 text-sm font-medium text-text hover:text-primary'>
                            {page.name}
                        </a>
                    </button>
                </li>
            ))}
        </ol>
    </nav>;
}