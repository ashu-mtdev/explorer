import React from "react";
import Btc from "../../../public/assets/BTC.svg";

import Image from "next/image";
import { CiShare1 } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Blocks from "../../../public/assets/Blocks.png";
import Exchange from "../../../public/assets/Exchange Arrow.png";
import Output from "../../../public/assets/Arrow.png";
import Wallet from "../../../public/assets/Wallet.png";
import Link from "next/link";
import { getTimeDiff } from "../Home/Explorerblockchains";
import { SeparateByComma } from "../CommonFunctions";
const Bitcoin = (props) => {
  const bitCoinDAta=props.data.data.data
  return (
    <>
      <section className="lg:py-[100px]  pt-[100px] pb-[50px] overflow-hidden">
        <div className="container mx-auto px-3">
        <h2 className="md:text-5xl text-3xl max-[330px]:text-2xl max-[1023px]:text-center font-semibold text-[#000]">
        Explore Bitcoin:
      </h2>
      <div className="main_cards flex justify-between items-center max-[1023px]:flex-col lg:gap-5 lg:px-[50px] px-5 py-8 mt-5">
            <div className="lg:w-[20%] w-full flex items-center gap-2"   >
              <Image alt="Bitcoin" src={Btc}  className=" w-[100px] max-[330px]:w-[50px]  max-[500px]:w-[70px]" />
              <div>
                <p className="text-[#505050] text-[12px] font-normal">
                  Explorer
                </p>

                <h3 className="text-[25px] max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                  Bitcoin
                </h3>
              </div>
            </div>
            <div className=" lg:h-[200px] lg:border-r-[1px] lg:border-[#D0D0D0]"></div>
            <div className="lg:w-[70%] w-full max-[1023px]:pt-4">
              <div className="flex w-full justify-between max-[1023px]:flex-col items-center">
                <div className="lg:w-[50%] w-full">
                  <div className="flex  items-center ">
                    <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                    {bitCoinDAta?.market_price_usd} USD
                    </h3>
                    {bitCoinDAta?.market_price_usd_change_24h_percentage > 0 ? (
                      <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#1b8754] font-semibold">
                        <MdKeyboardArrowUp />
                      </h3>
                    ) : (
                      <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#FF5757] font-semibold">
                        <MdKeyboardArrowDown />
                      </h3>
                    )}
                    {bitCoinDAta?.market_price_usd_change_24h_percentage > 0 ? (
                      <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#1b8754] font-semibold">
                      {bitCoinDAta?.market_price_usd_change_24h_percentage?.toFixed(
                        1
                      )}
                      %
                      </h3>
                    ) : (
                      <h3 className="text-[25px]  max-[500px]:text-lg max-[330px]:text-base text-[#FF5757] font-semibold">
                      {bitCoinDAta?.market_price_usd_change_24h_percentage?.toFixed(
                        1
                      )}
                      %
                      </h3>
                    )}
                  </div>
                  <p className="text-[#505050] text-[14px] max-[460px]:text-[12px] font-normal py-1">
                  {bitCoinDAta?.suggested_transaction_fee_per_byte_sat} satoshi per byte
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
                    {SeparateByComma(Math.ceil(bitCoinDAta?.circulation/100000000))} BTC
                    </p>
                  </div>
                  <div className="flex  w-[100%] flex-wrap justify-between items-center py-1">
                    <p className="text-[#303030] text-[14px]   max-[460px]:text-[12px] font-medium">
                      Market cap
                    </p>
                    <p className="text-[#303030] text-[14px]  max-[460px]:text-[12px] font-medium">
                    {parseFloat(`${bitCoinDAta?.market_cap_usd/+1000000000}`).toFixed(3)} billion USD
                    </p>
                  </div>
                  <div className="flex  w-[100%] flex-wrap justify-between items-center">
                    <p className="text-[#303030] text-[14px]  max-[460px]:text-[12px] font-medium">
                      Dominance
                    </p>
                    <p className="text-[#303030] text-[14px]  max-[460px]:text-[12px] font-medium">
                    {bitCoinDAta?.market_dominance_percentage}%
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
                    {SeparateByComma(bitCoinDAta?.blocks)}
                    </h3>
                  </div>
                </div>

                <div className=" flex items-center gap-2">
                  <div className="cicle">
                  <Image alt="Exchange" src={Exchange} className=" w-[20px]" />
                  </div>
                  <div>
                    <p className="text-[#505050] text-[12px] font-normal">
                    Transactions
                    </p>

                    <h3 className="text-[12px] text-[#2170FF] font-semibold">
                    {SeparateByComma(bitCoinDAta?.transactions)}
                    </h3>
                  </div>
                </div>
                <div className=" flex items-center gap-2">
                  <div className="cicle">
                  <Image alt="Output" src={Output} className=" w-[20px]" />
                  </div>
                  <div>
                    <p className="text-[#505050] text-[12px] font-normal">
                    Outputs
                    </p>

                    <h3 className="text-[12px] text-[#2170FF] font-semibold">
                    {SeparateByComma(bitCoinDAta?.outputs)}
                    </h3>
                  </div>
                </div>
                <div className=" flex items-center gap-2">
                  <div className="cicle">
                  <Image alt="Wallet" src={Wallet} className=" w-[20px]" />
                  </div>
                  <div>
                    <p className="text-[#505050] text-[12px] font-normal">
                    Addresses
                    </p>

                    <h3 className="text-[12px] text-[#2170FF] font-semibold">
                    {SeparateByComma(bitCoinDAta?.hodling_addresses)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
           
          </div>
          <ul className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
           
              <li className="bitcoin_cards p-5">
                <h3 className="text-[25px] text-[#000] font-semibold">
                  All Time
                </h3>

                <div className="flex items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Blockchain size
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">
                   {parseFloat(`${bitCoinDAta?.blockchain_size/1000000000}`).toFixed(2)} GB
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Network nodes
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">
                    {SeparateByComma(bitCoinDAta?.nodes)}
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Latest block
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">
      <span className="mr-1">   {SeparateByComma(bitCoinDAta?.best_block_height)}  </span>         {getTimeDiff(bitCoinDAta?.best_block_time) > 0 ? `${getTimeDiff(bitCoinDAta?.best_block_time)} min(s) ago` :"a few seconds ago"} 
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Difficulty
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">
                   {SeparateByComma(bitCoinDAta?.difficulty)}
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Next estimated difficulty
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">
                    {SeparateByComma(bitCoinDAta?.next_difficulty_estimate)}
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Next readjustment
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">
                  {bitCoinDAta.next_retarget_time_estimate}
                  </p>
                </div>
              </li>
    
        
              <li className="bitcoin_cards p-5">
                <h3 className="text-[25px] text-[#000] font-semibold">
                  Mempool
                </h3>

                <div className="flex items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Transactions
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">
                    {SeparateByComma(bitCoinDAta?.mempool_transactions)}
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Transactions per second
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">{Math.round(bitCoinDAta?.mempool_tps)}</p>
                </div>
                <div className="flex items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Outputs
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">
                   {SeparateByComma(bitCoinDAta?.mempool_outputs)}
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#303030] text-[14px] font-medium">Fees</p>
                  <p className="text-[#303030] text-[14px] font-medium">
                   {parseFloat(bitCoinDAta?.mempool_total_fee_usd).toFixed(2)} USD
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between my-3">
                  <p className="text-[#303030] text-[14px] font-medium">Size</p>
                  <p className="text-[#303030] text-[14px] font-medium">
                  {Math.round(bitCoinDAta?.mempool_size/1000000)} MB
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#303030] text-[14px] font-medium">
                    Suggested transaction fee
                  </p>
                  <p className="text-[#303030] text-[14px] font-medium">
                    {bitCoinDAta?.suggested_transaction_fee_per_byte_sat} satoshi per byte
                  </p>
                </div>
              </li>
          
          </ul>
          <div className="bitcoin_cards mt-5">
            <h3 className="px-5 pt-5 text-[25px] text-[#000] font-semibold">
              24h statistics
            </h3>
            <ul className=" grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-8 ">
             
                <li className="p-5">
                  <div className="flex items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] font-medium">
                      Transactions
                    </p>
                    <p className="text-[#303030] text-[14px] font-medium">
                     {SeparateByComma(bitCoinDAta?.transactions_24h)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 justify-between">
                    <p className="text-[#303030] text-[14px] font-medium">
                      Transactions per second
                    </p>
                    <p className="text-[#303030] text-[14px] font-medium">
                    {parseFloat(bitCoinDAta?.transactions_24h/(24*60*60)).toFixed(1)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] font-medium">
                      Median transaction fee
                    </p>
                    <p className="text-[#303030] text-[14px] font-medium">
                     {parseFloat(bitCoinDAta?.median_transaction_fee_usd_24h).toFixed(2)} USD
                    </p>
                  </div>
                  <div className="flex items-center gap-1 justify-between">
                    <p className="text-[#303030] text-[14px] font-medium">
                      Average transaction fee
                    </p>
                    <p className="text-[#303030] text-[14px] font-medium">
                     {parseFloat(bitCoinDAta?.average_transaction_fee_usd_24h).toFixed(2)} USD
                    </p>
                  </div>
                </li>
         
                <li className="p-5">
                  <div className="flex items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] font-medium">
                      Blocks
                    </p>
                    <p className="text-[#303030] text-[14px] font-medium">
                     {SeparateByComma(bitCoinDAta?.blocks_24h)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 justify-between">
                    <p className="text-[#303030] text-[14px] font-medium">
                      Avg. time between blocks
                    </p>
                    <p className="text-[#303030] text-[14px] font-medium">
                     {parseInt(+((60*24) / +bitCoinDAta?.blocks_24h)) } minutes {Math.floor((+(60*24*60) / +bitCoinDAta?.blocks_24h)%60)} Seconds
                    </p>
                  </div>
                  <div className="flex items-center gap-1 justify-between my-3">
                    <p className="text-[#303030] text-[14px] font-medium">
                      Volume
                    </p>
                    <p className="text-[#303030] text-[14px] font-medium">
                    {SeparateByComma(Math.round(bitCoinDAta?.volume_24h/10**8))} BTC
                    </p>
                  </div>
                  <div className="flex items-center gap-1 justify-between">
                    <p className="text-[#303030] text-[14px] font-medium">
                      Hashrate
                    </p>
                    <p className="text-[#303030] text-[14px] font-medium">
                     {parseFloat(`${bitCoinDAta?.hashrate_24h /+1000000000000000000}`).toFixed(2)} Eh/s(SHA-256)
                    </p>
                  </div>
                </li>
            
            </ul>
          </div>
          <div className="flex justify-end mt-5">
            <div>
              <div className="flex  items-baseline gap-2">
                <p className=" text-[#2170FF] text-sm font-medium">
                  BC.GAME - the best crypto casino. Up to 5 BTC <br /> daily
                  bonus, 760% deposit bonus. Play now.
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

export default Bitcoin;
