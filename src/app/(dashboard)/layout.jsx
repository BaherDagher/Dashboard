import ProtectedRoute from '@/components/guards/ProtectedRoute/ProtectedRoute';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </>
    );
}

export default DashboardLayout;
