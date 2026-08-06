'use client';
import axios from 'axios';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name: name,
                    email: email,
                    password: password
                }
            );
            console.log(res)
            console.log('account created please log in')
            window.location.href = '/login'
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
                <CardTitle className="text-2xl text-center">register to Roest Rest</CardTitle>
            </CardHeader>
            <CardContent>
                {error && <div className="p-2 mb-4 text-sm text-red-500 bg-red-100 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded border-gray-300"
                            required
                        />
                    </div>
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
                    <Button type="submit" className="w-full">Sign up</Button>
                </form>
            </CardContent>

        </Card>
    );
}