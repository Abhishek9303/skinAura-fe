'use client';
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "../app/components/nav/Navbar";
import Footer from "../app/components/footer/Footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const path = usePathname();
  
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {path === '/signup' || path === '/signin' || path === '/cart' ? (
         <>
         {
          path !== '/cart' ? (
            <>
            {children}
          </>
          ) : (
            <>
            <Nav />
            {children}
          </>
          )
        }
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
