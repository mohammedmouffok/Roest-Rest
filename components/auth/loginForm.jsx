'use client';
import { useEffect, useState } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

//this for routing module 
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { error, clearError, isLoading, login } = useAuthStore()

    useEffect(() => {
        clearError()
    }, [clearError])
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await login(email, password)

        if (res.seccess) {
            console.log("request complete")
            router.push('/dashboard');

        }

    };



    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Login to Roest Rest</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <div className="p-2 mb-4 text-sm text-red-500 bg-red-100 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded border-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <div className='flex justify-between '>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <Link href='/forgot-password'>forgot password</Link>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded border-gray-300"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        {isLoading ? "Sigining in..." : "Sign in"}
                    </Button>

                </form>
            </CardContent>
            <CardFooter>
                <span className="text-sm text-gray-500">Don't have an account?</span>
                <Button variant="outline">
                    <Link href="/register">Sign up</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}