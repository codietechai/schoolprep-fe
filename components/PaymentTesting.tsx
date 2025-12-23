'use client';
import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { backendClient } from "@/client/backendClient";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const PaymentTesting = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);

        const res = await backendClient.post('/user/payment/create-checkout-session', { priceId: 'price_1QcicDLNkUe4WZRGl0WrDthI' });

        const session = res?.data?.data;

        // Redirect to Stripe Checkout page
        const stripe: any = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        setIsLoading(false);
    };

    return (
        <>
            <div>
                <h1>Stripe Recurring Payment Text</h1>
                <button onClick={handleCheckout} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Subscribe Now'}
                </button>
            </div>
        </>
    );
};

export default PaymentTesting;
