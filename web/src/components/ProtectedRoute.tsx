import { PropsWithChildren } from 'react';
import { useUser } from '../features/authentication/useUser';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: PropsWithChildren) {
    const user = useUser();
    // if (!user) return <Navigate to="/auth/sign-in" replace />;

    return <>{children}</>;
}
