import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Admin Sign In | RedOps Security',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return (
    <main className="auth-page">
      <SignIn
        fallbackRedirectUrl="/admin"
        appearance={{
          elements: {
            rootBox: 'auth-clerk-root',
            cardBox: 'auth-clerk-card',
            footer: 'hidden',
          },
        }}
      />
    </main>
  );
}
