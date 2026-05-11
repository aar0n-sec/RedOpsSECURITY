import { SignUp } from '@clerk/nextjs';

export const metadata = {
  title: 'Admin Sign Up | RedOps Security',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return (
    <main className="auth-page">
      <SignUp
        fallbackRedirectUrl="/admin"
        appearance={{
          elements: {
            rootBox: 'auth-clerk-root',
            cardBox: 'auth-clerk-card',
          },
        }}
      />
    </main>
  );
}
