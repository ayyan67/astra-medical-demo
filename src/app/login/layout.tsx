import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Log in to your Astra Medical account to access billing, claim management, and analytics.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
