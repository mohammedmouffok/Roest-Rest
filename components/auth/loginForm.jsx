'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );
            console.log(res.data);
            const { token, user } = res.data

            // set user info into localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            //redirect user based on role 'admin/client'
            if (user.role === 'admin') {
                window.location.href = '/admin';
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || error.message || 'login failed'
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
                </form>
            </CardContent>
            <CardFooter>

                <Button type="submit" className="w-full">Sign In</Button>
            </CardFooter>
        </Card>
    );
}