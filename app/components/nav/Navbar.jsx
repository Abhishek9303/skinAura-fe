"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RiUser3Line, RiHandbagLine, RiMenuLine } from "@remixicon/react";
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";
const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [token, setToken] = useState(null);
  const Router = useRouter();
  const handleLogOut = ()=>{
    window.localStorage.clear()
    toast.success("Log-out Succesfully");
    Router.push("/")
  }

  useEffect(() => {
    (() => {
      const token = localStorage.getItem("token");
      setToken(token);
    })();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleLogOut]);

  const links = ["products", "services", "centers", "reviews", "about"];

  return (
    <div>
      {isMobile ? (
        <div className="flex flex-col">
          <div className="relative flex py-3 justify-between items-center md:px-10 px-3">
            <div className="logo cursor-pointer">
              <Link
                href={"/"}
                onClick={() => (setIsProfileOpen(false), setIsMenuOpen(false))}
                className="cursor-pointer"
              >
                <img
                  src="/images/logo.png"
                  className="w-[60px] h-[35px] md:w-[80px] md:h-[50px]"
                />
              </Link>
            </div>
            <div className="navRight flex justify-center items-center gap-2">
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <RiUser3Line size={24} />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-auto px-3 bg-white shadow-inner rounded-lg py-2 z-10">
                    {token ? (
                      <div>
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          className="block px-4 py-2 text-sm hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => (
                            setIsProfileOpen(!isProfileOpen),
                            handleLogOut()
                          )}
                          className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Link
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          href="/signup"
                          className="block px-4 py-2 text-sm hover:bg-gray-200"
                        >
                          Signup
                        </Link>
                        <Link
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          href="/signin"
                          className="block px-4 py-2 text-sm hover:bg-gray-200"
                        >
                          Login
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Link href="/cart">
                <RiHandbagLine />
              </Link>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2"
              >
                <RiMenuLine />
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="w-full bg-white py-2 px-8 flex flex-col items-center shadow-lg">
              {links.map((link) => {
                const lowerCaseLink = `/${link}`.toLowerCase();
                return (
                  <Link
                    key={link}
                    href={lowerCaseLink}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-[15px] uppercase py-2 hover:font-bold"
                  >
                    {link}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="flex py-4 justify-between items-center px-10">
          <Link href={'/'} className="logo">
            <img src="/images/logo.png" className="sm:w-[80px] sm:h-[50px]" />
          </Link>
          <div
            className={`w-[65%] py-5 px-8 flex items-center justify-between ${
              isMobile && "hidden"
            }`}
          >
            {links.map((link) => {
              const lowerCaseLink = `${link.toLowerCase()}`;
              return (
                <Link
                  key={link}
                  href={`/${lowerCaseLink}`}
                  className="text-[15px] uppercase hover:font-bold"
                >
                  {link}
                </Link>
              );
            })}
          </div>
          <div className="navRight flex justify-center items-center gap-6">
            <Link href="/cart">
              <RiHandbagLine />
            </Link>
            {/* Desktop Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center p-2 hover:bg-gray-100 rounded-full transition"
              >
                <RiUser3Line size={24} />
              </button>
              {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-auto px-3 bg-white shadow-inner rounded-lg py-2 z-10">
                    {token ? (
                      <div>
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          className="block px-4 py-2 text-sm hover:bg-gray-200"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => (
                            setIsProfileOpen(!isProfileOpen),
                            handleLogOut()
                          )}
                          className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Link
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          href="/signup"
                          className="block px-4 py-2 text-sm hover:bg-gray-200"
                        >
                          Signup
                        </Link>
                        <Link
                          onClick={() => setIsProfileOpen(!isProfileOpen)}
                          href="/signin"
                          className="block px-4 py-2 text-sm hover:bg-gray-200"
                        >
                          Login
                        </Link>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
