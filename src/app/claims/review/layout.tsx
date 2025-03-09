import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ClaimsReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
