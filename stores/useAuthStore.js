import { create } from "zustand";
import axios from '@/lib/axios';


const useAuthStore = create((set) => {
    return {
        currentUser: null,
        isLoading: false,
        error: null,
        messages: null,
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

                set({ currentUser: res.data, isLoading: false, messages: res.message })
                return { seccess: true }


            } catch (error) {
                console.error(error);
                console.log(error.message)
                const errorMessage = error.response?.data?.message || error.message || 'register failed'
                set({ error: errorMessage, isLoading: false })
                return { seccess: false }
            }
        },
        login: async (email, password) => {
            try {
                set({ isLoading: true })
                const res = await axios.post(
                    "http://localhost:5000/api/auth/login",
                    {
                        email: email,
                        password: password
                    },
                );
                const { user } = res.data
                set({
                    currentUser: user, isLoading: false
                })

                // set user info into localStorage
                localStorage.setItem('user', JSON.stringify(user));

                //redirect to the dashboard when login seccess
                return { seccess: true };

            } catch (err) {
                console.error(err);
                const errorMessage = err.response?.data?.error || err.response?.data?.message || err.message || 'Login failed';
                set({ error: errorMessage, isLoading: false })
                return { seccess: false }
            }

        },
        logout: async () => {
            try {
                set({ isLoading: true })

                await axios.post("http://localhost:5000/api/auth/logout")

                localStorage.removeItem('user')
                set({ isLoading: false })
                return { seccess: true }

            } catch (err) {
                console.error('logout failed :', err)
                set({ error: err.message })
                return { seccess: false }
            }
        },
        requestPassword: async () => {
            try {
                set({ isLoading: true })
                const res = await axios.post('http://localhost:5000/api/auth/requestPasswordReset', {
                    email: email,
                })
                const data = await res.status
                console.log(data)
                set({ isLoading: false, messages: res.data.message })
                return { seccess: true }

            } catch (err) {
                console.error('something went wrong!', err)
                set({ error: err, isLoading: false })
                return { seccess: false }
            }

        },
        resetPassword: async (id, token, password) => {
            try {
                set({ isLoading: true, messages: null })
                // 2. Send the `id` and `token` in the backend endpoint's query string
                const res = await axios.post(`http://localhost:5000/api/auth/resetPassword?id=${id}&token=${token}`,
                    {
                        password: password,
                    }
                )
                console.log(res.data.message)
                set({ isLoading: false })
                return {
                    seccess: true, message: res.data.message
                }
            } catch (err) {
                console.error(err)
                set({ isLoading: false, error: err });
                return { seccess: false, message: err.message }
            }
        },
        verifyEmail: async (token) => {
            try {
                set({ isLoading: true })
                const res = await axios.get(`http://localhost:5000/api/auth/verifyEmail?token=${token}`);
                const data = await res.data
                console.log(data)
                set({ isLoading: false })
                return { seccess: true }
            } catch (err) {
                console.error(err)
                set({ isLoading: false, error: err })
                return { seccess: false }
            }

        },
    }
})


export default useAuthStore;