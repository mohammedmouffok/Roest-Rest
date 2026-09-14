import { create } from "zustand";

const useAuthStore = create((set) => {
    return {
        user: null,
        isLoading: false,
        error: null,
        clearError: () => set({ error: null }),
        register: async (name, email, password) => {
            set({ isLoading: true })

            try {
                const res = await axios.post(
                    "http://localhost:5000/api/auth/register",
                    {
                        name,
                        email,
                        password,
                    }
                );
                set({ user: res.data, isLoading: false })
                return { seccess: true }


            } catch (error) {
                console.error(error);
                console.log(error.message)
                const errorMessage = error.response?.data?.message || error.message || 'register failed'
                set({ error: errorMessage, isLoading: false })
                return { seccess: false }
            }
        }
    }
})


export default useAuthStore;