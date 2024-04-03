import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";

import { NavBar, SideBar } from "@/components";
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
        <StoreProvider>
          {/* <DataInitializer/>*/}
          <NavBar />
          <SideBar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
