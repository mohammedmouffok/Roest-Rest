"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import useAuthStore from '@/stores/useAuthStore';
import { Card, CardContent, CardHeader, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { resetPassword, error, clearError, isLoading } = useAuthStore()
    const [query, setQuery] = useState({
        id: null,
        token: null
    })
    const router = useRouter()

    // 1. Extract `id` and `token` from the frontend URL parameters **the query**

    useEffect(() => {

        const id = searchParams.get('id');
        const token = searchParams.get('token');
        setQuery({
            id: id,
            token: token
        })
        console.log({ id, token })
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await resetPassword(query.id, query.token, password)
        if (res.seccess) {

            router.push('/login')
        }


    };

    return (
        <Card className="space-y-2 w-full max-w-md mx-auto  bg-white ">
            <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                <CardDescription>Enter your email address to receive a secure link.</CardDescription>
            </CardHeader>
            <form className="space-y-2" onSubmit={handleSubmit} >
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reset-email">New Password</Label>
                        <Input
                            id="new-password"
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {/* <p>{message}</p> */}
                    {message.text && (
                        <p className={`text-sm p-2 rounded ${message.isError ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
                            {message.text}
                        </p>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-4 ">
                    <Button type="submit" className="w-full bg-amber-500 dark:bg-sky-500 hover:bg-sky-600 text-white" disabled={isLoading}>
                        {isLoading ? "Reseting..." : "Reset Password"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}