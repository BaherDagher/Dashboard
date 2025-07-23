"use client";
import React, { useEffect, useState } from 'react';
import AuthStartUp from '../AuthStartup/AuthStartUp';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';

const ClientLayout = ({ children }) => {
    const { isAppReady } = useSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient || !isAppReady) {
        return <Loader />;
    }

    return (
        <>
            <AuthStartUp />
            {children}
        </>
    );
}

export default ClientLayout;
