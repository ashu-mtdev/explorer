import React from "react";
import Btc from "../../../../public/assets/BTC.svg";
import Eth from "../../../../public/assets/ETH.png";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { SeparateByComma } from "../../../components/CommonFunctions"
const Explorerblockchains = (props: any) => {
  const ethereum = props.data?.ethereum?.data?.data;
  const bitcoin = props.data?.bitcoin?.data?.data;
  const manageValue = (val: any) => {
    return val ? val : "NA";
  };

  return (
    <>
      <section className="bg-[#000] lg:py-[100px] py-[50px]">
        <div className="container mx-auto px-3">
          <h2 className="md:text-5xl text-3xl max-[330px]:text-2xl max-[1023px]:text-center font-bold text-[#fff]">
            Explore Blockchains
          </h2>
          <ul className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-8 mt-5">
            <Link href="/bitcoin">
              <li className="cards p-[30px]">
                <div className="flex items-center gap-2">
                  <Image alt="Bitcoin" src={Btc} className=" w-[100px]  max-[330px]:w-[50px]" />
                  <div>
                    <h3 className="text-[25px]  max-[330px]:text-base text-[#fff] font-semibold">
                      Bitcoin
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-[#fff] text-lg max-[1023px]:text-base  max-[330px]:text-sm font-medium">
                        $ {bitcoin?.market_price_usd}
                      </p>
                      {bitcoin?.market_price_usd_change_24h_percentage > 1 ? (
                        <p className="text-[#198754] text-lg max-[1023px]:text-base  max-[330px]:text-sm font-medium">
                          ^{" "}
                          {bitcoin?.market_price_usd_change_24h_percentage?.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : (
                        <p className="text-[#FF5757] max-[330px]:text-sm text-lg max-[1023px]:text-base font-medium">
                          v{" "}
                          {ethereum?.market_price_usd_change_24h_percentage?.toFixed(
                            1
                          )}
                          %
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 justify-between mt-5 mb-3">
                  <p className="text-[#fff] text-[14px]  max-[320px]:text-[12px]  font-medium">Blocks</p>
                  <p className="text-[#fff] text-[14px] max-[320px]:text-[12px] font-medium">
                    {SeparateByComma(manageValue(bitcoin?.blocks))}
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#fff] text-[14px] max-[320px]:text-[12px] font-medium">
                    Transactions
                  </p>
                  <p className="text-[#fff] text-[14px] max-[320px]:text-[12px] font-medium">
                    {SeparateByComma(manageValue(bitcoin?.transactions))}
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between my-3">
                  <p className="text-[#fff] text-[14px] max-[320px]:text-[12px] font-medium">
                    Latest Block
                  </p>
                  <p className="text-[#fff] text-[14px] max-[320px]:text-[12px] font-medium">
                    {getTimeDiff(bitcoin?.best_block_time)} min(s) ago
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#fff] text-[14px] max-[320px]:text-[12px] font-medium">
                    Transactions per second
                  </p>
                  <p className="text-[#fff] text-[14px] max-[320px]:text-[12px] font-medium">
                    {manageValue(bitcoin?.mempool_tps?.toFixed(2))}
                  </p>
                </div>
              </li>
            </Link>

            <Link href="/ethereum">
              <li className="cards p-[30px]">
                <div className="flex items-center gap-2">
                  <Image alt="Ethereum" src={Eth} className=" w-[100px] max-[330px]:w-[50px]" />
                  <div>
                    <h3 className="text-[25px]  max-[330px]:text-base  text-[#fff] font-semibold">
                      Ethereum
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-[#fff] text-lg  max-[330px]:text-sm max-[1023px]:text-base font-medium">
                        $ {ethereum?.market_price_usd}
                      </p>
                      {ethereum?.market_price_usd_change_24h_percentage > 1 ? (
                        <p className="text-[#198754] text-lg max-[330px]:text-sm max-[1023px]:text-base font-medium">
                          ^{" "}
                          {ethereum?.market_price_usd_change_24h_percentage?.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : (
                        <p className="text-[#FF5757] text-lg max-[330px]:text-sm max-[1023px]:text-base font-medium">
                          v{" "}
                          {ethereum?.market_price_usd_change_24h_percentage?.toFixed(
                            1
                          )}
                          %
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 justify-between mt-5 mb-3">
                  <p className="text-[#fff] text-[14px]  max-[320px]:text-[12px] font-medium">Blocks</p>
                  <p className="text-[#fff] text-[14px]  max-[320px]:text-[12px] font-medium">
                    {SeparateByComma(manageValue(ethereum?.blocks))}
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#fff] text-[14px]  max-[320px]:text-[12px] font-medium">
                    Transactions
                  </p>
                  <p className="text-[#fff] text-[14px]  max-[320px]:text-[12px] font-medium">
                    {SeparateByComma(manageValue(ethereum?.transactions))}
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between my-3">
                  <p className="text-[#fff] text-[14px]  max-[320px]:text-[12px] font-medium">
                    Latest Block
                  </p>
                  <p className="text-[#fff] text-[14px]  max-[320px]:text-[12px] font-medium">
                    {getTimeDiff(ethereum?.best_block_time)} min(s) ago
                  </p>
                </div>
                <div className="flex items-center gap-1 justify-between">
                  <p className="text-[#fff] text-[14px]  max-[320px]:text-[12px] font-medium">
                    Transactions per second
                  </p>
                  <p className="text-[#fff] text-[14px]  max-[320px]:text-[12px] font-medium">
                    {" "}
                    {manageValue(ethereum?.mempool_tps?.toFixed(2))}
                  </p>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </section>
    </>
  );
};
export const getTimeDiff = (best_block_time: any) => {
  const blockTime = new Date(best_block_time);
  const currtime = new Date();

  const blockTimeStamp: any = blockTime;
  const currtimeStamp: any = currtime;

  const diff = Math.floor((currtimeStamp - blockTimeStamp) / 60000);
  // const diff=Math.floor((currtimeStamp - blockTimeStamp) / 60000);
  // const minutes=
  return diff - 330;
};
export default Explorerblockchains;
