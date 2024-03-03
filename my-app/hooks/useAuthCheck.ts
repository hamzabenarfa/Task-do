"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuthCheck = (redirectUrl = "/login") => {
    const router = useRouter();
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            router.push(redirectUrl);
        } else {
            setIsAuthChecked(true);
        }
    }, [router, redirectUrl]);

    return isAuthChecked;
};

export default useAuthCheck;
