import Image from "next/image";
import { Inter } from "next/font/google";
import Home from "@/components/Home";
import { API_CONTROLER } from "@/Utils/apis";

const inter = Inter({ subsets: ["latin"] });

export default function Myapp(props: any) {
  return (
    <>
      <Home data={props.data} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const etheReum = await API_CONTROLER.dashboard.stats({ network: "ethereum" })

    const bitCoinData = await API_CONTROLER.dashboard.stats({ network: "bitcoin" })

    return {
      props: {
        data: {
          bitcoin: bitCoinData.data,
          ethereum: etheReum.data
        },
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
      },
    };
  }


}
