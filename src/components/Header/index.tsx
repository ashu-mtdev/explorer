import React, { useState, useEffect, useRef } from "react";
import Logo from "../../../public/assets/Logo.png";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { LiaArrowRightSolid } from "react-icons/lia";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { LuLanguages } from "react-icons/lu";

import Btc from "../../../public/assets/BTC.svg";
import Eth from "../../../public/assets/ETH.png";
import { AiFillYoutube, AiOutlineDown } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import TailwindLoader from "../Loader";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { API_CONTROLER } from "@/Utils/apis";
const Header = () => {
  const [showDropNav, setShowDropNav] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [showLoader, setshowLoader] = useState(false);
  // const [first, setfirst] = useState(second)
  const [showLangDrop, setshowLangDrop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [showHeaderSearch, setshowHeaderSearch] = useState(true)

  // console.log(router.pathname, "<<<pathname")
  useEffect(() => {
    console.log(router.pathname == "/", "<<<pathname")
    if (router.pathname == "/") setshowHeaderSearch(false)
    else setshowHeaderSearch(true)

    const handleClickOutside = (event: { target: any }) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setshowLangDrop(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef, router.pathname]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Set isScrolled to true when scrolled
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLink() {
    setShowDropNav(false);
  }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setshowLoader(true);
    try {
      const { data } = await API_CONTROLER.txs.txs({
        pageNumber: 1,
        searchItem: searchTerm
      });
      if (data.message == "Data by hash") {
        if (data.data.network == "Bitcoin") {
          setshowLoader(false);
          router.push("/bitcoin/transactions?transaction=" + searchTerm);
        } else {
          setshowLoader(false);
          router.push("/ethereum/transactions?transaction=" + searchTerm);
        }
      } else if (data.message == "Data by address") {
        setshowLoader(false);
        if (data.data.network == "Bitcoin") {
          router.push("/bitcoin/table?address=" + searchTerm);
        } else {
          router.push("/ethereum/table?address=" + searchTerm);
        }
      } else if (data.message == "Data by name") {
        setshowLoader(false);
        if (data.data.network == "Bitcoin") {
          router.push("/bitcoin/table?address=" + searchTerm);
        } else {
          router.push("/ethereum/table?address=" + searchTerm);
        }
      } else if (data.message == "Data cannot be found for invalid address") {
        setshowLoader(false);
        toast.error(data.message);

      }
      setsearchTerm("")
      setShowDropNav(false)
    } catch (error: any) {
      if (error.response) {
        toast.error(error?.response?.data?.message)
        setshowLoader(false);
      } else {
        toast.error(error.message)
        setshowLoader(false);
      }

    }

  };

  return (
    <div>
      <>
        <div
          className={`fixed top-0 z-[60] border-b-[1px] border-[#c0c0c0] min-h-[68px] w-full justify-between   text-white mx-auto  flex  items-center px-4 py-4 ${isScrolled ? " bg-[#fff]" : ""
            }`}
        >
          <div className="container mx-auto">
            <div className="flex  justify-between text-[#163300] items-center">
              <Link href="/">
                <Image
                  className="w-[200px] max-[330px]:w-[150px]"
                  src={Logo}
                  alt="logo"
                />
              </Link>
              {!showDropNav ? (
                <div
                  className="md:hidden menu-icon"
                  onClick={() => setShowDropNav(!showDropNav)}
                >
                  <RxHamburgerMenu />
                </div>
              ) : (
                <div
                  className="md:hidden menu-icon"
                  onClick={() => setShowDropNav(!showDropNav)}
                >
                  <RxCross2 />
                </div>
              )}

              {showHeaderSearch && <div className="head-nav md:flex-1     min-[992px]:px-[2rem] ">
                <form onSubmit={onSubmit}>
                  <div className="flex  items-center  py-[1px] pl-[1px] border-[#6a47cb] bg-[#6e4acf] border-[1px] h-[35px]  rounded-[5px]  w-full">
                    <span className="w-[2rem]  rounded-l-[5px] bg-[#ffffff] h-full justify-center items-center flex">
                      <BsSearch className="w-[20px]" />
                    </span>

                    <input
                      type="text"
                      onChange={(e) => setsearchTerm(e.target.value)}
                      value={searchTerm}
                      className=" bg-[#ffffff] text-[14px] text-[#505050] font-medium outline-none focus:ring-0 w-full h-full rounded-r-lg"
                      placeholder="Search for transactions and address"
                    />
                    <div className="bg-[#6a47cb] w-[2rem] flex justify-center items-center">
                      <button type="submit" >
                        {showLoader ? (
                          <TailwindLoader width={8} />
                        ) : (
                          <LiaArrowRightSolid color="#ffffffff" size="20px" />
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>}


              <div className="list head-nav md:flex uppercase items-center upper text-center font-semibold text-[15px]  min-[992px]:gap-4 gap-4">

                <div className="flex items-center gap-2 relative ">
                  <span
                    onClick={() => setshowLangDrop(!showLangDrop)}
                    className="cursor-pointer text-[13px]"
                  >
                    Explorers
                  </span>
                  {showLangDrop && (
                    <div ref={dropdownRef} className="absolute bg-white  top-12 min-w-[200px] border p-2 w-full  text-left">
                      <Link href="/bitcoin">
                        <div
                          onClick={() => setshowLangDrop(!showLangDrop)}
                          className="lang-label px-2 py-2 flex items-center text-lg gap-2 text-black">
                          <Image src={Btc} className="w-[30px]" alt="bitcoin" />
                          Bitcoin
                        </div>
                      </Link>
                      <Link href="/ethereum">
                        <div
                          onClick={() => setshowLangDrop(!showLangDrop)}
                          className="lang-label px-2 py-2 flex items-center text-lg gap-2 text-black">
                          <Image
                            src={Eth}
                            className="w-[30px]"
                            alt="ethereum"
                          />
                          Ethereum
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                <Link href="/faq" className="text-[13px]" > FAQ </Link>

                <Link href="/privacy-policy" className="text-[13px]"> Privacy Policy</Link>

                <Link href="/contact-us" className="text-[13px]"> CONTACT US</Link>

              </div>
            </div>
          </div>
        </div>
        <div
          className={`
          bg-[#fff] moblie-nav    z-[50] fixed w-full top-0 overflow-y-auto overflow-x-hidden  bottom-0 py-24 
        duration-500 ${showDropNav ? "right-0" : "right-[-100%]"}
        `}
        >
          <div className=" flex items-start px-4  flex-col uppercase  font-semibold text-[15px]">
            <div className="w-full md:flex-1 my-2 mb-6" >
              <form onSubmit={onSubmit}>
                <div className="flex  items-center  py-[1px] pl-[1px] border-[#6a47cb] bg-[#6e4acf] border-[1px] h-[35px]  rounded-[5px]  w-full">
                  <span className="w-[2rem]  rounded-l-[5px] bg-[#ffffff] h-full justify-center items-center flex">
                    <BsSearch className="w-[20px]" />
                  </span>

                  <input
                    type="text"
                    onChange={(e) => setsearchTerm(e.target.value)}
                    value={searchTerm}
                    className=" bg-[#ffffff] text-[14px] text-[#505050] font-medium outline-none focus:ring-0 w-full h-full rounded-r-lg"
                    placeholder="Search for transactions and address"
                  />
                  <div className="bg-[#6a47cb] w-[2rem] flex justify-center items-center">
                    <button type="submit" >
                      {showLoader ? (
                        <TailwindLoader width={8} />
                      ) : (
                        <LiaArrowRightSolid color="#ffffffff" size="20px" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>



            <div className="mb-1">
              <Link href="#" >

                Explorers
              </Link>
            </div>
            <div className="ml-2">
              <Link href="/bitcoin" onClick={handleLink} className="flex gap-2">
                <Image src={Btc} className="w-[25px]" alt="bitcoin" />
                Bitcoin
              </Link>
            </div>
            <div className="ml-2">
              <Link href="/ethereum" onClick={handleLink} className="flex gap-2">
                <Image src={Eth} className="w-[25px]" alt="bitcoin" />
                Ethereum
              </Link>
            </div>
            <div className="py-4">
              <Link href="/faq" onClick={handleLink}>
                FAQ
              </Link>
            </div>
            <div className="">
              <Link href="/privacy-policy" onClick={handleLink}>
                Privacy Policy
              </Link>
            </div>
            <div className="py-4">
              <Link href="/contact-us" onClick={handleLink}>
                {" "}
                CONTACT US
              </Link>
            </div>
            {/* <div className="">
              <Link href="#" onClick={handleLink}>
                <div className="flex items-center gap-2">
                  <span>
                    <LuLanguages className="w-[15px]" />
                  </span>
                  <span>Eng</span>
                </div>
              </Link>
            </div> */}
          </div>
        </div>
      </>
    </div>
  );
};

export default Header;
