import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'User',
  description: 'User Page',
};


export default function CatalogLayout({
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