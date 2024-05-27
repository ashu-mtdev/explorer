import React from "react";
import Advertisement from "./Advertisement";
import Explorerblockchains from "./Explorerblockchains";
import Herosection from "./Herosection/index.js";
import { API_CONTROLER } from "@/Utils/apis";

const Home = (props: any) => {

  return (
    <>
      <div className="overflow-hidden">
        <Herosection />
        <Explorerblockchains data={props.data} />
        <Advertisement />
      </div>
      ;
    </>
  );
};


export default Home;
