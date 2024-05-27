import React, { useEffect, useState } from "react";
import Eth from "../../../public/assets/ETH.png";
import Image from "next/image";
import { CiShare1 } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Blocks from "../../../public/assets/Blocks.png";
import Exchange from "../../../public/assets/Exchange Arrow.png";
import Output from "../../../public/assets/unblocks.png";
import Up from "../../../public/assets/up.png";
import Link from "next/link";
//import Btc from "../../../public/assets/BTC.png";

import { getTimeDiff } from "../Home/Explorerblockchains";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SeparateByComma } from "../CommonFunctions";
const Ethereum = (props) => {
  const [data, setdata] = useState({});

  const router = useRouter();
  const { query } = router;
  useEffect(() => {
 
      const data = props.data.data.data;
      setdata(data);
  
  }, [query.name,props.data.data.data]);

  const coinImage = Eth ;
  const coinName = "Ethereum" 

  return (
    <>
      <section className="lg:py-[100px]  pt-[100px] pb-[50px] overflow-hidden">
        <div className="container mx-auto px-3">
          <h2 className="md:text-5xl text-3xl max-[330px]:text-2xl max-[1023px]:text-center font-semibold text-[#000]">
            Explore {coinName}:
          </h2>
          <div className="main_cards flex justify-between items-center max-[1023px]:flex-col lg:gap-5 lg:px-[50px] px-5 py-8 mt-5">
            <div className="lg:w-[20%] w-full flex items-center gap-2">
              <Image
                alt="Eth "
                src={coinImage}
                className=" w-[100px] max-[330px]:w-[50px]  max-[500px]:w-[70px]"
              />
              <div>
                <p className="text-[#505050] text-[12px] font-normal">
                  Explorer
                </p>

                <h3 className="text-[25px] max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                  {coinName}
                </h3>
              </div>
            </div>
            <div className=" lg:h-[200px] lg:border-r-[1px] lg:border-[#D0D0D0]"></div>
            <div className="lg:w-[70%] w-full max-[1023px]:pt-4">
              <div className="flex w-full justify-between max-[1023px]:flex-col items-center">
                <div className="lg:w-[50%] w-full">
                  <div className="flex  items-center ">
                    <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                      {data?.market_price_usd} USD
                    </h3>
                    {data?.market_price_usd_change_24h_percentage > 0 ? (
                      <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#1b8754] font-semibold">
                        <MdKeyboardArrowUp />
                      </h3>
                    ) : (
                      <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#FF5757] font-semibold">
                        <MdKeyboardArrowDown />
                      </h3>
                    )}
                    {data?.market_price_usd_change_24h_percentage > 0 ? (
                      <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#1b8754] font-semibold">
                        {data?.market_price_usd_change_24h_percentage?.toFixed(
                          1
                        )}
                        %
                      </h3>
                    ) : (
                      <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#FF5757] font-semibold">
                        {data?.market_price_usd_change_24h_percentage?.toFixed(
                          1
                        )}
                        %
                      </h3>
                    )}
                  </div>
                  <p className="text-[#505050] text-[14px] max-[460px]:text-[12px] font-normal py-1">
                    {data?.suggested_transaction_fee_gwei_options?.normal} Gwei
                  </p>
                  <p className="text-[#505050] text-[14px] max-[460px]:text-[12px] font-normal">
                    recommended gas price
                  </p>
                </div>
                <div className="lg:w-[50%] w-full max-[1023px]:pt-1">
                  <div className="flex  w-[100%] flex-wrap justify-between items-center">
                    <p className="text-[#303030] text-[14px] max-[460px]:text-[12px] font-medium">
                      Circulation
                    </p>
                    <p className="text-[#303030] text-[14px] max-[460px]:text-[12px] font-medium">
                      {SeparateByComma(Math.ceil(data?.circulation_approximate / 1000000000000000000))}  ETH
                    </p>
                  </div>
                  <div className="flex  w-[100%] flex-wrap justify-between items-center py-1">
                    <p className="text-[#303030] text-[14px]   max-[460px]:text-[12px] font-medium">
                      Market cap
                    </p>
                    <p className="text-[#303030] text-[14px]  max-[460px]:text-[12px] font-medium">
                      {parseFloat(data?.market_cap_usd /1000000000).toFixed(2)} USD
                    </p>
                  </div>
                  <div className="flex  w-[100%] flex-wrap justify-between items-center">
                    <p className="text-[#303030] text-[14px]  max-[460px]:text-[12px] font-medium">
                      Dominance
                    </p>
                    <p className="text-[#303030] text-[14px]  max-[460px]:text-[12px] font-medium">
                      {data?.market_dominance_percentage}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-wrap max-[639px]:gap-4  justify-between items-center pt-[40px]">
                <div className=" flex items-center gap-2">
                  <div className="cicle">
                    <Image alt="Blocks" src={Blocks} className=" w-[20px]" />
                  </div>
                  <div>
                    <p className="text-[#505050] text-[12px] font-normal">
                      Blocks
                    </p>

                    <h3 className="text-[12px] text-[#2170FF] font-semibold">
                      {SeparateByComma(data?.blocks)}
                    </h3>
                  </div>
                </div>

                <div className=" flex items-center gap-2">
                  <div className="cicle">
                    <Image alt="Output" src={Output} className=" w-[20px]" />
                  </div>
                  <div>
                    <p className="text-[#505050] text-[12px] font-normal">
                      Uncles
                    </p>

                    <h3 className="text-[12px] text-[#2170FF] font-semibold">
                      {SeparateByComma(data?.uncles)}
                    </h3>
                  </div>
                </div>
                <div className=" flex items-center gap-2">
                  <div className="cicle">
                    <Image
                      alt="Exchange"
                      src={Exchange}
                      className=" w-[20px]"
                    />
                  </div>
                  <div>
                    <p className="text-[#505050] text-[12px] font-normal">
                      Transactions
                    </p>

                    <h3 className="text-[12px] text-[#2170FF] font-semibold">
                      {SeparateByComma(data?.transactions)}
                    </h3>
                  </div>
                </div>
                <div className=" flex items-center gap-2">
                  <div className="cicle">
                    <Image alt="Up" src={Up} className=" w-[20px]" />
                  </div>
                  <div>
                    <p className="text-[#505050] text-[12px] font-normal">
                      Calls
                    </p>

                    <h3 className="text-[12px] text-[#2170FF] font-semibold">
                      {SeparateByComma(data?.calls)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
            <Link href="">
              <li className="bitcoin_cards p-5 lg:h-[220px]">
                <h3 className="text-[25px] max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                  All Time
                </h3>

                <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    Latest block
                  </p>
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    {data?.blocks}<span className="ml-3">
                      {SeparateByComma(getTimeDiff(data?.best_block_time)) > 0 ? `  ${getTimeDiff(data?.best_block_time)} min(s) ago`:"a few seconds ago"}
                      </span>  
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1 justify-between">
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    Blockchain size
                  </p>
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    {Math.ceil(data?.blockchain_size/1000000000)} GB
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    Difficulty
                  </p>
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    {data?.difficulty}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1 justify-between">
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    Burned
                  </p>
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    {SeparateByComma(parseFloat(data?.burned/1000000000000000000).toFixed(2))} ETH
                  </p>
                </div>
              </li>
            </Link>
            <Link href="">
              <li className="bitcoin_cards p-5 lg:h-[220px]">
                <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                  Mempool
                </h3>

                <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    Transactions
                  </p>
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    {SeparateByComma(data?.mempool_transactions)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1 justify-between">
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    Transactions per second
                  </p>
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  {data?.mempool_tps}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    Value of pending transfers
                  </p>
                  <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  {parseFloat(data.mempool_total_value_approximate / 10**18).toFixed(2) } ETH
                  </p>
                </div>
              </li>
            </Link>
          </ul>
          <div className="bitcoin_cards mt-5">
            <h3 className="px-5 pt-5 text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
              24h statistics
            </h3>
            <ul className=" grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-8 ">
              <Link href="">
                <li className="p-5">
                  <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Transactions
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {SeparateByComma(data?.transactions_24h)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 justify-between">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Transactions per second
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                    {parseFloat(data?.transactions_24h/(24*60*60)).toFixed(2)}  
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Median transaction fee
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {parseFloat(data?.median_transaction_fee_usd_24h).toFixed(2)} USD
                    </p>
                  </div>
                  <div className="flex  flex-wrap items-center gap-1 justify-between">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Average transaction fee
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {parseFloat(data?.average_transaction_fee_usd_24h).toFixed(2)} USD
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Average simple transfer fee
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {parseFloat(data?.average_simple_transaction_fee_usd_24h).toFixed(2)} USD
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 justify-between ">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Median simple transfer fee
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {parseFloat(data?.median_simple_transaction_fee_usd_24h).toFixed(2)} USD
                    </p>
                  </div>
                </li>
              </Link>
              <Link href="">
                <li className="p-5">
                  <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Blocks
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {SeparateByComma(data?.blocks_24h)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 justify-between">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Avg. time between blocks
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {parseFloat((24*60*60)/data?.blocks_24h).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Volume
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {parseFloat(data?.volume_24h_approximate /1000000000000000000).toFixed(2)} ETH
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 justify-between">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Hashrate
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {data?.hashrate_24h} (Ethash)
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Uncles
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {data?.uncles_24h}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 justify-between">
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      Burned 24h
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {parseFloat(data?.burned_24h/1000000000000000000).toFixed(2)} ETH
                    </p>
                  </div>
                </li>
              </Link>
            </ul>
          </div>
          <div className="bitcoin_cards mt-5 px-5 py-5">
            <h3 className=" text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
              Gas price tracker
            </h3>
            <ul className="mt-5 grid grid-cols-1 items-start gap-4 lg:grid-cols-4 lg:gap-8 ">
              <Link href="">
                <li className="gas p-3">
                  <div className="flex justify-center items-center gap-2">
                    <p className="text-[#FF0B72]">
                      <GoDotFill className="text-[#FF0B72] text-2xl max-[500px]:text-lg max-[330px]:text-base " />
                    </p>
                    <p className=" text-[#505050] text-[18px]  max-[500px]:text-lg max-[330px]:text-base font-medium">
                      Slow -{" "}
                      {data?.suggested_transaction_fee_gwei_options?.slow} Gwei
                    </p>
                  </div>
                </li>
              </Link>
              <Link href="">
                <li className="gas p-3">
                  <div className="flex justify-center items-center gap-2">
                    <p className="">
                      <GoDotFill className="text-[#7B6BFF] text-2xl  max-[500px]:text-lg max-[330px]:text-base" />
                    </p>
                    <p className=" text-[#505050] text-[18px]  max-[500px]:text-lg max-[330px]:text-base font-medium">
                      Normal -{" "}
                      {data?.suggested_transaction_fee_gwei_options?.normal}{" "}
                      Gwei
                    </p>
                  </div>
                </li>
              </Link>
              <Link href="">
                <li className="gas p-3">
                  <div className="flex justify-center items-center gap-2">
                    <p className="">
                      <GoDotFill className="text-[#49D0EE] text-2xl max-[500px]:text-lg max-[330px]:text-base" />
                    </p>
                    <p className=" text-[#505050] text-[18px]  max-[500px]:text-lg max-[330px]:text-base font-medium">
                      Fast -{" "}
                      {data?.suggested_transaction_fee_gwei_options?.fast} Gwei
                    </p>
                  </div>
                </li>
              </Link>
              <Link href="">
                <li className="gas p-3 ">
                  <div className="flex justify-center items-center gap-2">
                    <p className="">
                      <GoDotFill className="text-[#4AEC74] text-2xl max-[500px]:text-lg max-[330px]:text-base" />
                    </p>
                    <p className=" text-[#505050] text-[18px]  max-[500px]:text-lg max-[330px]:text-base font-medium">
                      Super - {data?.suggested_transaction_fee_gwei_options?.cheetah} Gwei
                    </p>
                  </div>
                </li>
              </Link>
            </ul>
            {/* <div className="gas p-3 text-center mt-3">
              <p className=" text-[#505050] text-[14px] font-medium">
                25% of the transactions confirmed in the last 10 min had the gas
                price 6 Gwei or lower
              </p>
            </div> */}
          </div>
          <div className="flex lg:justify-end mt-5 justify-center">
            <div>
              <div className="flex  items-baseline gap-2">
                <p className=" text-[#2170FF] max-[1023px]:text-center text-sm font-medium">
                  BC.GAME - the best crypto casino. Up to 5 BTC{" "}
                  <br className="max-[1023px]:hidden" /> daily bonus, 760%
                  deposit bonus. Play now.
                </p>
                <p className="text-[#505050] text-sm font-medium">
                  <CiShare1 />
                </p>
              </div>
              <div className="flex items-center gap-3 max-[500px]:flex-wrap py-4 max-[1023px]:justify-center">
                <p className="text-[10px] text-[#505050] font-medium ">
                  Sponsored
                </p>
                <div className="flex items-center gap-2 ">
                  <span>
                    <BsDot className="text-[10px] text-[#505050]" />
                  </span>
                  <p className="text-[10px] text-[#505050] font-medium  ">
                    Advertise here
                  </p>
                </div>
                <div className="flex items-center gap-2 max-[367px]:pt-2">
                  <span>
                    <BsDot className="text-[10px] text-[#505050]" />
                  </span>
                  <p className="text-[10px] text-[#505050] font-medium ">
                    Turn off ads
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

export default Ethereum;
