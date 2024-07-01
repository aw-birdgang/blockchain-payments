import React from 'react';

export default function FourColumnGrid({ children }: React.PropsWithChildren) {
    return (
        <div className="overflow-x-auto">
            <div className="flex flex-nowrap md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-2">
                {children}
            </div>
        </div>
    );
}
