'use client';
import { useEffect } from 'react';

export default function Success() {
    useEffect(() => {
        // You can fetch additional session data if needed here
    }, []);

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Thank you for subscribing. Your subscription is active.</p>
        </div>
    );
}
