import LoggedInGuard from '@/components/guards/LoggedInGuard.jsx/LoggedInGuard';
import React from 'react';

const LoggedInLayout = ({ children }) => {
    return (
        <>
            <LoggedInGuard>
                {children}
            </LoggedInGuard>
        </>
    );
}

export default LoggedInLayout;
