'use client';
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const path = usePathname();
  
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {path === '/signup' || path === '/signin' ? (
          <>
            {children}
          </>
        ) : (
          <>
            <Nav />
            {children}
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
