
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-6">
      <main className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Welcome to Roest Rest
        </h1>
        <p className="text-lg text-gray-600">
          Your custom workspace management and customer relations platform. Secure, fast, and structured.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          {/* Directs users to your login section layout */}
          <Button asChild size="lg">
            <Link href="/login">Sign In to Dashboard</Link>
          </Button>

          <Button variant="outline" asChild size="lg">
            <Link href="/register">Create an Account</Link>
          </Button>
        </div>
      </main>

      <footer className="absolute bottom-6 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Roest Rest. All rights reserved.
      </footer>
    </div>
  );
}

