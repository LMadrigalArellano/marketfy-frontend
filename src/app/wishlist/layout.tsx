import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'WishList',
  description: 'WishList Page',
  keywords: ['WishList page', 'WishList products', 'WishList']
};

export default function WishlistLayout({
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