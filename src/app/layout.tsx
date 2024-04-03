import type { Metadata } from "next";
import "./globals.css";

// import { Navbar, Sidebar } from "@/components";
// import { Providers } from "@/store/Providers";
// import { DataInitializer } from "@/components/data-initializer.tsx/DataInitializer";

export const metadata: Metadata = {
  title: "Home",
  description: "Marketfy: A simulated e-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <Providers>
          <DataInitializer/>
          <Navbar />
          <Sidebar /> */}
          {children}
        {/* </Providers> */}
      </body>
    </html>
  );
}
