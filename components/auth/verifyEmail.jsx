'use client';
import useAuthStore from '@/stores/useAuthStore';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailComponent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { verifyEmail, error, isLoading, clearError } = useAuthStore()
    console.log(token)
    // const router = useRouter()

    const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
    const [message, setMessage] = useState('Verifying your email address...');


    useEffect(() => {
        clearError()
        if (!token) {
            setStatus('error');
            setMessage('Missing verification token.');
            return;
        }

        const verifyToken = async () => {
            const res = await verifyEmail(token)
            if (res.seccess) {
                setStatus('success');
                setMessage('Email verified successfully!');
            } else {
                setStatus('error');
                setMessage(error || 'Verification failed.');
            }

        };
        // console.log(status)
        verifyToken();

    }, [token, clearError]);

    return (
        <div style={{ maxWidth: '400px', margin: '80px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2>Account Verification</h2>
            <p style={{ margin: '20px 0', color: status === 'error' ? 'red' : 'green' }}>{message}</p>

            {status === 'success' && (
                <Link href="/login" style={{ padding: '10px 20px', background: '#0070f3', color: '#fff', borderRadius: '5px', textDecoration: 'none' }}>
                    Log In Now
                </Link>
            )}

            {status === 'error' && (
                <Link href="/login" style={{ color: '#0070f3', textDecoration: 'underline' }}>
                    Back to Login
                </Link>
            )}
        </div>
    );
}

