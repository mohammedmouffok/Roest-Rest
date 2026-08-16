'use client'
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import axios from "@/lib/axios"

export default function LogoutButton() {
    const router = useRouter()
    async function onLogout() {
        try {

            await axios.post("http://localhost:5000/api/auth/logout")

            localStorage.removeItem('user')

            router.push('/login')
        } catch (err) {
            console.error('logout failed :', err)
        }
    }
    return (
        <Button onClick={onLogout}>
            SIGN OUT
        </Button>
    )
}