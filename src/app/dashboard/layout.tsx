import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your medical billing analytics, pending claims, and practice performance.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
