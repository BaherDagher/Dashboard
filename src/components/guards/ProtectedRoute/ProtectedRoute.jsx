"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';

const ProtectedRoute = ({ children }) => {
    const { user, isAppReady } = useSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();


    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isAppReady && !user) {
            router.replace("/login");
        }
    }, [isAppReady, user, router]);

    if (!isClient || !isAppReady) {
        return <Loader />;
    }

    if (!user) {
        return null;
    }

    return children;

};

export default ProtectedRoute;
