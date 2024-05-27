import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import Eth from "../../../../public/assets/ETH.png";
import Image from "next/image";
import { BsDot } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { FaRegCopy } from "react-icons/fa";
import NoData from "../../../components/NoData"
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { toast } from "react-toastify";
import TailwindLoader, { TailwindLoader1 } from "@/components/Loader";
import { API_CONTROLER } from "@/Utils/apis";
const Tables = ({ data }: any) => {
  const tableData = data?.data?.data?.result
  const [showLoader, setshowLoader] = useState(false)
  const router = useRouter()
  const query = router.query
  const pageNumber = query.pageNumber || 1
  //  const [pageNumber, setpageNumber] = useState(1)
  useEffect(() => {

    setshowLoader(false)
  }, [tableData])

  useEffect(() => {

    if (data.message == "Data cannot be found for invalid address") toast.error(data.message)
  }, [data.message])


  const getTime = (t: Date) => {
    const da = new Date(+t * 1000)
    return da.toUTCString()
  }
  const copyIt = () => {
    navigator.clipboard.writeText(`${query.address}`)
    toast.success("Copied")
  }
  const changePage = (act: String) => {

    if (act == "PREV") {
      setshowLoader(true)
      router.push(router.pathname + "?address=" + query.address + "&pageNumber=" + (+pageNumber - 1))
    }
    if (act == "NEXT") {
      setshowLoader(true)
      router.push(router.pathname + "?address=" + query.address + "&pageNumber=" + (+pageNumber + 1))
      // setshowLoader(false)

    }
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
  }
  if (data.message != "Data cannot be found for invalid address") {
    // alert("<<<data at network")

    return (
      <>
        <section className="lg:py-[100px]  pt-[100px] pb-[50px] overflow-hidden">
          <div className="container mx-auto px-3">

            <div className="flex items-center gap-2">
              <Image alt="Ethereum" src={Eth} className=" w-[50px]  " />
              <h2 className="md:text-[30px] text-3xl  max-[438px]:text-2xl max-[365px]:text-[22px]  max-[340px]:text-[17px]  max-[1023px]:text-center font-semibold text-[#000]">
                Ethereum Transactions
              </h2>
            </div>
            <p className=" text-[#303030]  max-[1023px]:text-center text-sm font-medium truncate flex  items-center mt-2">Address:
              <span className="ml-2  truncate ">{query?.address}</span>
              <FaRegCopy cursor="pointer" onClick={copyIt} className="text-[#000] ml-2 text-base" />
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
                    <th className="text-left">Time (UTC)</th>
                    <th className="text-left">Failed?</th>
                    <th className="text-left">Sender</th>
                    <th className="text-left">Recipient</th>
                    <th className="text-left">Internal Value (ETH)</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData?.map((item: any, key: any) => {
                    return <tr key={key}>
                      <td className="bluecolor" style={{ cursor: "pointer" }} onClick={() => onClickHash(item.hash)}>{showHash(item?.hash)}</td>
                      <td className="bluecolor">{item?.blockNumber}</td>
                      <td>{getTime(item.timeStamp)}</td>
                      <td><span className="text-[#198754]">{item?.isError == 0 ? "No" : "Yes"}</span></td>
                      <td onClick={() => onClickHash(item.from)} className="bluecolor cursor-pointer">{showHash(item?.from)}</td>
                      <td onClick={() => onClickHash(item.to)} className="bluecolor cursor-pointer">{showHash(item?.to)}</td>
                      <td>{item?.value / 10 ** 18}</td>
                    </tr>
                  })}

                </tbody>
              </table>
            </div>
            <div className="flex w-full max-[1023px]:flex-col  justify-between mt-8">
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
                {+pageNumber > 1 && <div onClick={() => changePage("PREV")} style={{ cursor: "pointer" }} ><MdArrowBackIosNew /></div>}
                <div className="active">{pageNumber}</div>


                {tableData.length == 10 && <div style={{ cursor: "pointer" }} onClick={() => changePage("NEXT")}><MdArrowForwardIos /></div>}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else return <div className="h-[70vh] flex justify-center items-center">
    <NoData message="Invalid Address " home={true} />
  </div>
}

export default Tables;
export const showHash = (inputString: String) => {
  if (inputString?.length < 8) {
    return inputString; // Cannot mask if string is too short
  }

  // Get the first four characters and the last three characters
  var prefix = inputString.substring(0, 7);
  var suffix = inputString.substring(inputString.length - 7);

  // Create a masked string with dots in between
  var maskedString = prefix + "...." + suffix;
  return maskedString;
}