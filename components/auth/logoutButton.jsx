'use client'
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import useAuthStore from "@/stores/useAuthStore"

export default function LogoutButton() {
    const router = useRouter()
    const { isLoading, logout } = useAuthStore()
    async function onLogout() {
        const res = await logout()

        if (res.seccess) {
            router.push('/login')
            console.log("all good!")
        }
    }
    return (
        <Button onClick={onLogout}>
            {isLoading ? "Signing out..." : "Sign out"}
        </Button>
    )
}