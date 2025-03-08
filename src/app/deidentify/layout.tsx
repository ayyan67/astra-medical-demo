import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'De-identify Medical Records',
  description: 'Protect patient privacy by securely de-identifying medical documentation.',
};

export default function DeidentifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
