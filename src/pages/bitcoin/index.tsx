import { API_CONTROLER } from "@/Utils/apis";
import Bitcoin from "@/components/Bitcoin";
import Head from "next/head";
import React from "react";
import { toast } from "react-toastify";

const index = (props: any) => {
  if (!props.data.success) toast.error(props.data.message)
  return (
    <div>
      <Head>
        <title>Bitcoin</title>

      </Head>
      <Bitcoin data={props.data} />
    </div>
  );
};

export async function getServerSideProps(req: any) {

  try {
    const { data } = await API_CONTROLER.dashboard.stats({ network: "bitcoin" })
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
