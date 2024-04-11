import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Orders',
  description: 'Orders Page',
  keywords: ['Orders page', 'Orders of products', 'Orders']
};

export default function OrdersLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen shadow-white">
      { children }
    </main>
  );
}