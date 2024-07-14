import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
