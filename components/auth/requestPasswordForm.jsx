"use client"
import { useState } from "react"
import axios from "@/lib/axios"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"



export default function RequestPasswordForm() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    // send the reset request link post to the backend
    const sendRequest = async (e) => {
        e.preventDefault()
        setMessage('')
        try {
            setLoading(true)
            const res = await axios.post('http://localhost:5000/api/auth/requestPasswordReset', {
                email: email,
            })
            const data = await res.status
            console.log(data)
            if (data === 200) {
                setMessage(' reset link sent with successfull.');
            } else {
                setMessage('Something went wrong.');
            }
        } catch (err) {
            console.error('something went wrong!', err)
        } finally {
            setLoading(false)
        }


    }



    return (
        <Card className="space-y-2 w-full max-w-md mx-auto  bg-white ">
            <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                <CardDescription>Enter your email address to receive a secure link.</CardDescription>
            </CardHeader>
            <form className="space-y-2" onSubmit={sendRequest} >
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="reset-email">Email Address</Label>
                        <Input
                            id="reset-email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <p>{message}</p>
                    {/* {message.text && (
                        <p className={`text-sm p-2 rounded ${message.isError ? "bg-red-500/10 text-red-500" : "bg-green-500/10 text-green-500"}`}>
                            {message.text}
                        </p>
                    )} */}
                </CardContent>
                <CardFooter className="flex flex-col gap-4 ">
                    <Button type="submit" className="w-full bg-amber-500 dark:bg-sky-500 hover:bg-sky-600 text-white" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}