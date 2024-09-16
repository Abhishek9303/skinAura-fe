"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RiUser3Line, RiHandbagLine, RiMenuLine } from "@remixicon/react";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    "latest",
    "products",
    "services",
    "centers",
    "reviews",
    "about",
  ];

  return (
    <div>
      {isMobile ? (
        <div className="flex flex-col">
          <div className="relative flex py-3 justify-between items-center md:px-10 px-3">
            <div className="logo cursor-pointer">
              <Link href={"/"} className="cursor-pointer">
                <img
                  src="/images/logo.png"
                  className="w-[60px] h-[35px] md:w-[80px] md:h-[50px] "
                />
              </Link>
            </div>
            <div className="navRight flex justify-center items-center gap-2">
              <Link href="/profile">
                <RiUser3Line />
              </Link>
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
          <div className="logo">
            <img src="/images/logo.png" className="sm:w-[80px] sm:h-[50px]" />
          </div>
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
            <Link href="/profile">
              <RiUser3Line />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
