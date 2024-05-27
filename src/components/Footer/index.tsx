import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../public/assets/Logo.png";
import { SITE_DATA } from "../Field";
export default function Footer() {
  return (
    <>
      <footer className=" bg-[#FFF] ">
        <div className=" mx-auto px-3 py-5 lg:py-[50px] max-w-screen-lg ">
          <div className="flex max-[1023px]:flex-col flex-wrap md:text-left order-first">
            <div className="footerlinks text-center md:text-left min-[1024px]:w-[100%] lg:gap-5 w-full realtive flex max-[767px]:flex-col justify-between">
              <div className="footerlink_inners">
                <div className="max-[767px]:flex max-[767px]:justify-center max-[767px]:pb-5">
                  <Link href="/">
                    <Image className="w-[230px]" src={Logo} alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="footerlink_inners">
                <h2 className="md:text-[20px]  text-base font-bold text-[#000]">Explorers</h2>
                <nav className="list-none my-4 text-sm font-normal text-[#505050]">
                  <li className="text-sm font-normal font-semibold text-[#505050]">
                    <Link className="" href={"/bitcoin"}>
                      Bitcoin
                    </Link>
                  </li>
                  <li className="text-sm font-normal font-semibold text-[#505050] my-2">
                    <Link className="" href={"/ethereum"}>
                      Ethereum
                    </Link>
                  </li>
                </nav>
              </div>
              <div className="footerlink_inners">
                <h2 className="md:text-[20px] text-base font-bold text-[#000]">Social</h2>
                <nav className="list-none my-4 text-sm font-normal text-[#505050]">
                  <li className="text-sm font-normal font-semibold text-[#505050]">
                    <Link className="" href={SITE_DATA.github}>
                      GitHub
                    </Link>
                  </li>
                  <li className="text-sm font-normal font-semibold text-[#505050] my-2">
                    <Link className="" href={SITE_DATA.linkedin}>
                      LinkedIn
                    </Link>
                  </li>
                  <li className="text-sm font-normal font-semibold text-[#505050] my-2">
                    <Link className="" href={SITE_DATA.telegram}>
                      Telegram
                    </Link>
                  </li>
                  <li className="text-sm font-normal font-semibold text-[#505050] my-2">
                    <Link className="" href={SITE_DATA.twitter}>
                      Twitter
                    </Link>
                  </li>
                </nav>
              </div>
              <div className="footerlink_inners">
                <h2 className="md:text-[20px] text-base font-bold text-[#000]">
                  Useful Links
                </h2>
                <nav className="list-none my-4 text-sm font-normal text-[#505050]">
                  <li className="text-sm font-normal font-semibold text-[#505050]">
                    <Link className="" href={"/faq"}>
                      FAQ
                    </Link>
                  </li>
                  <li className="text-sm font-normal font-semibold text-[#505050] my-2">
                    <Link className="" href={"/privacy-policy"}>
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="text-sm font-normal font-semibold text-[#505050] my-2">
                    <Link className="" href={"/contact-us"}>
                      Contact Us
                    </Link>
                  </li>
                </nav>
              </div>
              {/* <div className="footerlink_inners">
                <h2 className="md:text-[20px] text-base font-bold text-[#000]">Language</h2>
                <nav className="list-none my-4 text-sm font-normal text-[#505050]">
                  <li className="text-sm font-normal font-semibold text-[#505050]">
                    <Link className="" href={""}>
                      English
                    </Link>
                  </li>
                  <li className="text-sm font-normal font-semibold text-[#505050] my-2">
                    <Link className="" href={""}>
                      Chinese
                    </Link>
                  </li>
                  <li className="text-sm font-normal font-semibold text-[#505050] my-2">
                    <Link className="" href={""}>
                      Japanese
                    </Link>
                  </li>{" "}
                  <li className="text-sm font-normal font-semibold text-[#505050] my-2">
                    <Link className="" href={""}>
                      Español
                    </Link>
                  </li>
                </nav>
              </div> */}
              {/* <div className="footerlink_inners">
                <h2 className="md:text-[20px] text-base font-bold text-[#000]">Subscribe</h2>
                <div className="list-none my-4 text-sm font-normal text-[#505050]">
                  <div className="border-[#DE689A] border-[1px] h-[35px] px-3 py-2 rounded-[5px]  w-full">
                    <input
                      type="text"
                      className="bg-transparent text-[12px] text-[#505050] font-medium outline-none focus:ring-0 w-full"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="pt-2">
                    <button className="w-full inline-flex text-[12px] justify-center font-bold text-[#fff] bg-[#A42EFF] text-[#000] rounded-[5px] py-[8px] max-[321px]:px-2  px-[20px] focus:outline-none">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="footer-border py-5">
          <p className="text-sm font-normal text-center font-semibold text-[#505050]">
            All rights reserved @ {new Date().getUTCFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
