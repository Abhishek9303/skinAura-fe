import React from 'react'
import Link from 'next/link';
import { RiFacebookBoxLine, RiInstagramLine, RiMailLine, RiPhoneLine, RiYoutubeLine } from '@remixicon/react';

const Footer = () => {
  return (
    <>
      <div className=" bg-[#FAF7F7] lg:flex flex-row justify-center lg:justify-around items-center py-10 ">
        <div className="flex items-center justify-around">
          <img
            className="lg:w-[10vw] w-[20vw]"
            src="./images/logo.png"
            alt="logo"
          />
          <div className="lg:hidden flex flex-col justify-center items-center  ">
            <ul className="flex gap-5">
              <li>
                <Link href={"#"}>
                  <RiYoutubeLine />
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <RiInstagramLine />
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <RiFacebookBoxLine />
                </Link>
              </li>
            </ul>
            <h3 className="flex gap-2">
              <RiPhoneLine />
              +91 123-456-4561
            </h3>
          </div>
        </div>
        <div className="lg:block flex items-center justify-center py-5">
          <ul className="grid grid-cols-3 gap-5">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about-us">About</Link>
            </li>
            <li>
              <Link href="#">Instagram</Link>
            </li>

            <li>
              <Link href="#">Centers</Link>
            </li>
            <li>
              <Link href="#">Reviews</Link>
            </li>
            <li>
              <Link href="#">Facebook</Link>
            </li>

            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="#">Youtube</Link>
            </li>
          </ul>
        </div>
        <div className="lg:block hidden">
          <h3>Contact Us</h3>
          <h3>+91 123-456-4561</h3>
          <h3 className="flex gap-2">
            <RiMailLine />
            skinaura@gmail.com
          </h3>
        </div>
          <h2 className='text-center py-2 lg:hidden'>@ 2024 copyright All Right Reserved</h2>
      </div>
      <div className="py-2 bg-black text-center text-white">
        <h3>#India’s Top Trusted Brand</h3>
      </div>
    </>
  );
}

export default Footer