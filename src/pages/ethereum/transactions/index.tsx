import { API_CONTROLER } from "@/Utils/apis";
import Transactions from "@/components/Ethereum/Transactions";
import React from "react";

const index = (props: any) => {
  return (
    <div>
      <Transactions data={props.data.data} />
    </div>
  );
};
export async function getServerSideProps(req: any) {

  try {
    const name = req?.query?.transaction
    if (!name) {
      window.location.href = "/"
    }

    const { data } = await API_CONTROLER.txs.txs({ searchItem: name, pageNumber: 1 })
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


export default index;
