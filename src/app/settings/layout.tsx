import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Settings',
  description: 'Manage your profile, billing settings, and account preferences.',
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
