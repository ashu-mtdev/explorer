import { API_CONTROLER } from '@/Utils/apis'
import Table from '@/components/Bitcoin/Tables'
import NoData from '@/components/NoData'
import Head from 'next/head'
import React from 'react'

const index = (data: any) => {
  const { message } = data.data
  return (
    <div>
      <Head>
        <title>Bitcoin Address Table</title>

      </Head>

      {message == "Data cannot be found for invalid address" ?
        <div className="h-[70vh] flex justify-center items-center">
          <NoData message="Invalid Transaction Id" home={true} />
        </div>
        : <Table data={data} />}
    </div>
  )
}
export async function getServerSideProps(req: any) {

  try {
    const name = req?.query?.address
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
export default index