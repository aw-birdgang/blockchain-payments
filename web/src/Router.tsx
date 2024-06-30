import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Spinner } from '@material-tailwind/react';

const Home = React.lazy(() => import('./pages/Home'));
const Information = React.lazy(() => import('./pages/Information'));
const Play = React.lazy(() => import('./pages/Play'));

const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/Signup'));
const SignupWithEmail = React.lazy(() => import('./pages/SignupWithEmail'));


const protectedRoutes = [
    { path: 'home', element: <Home /> },
    { path: 'information', element: <Information /> },
    { path: 'play', element: <Play /> },
    // { path: 'ticket', element: <Ticket /> },
    // { path: 'result', element: <Result /> },
    // { path: 'company-information', element: <CompanyInformation /> },
    // { path: 'customer-center', element: <CustomerCenter /> },
];

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/home" />, // 기본 경로를 home 으로 리디렉션
    },
    {
        path: '/',
        element: <AppLayout />,
        children: [
            ...protectedRoutes.map((route) => ({
                path: route.path,
                element: <ProtectedRoute>{route.element}</ProtectedRoute>,
            })),
            {
                path: 'auth',
                children: [
                    { path: 'sign-in', element: <SignIn /> },
                    { path: 'sign-up', element: <SignUp /> },
                    { path: 'signup-with-email', element: <SignupWithEmail /> },
                ],
            },
        ],
    },
]);

export default function Router() {
    return (
        <React.Suspense
            fallback={
                <div className="flex justify-center items-center h-screen">
                    <Spinner color="red" className="h-12 w-12" />
                </div>
            }
        >
            <RouterProvider router={router} />
        </React.Suspense>
    );
}
