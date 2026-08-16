'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboardView from '@/components/dashboards/adminDashboardView';
import ClientDashboardView from '@/components/dashboards/clientDashboardView';
export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // 1. Double check localStorage for profile details
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
            // Safety fallback if storage was cleared out
            router.push('/login');
            return;
        }

        setUser(JSON.parse(storedUser));
    }, [router]);

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-gray-500 animate-pulse">Loading secure workspace...</p>
            </div>
        );
    }

    // 2. Conditionally mount the correct view based on the backend role assignment
    if (user.role === 'admin') {
        return <AdminDashboardView />;
    }

    // Default view for standard customers/clients
    return <ClientDashboardView />;
}
