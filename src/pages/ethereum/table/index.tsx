import { API_CONTROLER } from '@/Utils/apis'
import NetworkTable from '@/components/Ethereum/NetworkTable'
import NoData from '@/components/NoData'
import Head from 'next/head'
import React from 'react'

const Index = ({ data }: any) => {
  const { message } = data.data
  return (
    <div>
      <Head>
        <title>Ethereum Address Table</title>

      </Head>
      <NetworkTable data={data} />

    </div>
  )
}
export async function getServerSideProps(req: any) {

  try {
    const name = req?.query?.address
    const pageNumber = req?.query?.pageNumber || 1
    if (!name) {
      window.location.href = "/"
    }

    const { data } = await API_CONTROLER.txs.txs({ searchItem: name, pageNumber })
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
export default Index