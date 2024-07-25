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

  const links = ["latest", "products", "services", "centers", "reviews", "about"];

  return (
    <div>
      {isMobile ? (
        <div className="relative flex py-4 justify-between items-center px-10">
          <div className="logo">
            <img src="/images/logo.png" className="sm:w-[80px] sm:h-[50px] w-[80px] h-[50px]" />
          </div>
          <div className="navRight flex justify-center items-center gap-5">
            <Link href="#">
              <RiUser3Line />
            </Link>
            <Link href="#">
              <RiHandbagLine />
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
              <RiMenuLine />
            </button>
          </div>
          {isMenuOpen && (
            <div className="absolute top-20 z-10 left-0 w-full bg-white py-5 px-8 flex flex-col items-center shadow-lg">
              {links.map((link) => {
                const lowerCaseLink = `/${link}`.toLowerCase();
                return (
                  <Link
                    key={link}
                    href={lowerCaseLink}
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
          <div className={`w-[65%] py-5 px-8 flex items-center justify-between ${isMobile && 'hidden'}`}>
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
            <Link href="#">
              <RiHandbagLine />
            </Link>
            <Link href="/signin">
              <RiUser3Line />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;
