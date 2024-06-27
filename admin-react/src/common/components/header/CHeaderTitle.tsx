'use client';

export interface IHeaderTitle {
    title: string;
    description?: string;
}

export default function CHeaderTitle({ title, description }: IHeaderTitle) {
    return <nav className='flex' aria-label='Breadcrumb'>
        <div className={`flex flex-row justify-start items-center space-x-6`}>
            <div className={'text-lg sm:text-2xl font-bold'}>{title}</div>
            <div className={'text-sm font-light'}>{description}</div>
        </div>
    </nav>;
}