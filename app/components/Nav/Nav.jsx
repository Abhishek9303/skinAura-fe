import Link from "next/link";
import React from "react";
import { RiUser3Line, RiHandbagLine } from "@remixicon/react";

const Nav = () => {
  return (
    <div className="flex py-4 justify-between items-center  px-10">
      <div className="logo">
        <img src="/images/logo.png" className="w-[80px] h-[50px]" />
      </div>
      <div className="w-[65%] py-5 px-8 flex items-center justify-between">
        {["Latest", "Products", "Services", "Centers", "Reviews", "About"].map(
          (link) => (
            <Link
              key={link}
              href={`/${link}`}
              className="text-[15px] uppercase"
            >
              {link}
            </Link>
          )
        )}
      </div>
      <div className="navRight flex justify-center items-center gap-6">
        <Link href={'#'}>
        <RiUser3Line />
        </Link>
        <Link href={'#'}>
        <RiHandbagLine />
        </Link>
      </div>
    </div>
  );
};

export default Nav;
