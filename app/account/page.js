import useAuthStore from "@/stores/useAuthStore"

export default function account() {
    const { messages } = useAuthStore()
    return (
        <div>
            <h1>
                {messages}
            </h1>
        </div>
    )
}