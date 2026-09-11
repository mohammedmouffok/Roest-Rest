import VerifyEmailComponent from "@/components/auth/verifyEmail";
import { Suspense } from "react";



export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<p style={{ textAlign: 'center', marginTop: '80px' }}>Loading verification...</p>}>
            <VerifyEmailComponent />
        </Suspense>
    );
}