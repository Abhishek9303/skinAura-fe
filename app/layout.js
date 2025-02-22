"use client";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "../app/components/nav/Navbar";
import Footer from "../app/components/footer/Footer";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "../components/ui/toaster";
export default function RootLayout({ children }) {
  const path = usePathname();

  const shouldShowNavAndFooter =
    path !== "/signup" &&
    path !== "/signin" &&
    path !== "/adminLogin" &&
    path !== "/resetPassword" &&
    path !== "/resetPassword/token"

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {shouldShowNavAndFooter && <Nav />}
        {children}
        {shouldShowNavAndFooter && <Footer />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Toaster />
      </body>
    </html>
  );
}
