import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Claims Management',
  description: 'Submit and manage medical claims with AI-powered accuracy and efficiency.',
};

export default function ClaimsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
