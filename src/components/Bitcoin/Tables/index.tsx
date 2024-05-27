import { API_CONTROLER } from "@/Utils/apis";
import TailwindLoader, { TailwindLoader1 } from "@/components/Loader";
import Link from "next/link";
import Image from "next/image";
import Btc from "../../../../public/assets/BTC.svg";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { toast } from "react-toastify";
const Tables = ({ data }: any) => {
  const [showLoader, setshowLoader] = useState(false)
  const tableData = data.data.data.data
  const [showPagedData, setShowPagedData] = useState([])
  const [pageNumber, setpageNumber] = useState(1)
  const router = useRouter()
  const { query } = useRouter()

  interface Item {
    "txid": String,
    "version": Number,
    "locktime": Number,
    // "vin": [
    //     {
    //         "txid": "b5783db2bae0af430fad375d1f6ecc49d390fa3af1079b1ce630920f9708c7db",
    //         "vout": 1,
    //         "prevout": {
    //             "scriptpubkey": "76a914d939982a722de1b3807d5527c430f15455bc22c788ac",
    //             "scriptpubkey_asm": "OP_DUP OP_HASH160 OP_PUSHBYTES_20 d939982a722de1b3807d5527c430f15455bc22c7 OP_EQUALVERIFY OP_CHECKSIG",
    //             "scriptpubkey_type": "p2pkh",
    //             "scriptpubkey_address": "1LoadMewf3YfGDQwwvNqsqiL3irVLYXVAh",
    //             "value": 136010
    //         },
    //         "scriptsig": "483045022100de6e1c99db90a432820aeb73b624b6ee37a072876c85c8cf09263eaf10a6816f022053f9ba4e9274728b43bef2ca254789174ccc9c1116e4f7dfcbf4c592a06e6adc014104354b84ddb18f59c46c10a20e32e1e5c41bd38fa24ad2cea1ca54703f43272d8174296b1058b200820b8bfe8ec4376b72ba1aeb1f6d320083a7e4f2067b73a798",
    //         "scriptsig_asm": "OP_PUSHBYTES_72 3045022100de6e1c99db90a432820aeb73b624b6ee37a072876c85c8cf09263eaf10a6816f022053f9ba4e9274728b43bef2ca254789174ccc9c1116e4f7dfcbf4c592a06e6adc01 OP_PUSHBYTES_65 04354b84ddb18f59c46c10a20e32e1e5c41bd38fa24ad2cea1ca54703f43272d8174296b1058b200820b8bfe8ec4376b72ba1aeb1f6d320083a7e4f2067b73a798",
    //         "is_coinbase": false,
    //         "sequence": 4294967295
    //     }
    // ],
    // "vout": [
    //     {
    //         "scriptpubkey": "0014e8b1bf6a27a1e76929b229f595f64cd381c87d87",
    //         "scriptpubkey_asm": "OP_0 OP_PUSHBYTES_20 e8b1bf6a27a1e76929b229f595f64cd381c87d87",
    //         "scriptpubkey_type": "v0_p2wpkh",
    //         "scriptpubkey_address": "bc1qazcm763858nkj2dj986etajv6wquslv8uxwczt",
    //         "value": 129482
    //     }
    // ],
    "size": Number,
    "weight": Number,
    "fee": Number,
    "status": {
      "confirmed": Boolean,
      "block_height": Number,
      "block_hash": String,
      "block_time": EpochTimeStamp
    }
  }
  const updatePagedData = useCallback(() => {
    const itemsPerPage = 10;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setShowPagedData(tableData.slice(startIndex, endIndex));
  }, [pageNumber, tableData]);

  useEffect(() => {

    updatePagedData()

  }, [pageNumber, tableData, updatePagedData])



  function showHash(inputString: String) {
    if (inputString?.length < 8) {
      return inputString; // Cannot mask if string is too short
    }

    // Get the first four characters and the last three characters
    var prefix = inputString?.substring(0, 4);
    var suffix = inputString?.substring(inputString?.length - 3);

    // Create a masked string with dots in between
    var maskedString = prefix + "...." + suffix;
    return maskedString;
  }
  const getTime = (t: Date) => {
    const da = new Date(+t * 1000)
    return da.toUTCString()
  }
  const copyIt = () => {
    navigator.clipboard.writeText(`${query.address}`)
    toast.success("Copied")
  }
  const onClickHash = async (searchTerm: any) => {

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

  return (
    <>
      <section className="lg:py-[100px]  pt-[100px] pb-[50px] overflow-hidden">
        <div className="container mx-auto px-3">
          <div className="flex items-center gap-2">
            <Image alt="Bitcoin" src={Btc} className=" w-[50px]  " />
            <h2 className="md:text-[30px] text-3xl max-[390px]:text-2xl max-[330px]:text-lg max-[1023px]:text-center font-semibold text-[#000]">
              Bitcoin Transactions
            </h2>
          </div>

          <p className=" text-[#303030]  max-[1023px]:text-center text-sm font-medium truncate flex align-center mt-2">Address: <span className="ml-2 ">{query.address}</span>


            <FaRegCopy className="text-[#000] ml-2 text-base cursor-pointer" onClick={copyIt} />

          </p>


          <div className="w-full text-center">
            {showLoader && <TailwindLoader1 />}
          </div>
          <div className="flex w-full overflow-auto tableboxs mt-8">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Hash</th>
                  <th className="text-left">Block</th>
                  <th className="text-left">Input Count</th>
                  <th className="text-left">Output Count</th>
                  <th className="text-left">Time (UTC)</th>
                  <th className="text-left">Output (BTC)</th>
                  <th className="text-left">Tx Fee (BTC)</th>
                </tr>
              </thead>
              <tbody>
                {showPagedData?.map((item: any, key: Number) => {
                  return <tr key={item.txid}>
                    <td className="bluecolor " style={{ cursor: "pointer" }} onClick={() => onClickHash(item.txid)}>{showHash(item?.txid)}</td>

                    <td className="bluecolor">{item?.status?.block_height}</td>
                    <td>{item?.vin?.length}</td>
                    <td>{item?.vout?.length}</td>
                    <td>{getTime(item?.status?.block_time)}</td>
                    <td>{item?.vout[0]?.value / 10 ** 8} BTC</td>
                    <td>{item?.fee / 100000000} BTC</td>
                  </tr>
                })}


              </tbody>
            </table>
          </div>
          <div className="flex w-full max-[1023px]:flex-col justify-between mt-8">
            <div className="lg:w-[29%] w-full flex flex-col">
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
            <div className="pagination">
              <div><MdArrowBackIosNew /></div>
              {Array.from({ length: Math.ceil(tableData.length / 10) }, (_, index) => index + 1).map((item) => {
                return <div key={item} onClick={() => setpageNumber(item)} className={pageNumber == item ? "active" : ""}>{item}</div>
              })}

              <div><MdArrowForwardIos /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tables;
