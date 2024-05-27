import { API_CONTROLER } from "@/Utils/apis";
import Ethereum from "@/components/Ethereum";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Index = (props: any) => {


  return (
    <div>
      <Ethereum data={props.data} />
    </div>
  );
};
export async function getServerSideProps(req: any) {

  try {

    const { data } = await API_CONTROLER.dashboard.stats({ network: "ethereum" })
    return {
      props: {
        data: data
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

export default Index;
