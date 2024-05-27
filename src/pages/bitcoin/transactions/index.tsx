import { API_CONTROLER } from '@/Utils/apis'
import Transactions from '@/components/Bitcoin/Transactions'
import Head from 'next/head'
import React from 'react'

const Index = (props: any) => {
  return (
    <div>
      <Head>
        <title>Bitcoin Transactions</title>

      </Head>

      <Transactions data={props.data} />
    </div>
  )
}
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
export default Index