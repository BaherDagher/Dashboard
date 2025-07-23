"use client";
import Loader from '@/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const LoggedInGuard = ({ children }) => {

    const { user, isAppReady } = useSelector((state) => state.auth);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();


    useEffect(() => {
        setIsClient(true);
    }, []);


    useEffect(() => {
        if (user && isAppReady) {
            router.replace("/home");
        }
    }, [user, isAppReady, router]);

    if (!isClient || !isAppReady) {
        return <Loader />;
    }

    if (user) {
        return null;
    }

    return children;
}

export default LoggedInGuard;
