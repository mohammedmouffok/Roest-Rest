'use client';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';

export default function RegisterForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const { isLoading, error, clearError, register } = useAuthStore()

    useEffect(() => {
        clearError()
    }, [clearError])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await register(name, email, password)
        if (res.seccess) {
            router.push('/account')
            console.log("request complete")
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
                    <Button type="submit" className="w-full">
                        {isLoading ? 'Signing up...' : 'Sign up'}
                    </Button>
                </form>
            </CardContent>

        </Card>
    );
}