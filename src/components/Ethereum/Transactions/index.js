import React, { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { convertField } from "../../Field";
import {
  AiFillQuestionCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight
} from "react-icons/ai";
import { Tooltip } from "react-tooltip";
import Eth from "../../../../public/assets/ETH.png";
import Link from "next/link";
import { CiShare1 } from "react-icons/ci";
import Output from "../../../../public/assets/Arrow.png";

import { BsDot } from "react-icons/bs";
import Image from "next/image";
import { API_CONTROLER } from "@/Utils/apis";
import { showHash } from "../NetworkTable";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import TailwindLoader, { TailwindLoader1 } from "@/components/Loader";
import NoData from "@/components/NoData";
import { SeparateByComma } from "@/components/CommonFunctions";
const Transactions = (props) => {
  const [newWorkData, setNewWorkData] = useState({});
  const [showLoader, setshowLoader] = useState(false);
  const [orderData, setorderData] = useState([]);
  const [freeFields, setfreeFields] = useState([]);
  const [throwError, setthrowError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log(props.data.data, "<<<<ethereum data");
    if (props.data.data?.length) {
      setNewWorkData(props.data.data[0]);
      getTableData();
      if (props.data.data[0]?.freeFields) {
        setfreeFields(JSON.parse(props.data.data[0]?.freeFields));
      }
    } else {
      setthrowError(true);
    }
  }, [props.data.data]);
  const getTableData = async () => {
    try {
      const { data } = await API_CONTROLER.table.get();
      setorderData(data.data[0].ethereum);
    } catch (error) {}
  };

  const tabs = [
    {
      title: "General Info",
      key: "general info"
    },
    {
      title: newWorkData?.internalTxs?.length
        ? "Internal Txs (" + newWorkData?.internalTxs?.length + ")"
        : "Internal Txs",
      key: "internal txs"
    },
    {
      title: "Logs (" + newWorkData?.logs?.length + ")",
      key: "logs"
    }
  ];
  const [selectedTab, setSelectedTab] = useState("general info");
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
    const givenTimestamp = isTimestampInMilliseconds(+newWorkData.timestamp); // Example timestamp in milliseconds
    if (givenTimestamp) return givenTimestamp.toUTCString();
    // return (
    //   givenTimestamp.toDateString() + "  " + givenTimestamp.toTimeString()
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
      <section className="lg:pt-[100px]  pt-[100px] pb-[50px] overflow-hidden">
        <div className="container mx-auto px-3">
          <h2 className="md:text-5xl text-3xl max-[330px]:text-2xl max-[1023px]:text-center font-semibold text-[#000]">
            Ethereum transactions
          </h2>
          {/* // */}
          <div className="w-full text-center">
            {showLoader && <TailwindLoader1 />}
          </div>
          <div className="flex w-full justify-between gap-5 max-[1023px]:flex-col py-5">
            <div className="lg:w-[35%] w-full  ">
              <div className="bitcoin_cards p-5">
                <h3 className="text-[25px] max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                  Transaction hash
                </h3>
                <div className="flex  justify-between gap-2 pt-3 ">
                  <p
                    className=" text-[#303030] w-[90%]  text-sm font-medium "
                    style={{ wordWrap: "break-word" }}
                  >
                    {newWorkData?.hash}
                    <br className="max-[1023px]:hidden" />
                    {/* 888d0ee114edc5b8721573974150d39c */}
                  </p>
                  <p className="text-[#000000] text-base font-medium">
                    <FaRegCopy
                      style={{ cursor: "pointer" }}
                      fontSize={21}
                      onClick={() => copyIt(newWorkData?.hash)}
                    />
                  </p>
                </div>

                <div className="flex  items-center justify-between gap-2 pt-5">
                  <h3 className="text-[15px]  text-[#202020] font-semibold">
                    Amount transacted
                  </h3>
                  <p className="max-[340px]:block min-[341px]:hidden text-[#000] text-2xl font-medium">
                    <AiFillQuestionCircle
                      className="text-[#000] cursor-pointe"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-html="The sum of value transferred in transaction"
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
                      data-tooltip-html="The sum of value transferred in transaction"
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
                  {newWorkData?.value / 1000000000000000000} ETH
                </p>
                {newWorkData?.amtTxsUsd && +newWorkData?.amtTxsUsd > -1 && (
                  <p className="text-[#303030] text-[12px] font-medium">
                    {newWorkData?.amtTxsUsd} USD
                  </p>
                )}
                {/* <p className="text-[#303030] text-[12px] font-medium">
                  442,948,480.00 USD
                </p> */}
                <br />
                <div className="flex  items-center justify-between gap-2 ">
                  <h3 className="text-[15px]  text-[#202020] font-semibold">
                    Transaction fee
                  </h3>
                  <p className="max-[340px]:block min-[341px]:hidden text-[#000] text-2xl font-medium">
                    <AiFillQuestionCircle
                      className="text-[#000] cursor-pointe"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-html="Cost paid to process the transaction"
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
                      className="cursor-pointer"
                      data-tooltip-id="my-tooltip-inline"
                      data-tooltip-html="Cost paid to process the transaction"
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
                  {(newWorkData?.gasPrice * newWorkData?.gasUsed) / 10 ** 18}{" "}
                  ETH
                </p>
                {newWorkData?.txsFeeUsd && +newWorkData?.txsFeeUsd > -1 && (
                  <p className="text-[#303030] text-[12px] font-medium">
                    {newWorkData?.txsFeeUsd} USD
                  </p>
                )}
                {/* <p className="text-[#303030] text-[12px] font-medium">
                  2.75 USD
                </p> */}

                <br />
                <div className="">
                  <h3 className="text-[15px]  text-[#202020] font-semibold">
                    {/* 5 days ago
                    {calculateTime()} */}
                    Time
                  </h3>
                  <p className="text-[#303030] text-[12px] font-medium">
                    {calculateTime()}
                  </p>
                </div>
              </div>
              <div className="flex lg:justify-start mt-5 justify-center">
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
            <div className="lg:w-[63%] w-full">
              <div className="flex items-center pb-1 gap-5 overflow-x-auto w-full">
                {tabs.map((tab, index) => {
                  return (
                    <button
                      onClick={() => setSelectedTab(tab.key)}
                      className={`py-5 px-5 px- cursor-pointer  ${
                        tab.key == selectedTab
                          ? "select_box bg-[#FFF] font-semibold text-[14px] max-[320px]:text-[12px] text-[#000]"
                          : "select_box bg-[#F3F3F3] font-medium text-[14px] max-[320px]:text-[12px] text-[#000]"
                      }`}
                      key={index}
                    >
                      {tab.title}
                    </button>
                  );
                })}
              </div>
              {selectedTab == "general info" && (
                <>
                  <div className=" bitcoin_cards p-5">
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                      <Image
                        alt="Eth "
                        src={Eth}
                        className=" w-[75px] max-[330px]:w-[50px]  max-[500px]:w-[70px]"
                      />
                      <div>
                        <p className="text-[#505050] text-[12px] font-normal">
                          Transaction status
                        </p>

                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[20px] max-[500px]:text-lg max-[330px]:text-base text-[#000] font-semibold">
                            Transaction {newWorkData?.confirmations}{" "}
                            Confirmations
                          </h3>
                          <p className="text-[#A0A0A0] text-2xl font-medium">
                            {/* <AiFillQuestionCircle /> */}
                          </p>
                          <div className="">
                            {newWorkData.status == "1" && (
                              <button className="w-full inline-flex text-[12px] justify-center font-bold text-[#fff] bg-[#21BAF7] text-[#000] rounded-[20px] py-[6px] max-[321px]:px-2  px-[8px] focus:outline-none">
                                Confirmed
                              </button>
                            )}
                            {newWorkData.status == "0" && (
                              <button className="w-full inline-flex text-[12px] justify-center font-bold text-[#fff] bg-[#ff4646] text-[#000] rounded-[20px] py-[6px] max-[321px]:px-2  px-[8px] focus:outline-none">
                                Reverted
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-[#303030] text-[12px] font-medium">
                          Block id {newWorkData.blockNumber}
                        </p>
                      </div>
                    </div>
                    {[
                      orderData.map((item, key) => {
                        if (newWorkData.freeFields) {
                          if (["r", "s", "v", "baseFeePerGas"].includes(item))
                            return null;
                        }
                        if (newWorkData[item])
                          return (
                            <div
                              key={key}
                              className="flex flex-wrap items-center gap-1 justify-between my-2"
                            >
                              <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                                {convertField(item)}
                              </p>
                              {(() => {
                                if (item == "gasPrice") {
                                  return (
                                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                                      {/* {newWorkData[item]} */}
                                      {Math.round(
                                        parseFloat(
                                          newWorkData[item] / 10 ** 9
                                        ).toFixed(1)
                                      )}{" "}
                                      Gwei
                                    </p>
                                  );
                                } else if (item == "maxPriorityFeePerGas") {
                                  return (
                                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                                      {parseFloat(
                                        newWorkData[item] / 10 ** 9
                                      ).toFixed(2)}{" "}
                                      Gwei
                                    </p>
                                  );
                                } else if (item == "value") {
                                  if (newWorkData?.internalTxs)
                                    return (
                                      <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                                        {newWorkData?.internalTxs?.reduce(
                                          (total, num) => {
                                            total = +total + +num.value;
                                            return total;
                                          },
                                          0
                                        ) /
                                          10 ** 18}{" "}
                                        ETH
                                      </p>
                                    );
                                  else
                                    return (
                                      <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                                        {" "}
                                        NA
                                      </p>
                                    );
                                } else if (item == "gas" || item == "nonce") {
                                  return (
                                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                                      {SeparateByComma(newWorkData[item])}
                                    </p>
                                  );
                                } else if (item == "baseFeePerGas") {
                                  return (
                                    parseFloat(
                                      newWorkData[item] / 10 ** 9
                                    ).toFixed(2) + " Gwei"
                                  );
                                } else
                                  return (
                                    <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                                      {newWorkData[item]?.length > 20
                                        ? showHash(newWorkData[item])
                                        : newWorkData[item]}
                                    </p>
                                  );
                              })()}
                            </div>
                          );
                      })
                    ]}
                    {/* ddd */}

                    {[
                      freeFields.map((item, key) => {
                        return (
                          <div
                            key={key}
                            className="flex flex-wrap items-center gap-1 justify-between my-2"
                          >
                            <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                              {item.field}
                            </p>

                            <p className="text-[#303030] text-[14px] max-[320px]:text-[12px] font-medium">
                              {item.value}
                            </p>
                          </div>
                        );
                      })
                    ]}
                  </div>
                  <div className=" bitcoin_cards p-5 mt-5">
                    <p className="text-[#000] text-[15px] font-semibold mb-5">
                      Transfers
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                      <div className="flex items-center gap-2">
                        <Image alt="Eth " src={Eth} className=" w-[30px]" />
                        <p className="text-[#000] text-[12px] font-semibold ">
                          Ethereum ETH
                        </p>
                      </div>
                      <div>
                        <p className="text-[#000] text-[14px] font-semibold ">
                          {newWorkData?.value / 10 ** 18} ETH
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 justify-between my-2">
                      <p className="text-[#000] text-[12px] font-medium ">
                        From
                      </p>
                      <p className="sm:flex sm:items-center text-[#303030]  max-[1023px]:text-center text-sm font-medium truncate">
                        <span
                          onClick={() => onClickHash(newWorkData.from)}
                          className="text-[#2170FF] cursor-pointer"
                        >
                          {newWorkData?.from}
                        </span>
                        <FaRegCopy
                          style={{
                            color: "#000",
                            fontSize: "16px",
                            marginLeft: "10px",
                            cursor: "pointer"
                          }}
                          onClick={() => copyIt(newWorkData?.from)}
                        />
                        {/* 888d0ee114edc5b8721573974150d39c */}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 justify-between my-2">
                      <p className="text-[#000] text-[12px] font-medium ">To</p>
                      <p className="sm:flex sm:items-center text-[#303030]  max-[1023px]:text-center text-sm font-medium ">
                        <span
                          onClick={() => onClickHash(newWorkData.to)}
                          className="text-[#2170FF] cursor-pointer"
                        >
                          {newWorkData?.to}
                        </span>
                        <FaRegCopy
                          style={{
                            color: "#000",
                            fontSize: "16px",
                            marginLeft: "10px",
                            cursor: "pointer"
                          }}
                          onClick={() => copyIt(newWorkData?.to)}
                        />
                        {/* 888d0ee114edc5b8721573974150d39c */}
                      </p>
                    </div>

                    {/* 
                    <div className="flex flex-wrap items-center gap-1 justify-between my-2">
                      <p className="text-[#000] text-[12px] font-medium ">To</p>
                 <p className="text-[#000]  text-sm font-medium " style={{wordBreak:"break-word"}}>
                         {newWorkData?.r}
                         <FaRegCopy style={{fontSize:"20px",marginLeft:"10px",cursor:"pointer"}} onClick={()=>copyIt(newWorkData?.r)} />
                      </p>
                    </div> */}
                  </div>
                </>
              )}
              {selectedTab == "logs" && (
                <>
                  {newWorkData?.logs?.length ? (
                    newWorkData?.logs?.map((item, key) => {
                      return (
                        <div className=" bitcoin_cards p-5 mb-3" key={key}>
                          <div>
                            Contract:{" "}
                            <span className="break-w pl-5 text-[#2170FF]">
                              {item?.address}
                            </span>
                          </div>
                          <div className="mt-4">
                            Index:
                            <span className="text-sm ml-2">
                              {item.logIndex}
                            </span>
                          </div>

                          <div className="mt-2">Topics:</div>
                          {item.topics?.map((topic, index) => {
                            return (
                              <div
                                key={index}
                                className="flex flex-wrap items-center mt-1"
                              >
                                <div
                                  className="border rounded-full flex justify-center p-1 items-center text-center w-[20px] h-[20px] bg-gray-200"
                                  style={{
                                    width: "30px !important",
                                    height: "20px"
                                  }}
                                >
                                  {index}
                                </div>{" "}
                                <div className="break-w pl-5  text-sm">
                                  {" "}
                                  {topic}
                                </div>{" "}
                              </div>
                            );
                          })}

                          <div className="mt-4">Data:</div>
                          <p
                            className="border rounded-[10px] text-sm p-4 bg-[#f6f6f6] "
                            style={{ wordBreak: "break-word" }}
                          >
                            {item.data}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center w-full text">
                      <NoData message="No Logs found" />
                    </div>
                  )}
                </>
              )}
              {selectedTab == "internal txs" && (
                <>
                  {newWorkData.internalTxs ? (
                    <div className="flex w-full overflow-auto tableboxs mt-8">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="text-left"> From</th>
                            <th className="text-left"></th>
                            <th className="text-left"> To</th>
                            <th className="text-left">Value </th>
                            <th className="text-left">Gas Limit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newWorkData.internalTxs?.map((item, key) => {
                            return (
                              <tr key={key}>
                                <td
                                  className="bluecolor "
                                  style={{ cursor: "pointer" }}
                                  onClick={() => onClickHash(item.from)}
                                >
                                  {" "}
                                  {showHash(item.from)}
                                </td>
                                <td>
                                  <Image
                                    alt="Output"
                                    src={Output}
                                    className=" w-[20px]"
                                  />
                                </td>
                                <td
                                  className="bluecolor "
                                  style={{ cursor: "pointer" }}
                                  onClick={() => onClickHash(item.to)}
                                >
                                  {showHash(item.to)}
                                </td>
                                <td>
                                  <span className="text-[#198754]">
                                    {item.value / 1000000000000000000}
                                  </span>
                                </td>
                                <td>{item.gas}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center w-full text">
                      <NoData message="No internal txs found" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Transactions;
