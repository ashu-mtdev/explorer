import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import {
  AiFillQuestionCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight
} from "react-icons/ai";
import Btc from "../../../../public/assets/BTC.svg";
import Link from "next/link";
import { CiShare1 } from "react-icons/ci";
import { BsDot } from "react-icons/bs";
import Image from "next/image";
import { API_CONTROLER } from "@/Utils/apis";
import { convertBitCoinField, convertField } from "@/components/Field";
import { toast } from "react-toastify";
import { SeparateByComma } from "@/components/CommonFunctions";
import { useRouter } from "next/router";
import NoData from "@/components/NoData";
import { Tooltip } from "react-tooltip";

import TailwindLoader, { TailwindLoader1 } from "@/components/Loader";
const Transactions = (props) => {
  const [bitCoinData, setbitCoinData] = useState();
  const [orderData, setorderData] = useState([]);
  const [showLoader, setshowLoader] = useState(false);
  const [throwError, setthrowError] = useState(false);
  const [freeFields, setfreeFields] = useState([]);
  // const [newWorkData, setNewWorkData] = useState({})
  const router = useRouter();
  // const [first, setfirst] = useState(second)
  useEffect(() => {
    if (props?.data?.data?.data?.length) {
      console.log(props.data.data.data, "<<<<bitcoindat");
      if (props.data.data.data[0]?.freeFields) {
        const { freeFields } = props.data.data.data[0];
        setfreeFields(JSON.parse(freeFields));
      }
      setbitCoinData(props.data.data.data[0]);

      getTableData();
    } else {
      setthrowError(true);
    }
  }, [props?.data?.data?.data]);
  const getTableData = async () => {
    try {
      const { data } = await API_CONTROLER.table.get();
      setorderData(data.data[0].bitcoin);
    } catch (error) {}
  };

  const calculateTime = () => {
    function isTimestampInMilliseconds(value) {
      // Check if the value is an integer
      if (Number.isInteger(value)) {
        // Check if the value is within a reasonable range for timestamps
        let isStampInMiliSeconds =
          value > 1000000000000 && value < 9999999999999; // Example range for timestamps in milliseconds
        return isStampInMiliSeconds
          ? new Date(+value)
          : new Date(+value * 1000);
      }
    }

    const givenTimestamp = isTimestampInMilliseconds(
      +bitCoinData?.status?.block_time
    ); // Example timestamp in milliseconds
    console.log("thisisgeneratedtimestamp-----", givenTimestamp);
    if (givenTimestamp) return givenTimestamp.toUTCString();
    // return (
    //   givenTimestamp.toDateString() + " " + givenTimestamp.toTimeString()
    // );
  };
  const copyIt = (add) => {
    navigator.clipboard.writeText(`${add}`);
    toast.success("Copied");
  };
  const onClickHash = async (searchTerm) => {
    setshowLoader(true);
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
  };
  return throwError ? (
    <div className="h-[70vh] flex justify-center items-center">
      <NoData message="Invalid Transaction Id" home={true} />
    </div>
  ) : (
    <>
      <section className="lg:py-[100px]  pt-[100px] pb-[50px] overflow-hidden">
        <div className="container mx-auto px-3">
          <h2 className="md:text-5xl text-3xl max-[330px]:text-2xl max-[1023px]:text-center font-semibold text-[#000]">
            Bitcoin Transactions
          </h2>
          {showLoader && (
            <div className="w-full text-center">
              <TailwindLoader1 />
            </div>
          )}
          <div className="flex w-full justify-between gap-5  max-[1023px]:flex-col py-5">
            <div className="lg:w-[35%] w-full bitcoin_cards p-5 ">
              <h3 className="text-[25px] max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                Transaction hash
              </h3>
              <div className="flex    justify-between gap-2 pt-3 ">
                <p
                  className=" text-[#303030] w-[90%]   text-sm font-medium "
                  style={{ wordWrap: "break-word" }}
                >
                  {bitCoinData?.txid}
                </p>
                <p className="text-[#000000] text-base font-medium">
                  <FaRegCopy
                    fontSize={21}
                    onClick={() => copyIt(bitCoinData?.txid)}
                  />
                </p>
              </div>

              <div className="flex  items-center justify-between gap-2 pt-5 ">
                <h3 className="text-[15px]  text-[#202020] font-semibold">
                  Amount transacted
                </h3>
                <p className="max-[340px]:block min-[341px]:hidden text-[#000] text-2xl font-medium">
                  <AiFillQuestionCircle
                    className="text-[#000] cursor-pointe"
                    data-tooltip-id="my-tooltip-inline"
                    data-tooltip-html="Amount transferred in the transaction"
                    data-tooltip-variant="dark"
                  />

                  <Tooltip
                    id="my-tooltip-inline"
                    place="left"
                    style={{
                      color: "#fff",
                      fontSize: "11px",
                      width: "12rem"
                    }}
                  />
                </p>
                <p className="max-[340px]:hidden min-[341px]:block text-[#000] text-2xl font-medium">
                  <AiFillQuestionCircle
                    className="cursor-pointe"
                    data-tooltip-id="my-tooltip-inline"
                    data-tooltip-html="Amount transferred in the transaction"
                    data-tooltip-variant="dark"
                  />

                  <Tooltip
                    id="my-tooltip-inline"
                    place="left"
                    style={{
                      color: "#fff",
                      fontSize: "11px"
                    }}
                  />
                </p>
              </div>
              <p className="text-[#303030] text-[12px] font-medium">
                {/* {calculateAmountTxt()} BTC */}
                {bitCoinData?.vout?.length &&
                  bitCoinData?.vout.reduce((total, curr) => {
                    return +total + +curr.value;
                  }, 0) /
                    10 ** 8}{" "}
                BTC
              </p>
              {bitCoinData?.amtTxsUsd && +bitCoinData?.amtTxsUsd > -1 && (
                <p className="text-[#303030] text-[12px] font-medium">
                  {bitCoinData?.amtTxsUsd} USD
                </p>
              )}
              <br />
              {/*  */}
              <div className="flex  items-center justify-between gap-2 ">
                <h3 className="text-[15px]  text-[#202020] font-semibold">
                  Transaction fee
                </h3>
                <p className="max-[340px]:block min-[341px]:hidden text-[#000] text-2xl font-medium">
                  <AiFillQuestionCircle
                    className="text-[#000] cursor-pointe"
                    data-tooltip-id="my-tooltip-inline"
                    data-tooltip-html="Fee paid to process the transaction"
                    data-tooltip-variant="dark"
                  />

                  <Tooltip
                    id="my-tooltip-inline"
                    place="left"
                    style={{
                      color: "#fff",
                      fontSize: "11px",
                      width: "12rem"
                    }}
                  />
                </p>
                <p className="max-[340px]:hidden min-[341px]:block text-[#000] text-2xl font-medium">
                  <AiFillQuestionCircle
                    className="cursor-pointe"
                    data-tooltip-id="my-tooltip-inline"
                    data-tooltip-html="Fee paid to process the transaction"
                    data-tooltip-variant="dark"
                  />

                  <Tooltip
                    id="my-tooltip-inline"
                    place="left"
                    style={{
                      color: "#fff",
                      fontSize: "11px"
                    }}
                  />
                </p>
              </div>
              <p className="text-[#303030] text-[12px] font-medium">
                {bitCoinData?.fee / 100000000} BTC
              </p>
              {bitCoinData?.txsFeeUsd && +bitCoinData?.txsFeeUsd > -1 && (
                <p className="text-[#303030] text-[12px] font-medium">
                  {bitCoinData?.txsFeeUsd} USD
                </p>
              )}
              {/*  */}

              <br />

              <div className="">
                <h3 className="text-[15px]  text-[#202020] font-semibold">
                  Time{" "}
                </h3>
                <p className="text-[#303030] text-[12px] font-medium">
                  {calculateTime()}
                </p>
              </div>
            </div>

            <div className="lg:w-[63%] w-full bitcoin_cards p-5">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <Image
                  alt="Btc "
                  src={Btc}
                  className=" w-[75px] max-[330px]:w-[50px]  max-[500px]:w-[70px]"
                />
                <div>
                  <p className="text-[#505050] text-[12px] font-normal">
                    Transaction status
                  </p>

                  <div className="flex items-center gap-2">
                    <h3 className="text-[20px] max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                      Transaction
                    </h3>
                    {/* <p className="text-[#A0A0A0] text-2xl font-medium">
                      <AiFillQuestionCircle />
                    </p> */}
                    <div className="">
                      {(bitCoinData?.status.confirmed == "true" ||
                        bitCoinData?.status.confirmed == 1) && (
                        <button className="w-full inline-flex text-[12px] justify-center font-bold text-[#fff] bg-[#21BAF7] text-[#000] rounded-[20px] py-[6px] max-[321px]:px-2  px-[8px] focus:outline-none">
                          Confirmed
                        </button>
                      )}
                      {bitCoinData?.status.confirmed != "true" &&
                        bitCoinData?.status.confirmed != 1 && (
                          <button className="w-full inline-flex text-[12px] justify-center font-bold text-[#fff] bg-[#ff4646] text-[#000] rounded-[20px] py-[6px] max-[321px]:px-2  px-[8px] focus:outline-none">
                            Unconfirmed
                          </button>
                        )}
                    </div>
                  </div>
                  <p className="text-[#303030] text-[12px] font-medium">
                    Block id {bitCoinData?.status?.block_height}
                  </p>
                </div>
              </div>
              {orderData?.map((item, index) => {
                if (bitCoinData?.freeFields) {
                  if (["size", "locktime", "version"].includes(item))
                    return null;
                }
                if (item)
                  return (
                    <div
                      key={index}
                      className="flex flex-wrap items-center gap-1 justify-between mt-[2px] mb-[2px]"
                    >
                      <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                        {convertBitCoinField(item)}
                      </p>
                      <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                        {(() => {
                          if (item == "weight" || item == "fee") {
                            return SeparateByComma(bitCoinData[item]);
                          } else if (item == "feePerKB") {
                            return (
                              SeparateByComma(
                                Math.round(
                                  (bitCoinData.fee / bitCoinData?.size) * 1000
                                )
                              ) + " satoshi"
                            );
                          } else if (item == "feePerKWU") {
                            return (
                              SeparateByComma(
                                Math.round(
                                  (bitCoinData.fee / bitCoinData?.weight) * 1000
                                )
                              ) + " satoshi"
                            );
                          } else if (item == "is_coinbase") {
                            return bitCoinData?.vin[0].is_coinbaser
                              ? "Yes"
                              : "No";
                          } else if (item == "witness") {
                            return typeof bitCoinData?.witness == "boolean"
                              ? bitCoinData.witness
                                ? "Yes"
                                : "No"
                              : bitCoinData?.vin[0]?.witness?.length
                              ? "Yes"
                              : "No";
                          } else {
                            return bitCoinData[item];
                          }
                        })()}
                      </p>
                    </div>
                  );
              })}

              {freeFields?.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="flex flex-wrap items-center gap-1 justify-between mt-[2px] mb-[2px]"
                  >
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {item.field}
                    </p>
                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                      {item.value}
                    </p>
                  </div>
                );
              })}

              {/* <div className="flex flex-wrap items-center gap-1 justify-between">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Coindays destroyed
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  2,673.31
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between my-2">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Weight
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  1,102
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Fee per kB
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  16,969 satoshi | 4.56USD
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between my-2">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Fee per kWU
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  9,300 satoshi | 2.50USD
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Is Coinbase?
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  No
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between my-2">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Has witness data?
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Yes
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Has witness data?
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Yes
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between my-2">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  RBF Enabled
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Yes
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Lock time
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  811,789
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1 justify-between my-2">
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  Version
                </p>
                <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                  1
                </p>
              </div> */}
            </div>
          </div>
          <ul className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2 xl:gap-8 mt-5">
            <li className="bitcoin_cards p-5 ">
              <div className="border-[1px] border-[#D0D0D0] rounded-[5px]">
                <p className="text-[#000] py-2 text-center text-[15px] max-[320px]:text-[12px] font-semibold">
                  Senders ({bitCoinData?.vin.length})
                </p>
              </div>
              <div
                className="flex justify-between   max-[1023px]:flex-col items-center w-full pt-3"
                style={{ flexWrap: "wrap", gap: "20px" }}
              >
                {bitCoinData?.vin?.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="lg:w-[48%] w-full border-[1px] border-[#D0D0D0] rounded-[10px] p-4"
                    >
                      <div className="flex   justify-between gap-2  mb-2">
                        <p
                          // className=" text-[#2170FF]  max-[1023px]:text-center text-sm font-medium truncate"
                          className=" text-[#2170FF] w-[90%]  text-sm font-medium "
                          style={{ wordWrap: "break-word", cursor: "pointer" }}
                          onClick={() =>
                            onClickHash(item?.prevout.scriptpubkey_address)
                          }
                        >
                          {item?.prevout.scriptpubkey_address}
                        </p>
                        <p className="text-[#000000] text-base font-medium">
                          <FaRegCopy
                            onClick={() =>
                              copyIt(item?.prevout.scriptpubkey_address)
                            }
                          />
                        </p>
                      </div>
                      {/* <div className="flex items-center py-3">
                    <span className="text-[#000]  text-center text-[12px] max-[320px]:text-[12px] font-medium flex items-center border-[.5px] border-[#2170FF] rounded-[5px] overflow-hidden  bg-[#2170FF]">
                      <span className="inline-block pl-[5px] pr-[5px] py-[3px] bg-[#fff] text-main">
                        Multisig
                      </span>
                      <span className="inline-block  bg-[#2170FF] text-white text-sm pl-[5px] pr-[3px]">
                        2/2
                      </span>
                    </span>
                  </div> */}
                      <div className=" flex items-center gap-2">
                        <div className="cicle">
                          <AiOutlineArrowLeft className="text-[#2170FF] text-xl" />
                        </div>
                        <div>
                          <p className="text-[#000] text-[14px] max-[320px]:text-[12px] font-normal">
                            {item?.prevout.value / 100000000} BTC
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="lg:w-[50%] w-full border-[1px] border-[#D0D0D0] rounded-[10px] p-4">
                  <div className="flex   justify-between gap-2 overflow-hidden">
                    <p className=" text-[#2170FF]  max-[1023px]:text-center text-sm font-medium truncate">
                      bc1qx2x5cqhymfcnjtg902ky6{" "}
                      <br className="max-[1023px]:hidden" />
                      u5t5htmt7fvqztdsm028hkrv{" "}
                      <br className="max-[1023px]:hidden" />
                      xcl4t2sjtpd9l
                    </p>
                    <p className="text-[#000000] text-xl font-medium">
                      <FaRegCopy />
                    </p>
                  </div>
                  <div className="flex items-center py-3">
                    <span className="text-[#000]  text-center text-[12px] max-[320px]:text-[12px] font-medium flex items-center border-[.5px] border-[#2170FF] rounded-[5px] overflow-hidden  bg-[#2170FF]">
                      <span className="inline-block pl-[5px] pr-[5px] py-[3px] bg-[#fff] text-main">
                        Multisig
                      </span>
                      <span className="inline-block  bg-[#2170FF] text-white text-sm pl-[5px] pr-[3px]">
                        2/2
                      </span>
                    </span>
                  </div>
                  <div className=" flex items-center gap-2">
                    <div className="cicle">
                      <AiOutlineArrowLeft className="text-[#2170FF] text-xl" />
                    </div>
                    <div>
                      <p className="text-[#000] text-[14px] max-[320px]:text-[12px] font-normal">
                        74.57218117 BTC
                      </p>

                      <p className="text-[#000] text-[14px] max-[320px]:text-[12px] font-normal">
                        2,002,934.20 USD
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </li>
            <li className="bitcoin_cards p-5 ">
              <div className="border-[1px] border-[#D0D0D0] rounded-[5px]">
                <p className="text-[#000] py-2 text-center text-[15px] max-[320px]:text-[12px] font-semibold">
                  Recipients ({bitCoinData?.vout?.length})
                </p>
              </div>
              <div
                className="flex justify-between gap-3 max-[1023px]:flex-col items-center w-full pt-3"
                style={{ flexWrap: "wrap", gap: "20px" }}
              >
                {bitCoinData?.vout?.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="lg:w-[48%] w-full border-[1px] border-[#D0D0D0] rounded-[10px] p-4"
                    >
                      <div className="flex   justify-between gap-2  mb-2">
                        <p
                          style={{ wordWrap: "break-word", cursor: "pointer" }}
                          className=" text-[#2170FF]  w-[90%]  text-sm font-medium "
                          onClick={() =>
                            onClickHash(item?.scriptpubkey_address)
                          }
                        >
                          {item?.scriptpubkey_address}
                        </p>
                        <p className="text-[#000000] text-base font-medium">
                          <FaRegCopy
                            onClick={() => copyIt(item?.scriptpubkey_address)}
                          />
                        </p>
                      </div>
                      {/* <div className="flex items-center gap-3 py-3">
                    <span className="text-[#F9AA4B] border-[1px] border-[#F9AA4B] rounded-[50px] text-[12px] font-medium px-2 py-1">
                      Change
                    </span>
                    <span className="text-[#000]  text-center text-[12px] max-[320px]:text-[12px] font-medium flex items-center border-[.5px] border-[#2170FF] rounded-[5px] overflow-hidden  bg-[#2170FF]">
                      <span className="inline-block pl-[5px] pr-[5px] py-[3px] bg-[#fff] text-main">
                        Multisig
                      </span>
                      <span className="inline-block  bg-[#2170FF] text-white text-sm pl-[5px] pr-[3px]">
                        2/2
                      </span>
                    </span>
                  </div> */}
                      <div className=" flex items-center gap-2">
                        <div className="cicle">
                          <AiOutlineArrowRight className="text-[#2170FF] text-xl" />
                        </div>
                        <div>
                          <p className="text-[#000] text-[14px] max-[320px]:text-[12px] font-normal">
                            {item.value / 100000000} BTC
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* <div className="lg:w-[50%] w-full border-[1px] border-[#D0D0D0] rounded-[10px] p-4">
                  <div className="flex   justify-between gap-2 overflow-hidden">
                    <p className=" text-[#2170FF]  max-[1023px]:text-center text-sm font-medium truncate">
                      bc1qx2x5cqhymfcnjtg902ky6{" "}
                      <br className="max-[1023px]:hidden" />
                      u5t5htmt7fvqztdsm028hkrv{" "}
                      <br className="max-[1023px]:hidden" />
                      xcl4t2sjtpd9l
                    </p>
                    <p className="text-[#000000] text-xl font-medium">
                      <FaRegCopy />
                    </p>
                  </div>
                  <div className="flex items-center py-3">
                    <span className="text-[#000]  text-center text-[12px] max-[320px]:text-[12px] font-medium flex items-center border-[.5px] border-[#2170FF] rounded-[5px] overflow-hidden  bg-[#2170FF]">
                      <span className="inline-block pl-[5px] pr-[5px] py-[3px] bg-[#fff] text-main">
                        Multisig
                      </span>
                      <span className="inline-block  bg-[#2170FF] text-white text-sm pl-[5px] pr-[3px]">
                        2/2
                      </span>
                    </span>
                  </div>
                  <div className=" flex items-center gap-2">
                    <div className="cicle">
                      <AiOutlineArrowRight className="text-[#2170FF] text-xl" />
                    </div>
                    <div>
                      <p className="text-[#000] text-[14px] max-[320px]:text-[12px] font-normal">
                        74.57218117 BTC
                      </p>

                      <p className="text-[#000] text-[14px] max-[320px]:text-[12px] font-normal">
                        2,002,934.20 USD
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </li>
          </ul>
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

export default Transactions;
