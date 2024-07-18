import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer/Footer";
import Nav from "./components/nav/nav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
      <Nav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
