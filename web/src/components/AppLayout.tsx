import { Outlet } from 'react-router-dom';
import { PropsWithChildren } from 'react';

function AppLayout({ children }: PropsWithChildren) {

    return (
        <div>
            <hr className="border-gray-400" />

            <main className="text-gray-600 bg-gray-100">
                <div className="max-w-screen-2xl mx-auto p-4">
                    {children}
                    <Outlet />
                </div>
            </main>
            <div className="bg-gray-200">
            </div>
        </div>
    );
}

export default AppLayout;
