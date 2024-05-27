import React, { useState } from "react";
import Banner from "../../../../public/assets/Banner.png";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";

import { FaRegAddressCard } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { API_CONTROLER } from "../../../Utils/apis";
import { LiaArrowRightSolid } from "react-icons/lia";
import { useRouter } from "next/router";
import TailwindLoader, { TailwindLoader1 } from "../../Loader";

const Herosection = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [showLoader, setshowLoader] = useState(false);
  const router = useRouter();
const randomAddress=()=>{
 let add=["0xc1fe658c1b1b5ae4f2d0a6fadfb10dac30bfb358","0xb9d81f0c20be2d143a3646ac5365d27c33a9054d","0x690b9a9e9aa1c9db991c7721a92d351db4fac990","0x518489f9ed41fc35bcd23407c484f31897067ff0,0x219f47a553806caf072d792014cb2f8d4b6cef73d6de5a96437950080b83da67"]
  const randomIndex = Math.floor(Math.random() * add.length);
  setsearchTerm(add[randomIndex])
  
}

const randomTxs=()=>{
 let add=["2542378b2775c4512a1400023eaff091a937cefa27a562bfb7df16b16af33715","7e165967d4013416678b5573f2e5f786615737403ec5ebf81168aff7e6ab900f","3ef8cc49539e881674e949a10d84ba690e886b092a4a901d1524e0a6b4c2c90d","0xb81d1958dd029248d407f67b60fbf8fd06fab58ec9439d0e9fe1a20c4c9f3b1a","0x0996b4a4c83849a6b7cbe65c51571a17c9590c4b8d25b861a1a04ad6157f5d6a"]
  const randomIndex = Math.floor(Math.random() * add.length);
  setsearchTerm(add[randomIndex])
}

  const onSubmit = async (e) => {
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
    } catch (error) {
      if(error.response){
        toast.error(error?.response?.data?.message)
        setshowLoader(false);
      }else{
        toast.error(error.message)
        setshowLoader(false);
      }
      
    }
  
  };
  return (
    <>
      <section className="py-[100px]">
        <div className="container mx-auto px-3">
          <div className="flex flex-col lg:flex-row  items-center lg:gap-5 min-[1280px]:gap-[4rem] py-5 justify-between ">
            <div className="w-full lg:w-[40%]">
              <Image alt="Banner" src={Banner} className=" w-full" />
            </div>
            <div className=" w-full lg:w-[60%] max-[1023px]:mt-5">
              <h1 className="md:text-5xl text-3xl max-[1023px]:text-center font-bold">
                Blockchain explorer, analytics and web services.
              </h1>
              <p className="text-lg max-[1023px]:text-center max-[1023px]:text-base font-medium py-4">
                Explore data stored on multiple blockchains.
              </p>
              <form action={onSubmit}>
                <div className="flex  items-center  py-[1px] pl-[1px] border-[#6a47cb] bg-[#6e4acf] border-[1px] h-[60px]  rounded-[5px]  w-full">
                  <span className="w-[3rem]  rounded-l-[5px] bg-[#ffffff] h-full justify-center items-center flex">
                    <BsSearch className="w-[27px]" />
                  </span>

                  <input
                    type="text"
                    onChange={(e) => setsearchTerm(e.target.value)}
                    value={searchTerm}
                    className=" bg-[#ffffff] text-[16px] text-[#505050] font-medium outline-none focus:ring-0 w-full h-full rounded-r-lg"
                    placeholder="Search for transactions and address"
                  />  
                  <div className="bg-[#6a47cb] w-[3rem] flex justify-center items-center">
                    <button type="submit"  onClick={onSubmit}>
                      {showLoader ? (
                        <TailwindLoader />
                      ) : (
                        <LiaArrowRightSolid color="#ffffffff" size="30px" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex items-center gap-3 max-[500px]:flex-wrap py-4 max-[1023px]:justify-center">
                <p className="text-base max-[500px]:text-sm font-medium ">
                  Search example:
                </p>
                <div className="flex items-center gap-2 ">
                  <span>
                    <FaRegAddressCard />
                  </span>
                  <p className="text-base max-[500px]:text-sm font-medium  " style={{cursor:"pointer"}} onClick={randomAddress}>
                    Address
                  </p>
                </div>
                <div className="flex items-center gap-2 max-[367px]:pt-2">
                  <span>
                    <BiTransfer />
                  </span>
                  <p className="text-base max-[500px]:text-sm font-medium " style={{cursor:"pointer"}} onClick={randomTxs}>
                    Transactions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Herosection;
