'use client';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // console.log('all good')
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email: email,
                    password: password
                }
            );
            // console.log("hoi")
            console.log(res);
            const { token, user } = res.data

            // set user info into localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            //redirect user based on role 'admin/client'
            if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/client');
            }
        } catch (err) {
            console.error(err);
            const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Login failed';
            setError(errorMessage)
        } finally {
            console.log("Request completed");
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
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border rounded border-gray-300"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full">Sign In</Button>

                </form>
            </CardContent>
            <CardFooter>
                <span className="text-sm text-gray-500">Don't have an account?</span>
                <Button variant="outline">
                    <Link href="/register">Register</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}