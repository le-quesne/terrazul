import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children?: ReactNode }) {
    const { session } = useAuth();

    if (!session) {
        return <Navigate to="/admin/login" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
}
