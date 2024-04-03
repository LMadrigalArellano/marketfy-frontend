import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Catalog Page',
  keywords: ['Catalog page', 'Browse products', 'catalog']
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