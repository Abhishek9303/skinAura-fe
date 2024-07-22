'use client';
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/Nav";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const path = usePathname();
  // console.log(path, 'ppppppppp');
  
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {path === '/signup' || 'signin' ? (
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
