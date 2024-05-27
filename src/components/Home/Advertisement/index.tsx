import React from "react";
import Art from "../../../../public/assets/Art.png";
import Image from "next/image";
const Advertisement = () => {
  return (
    <>
      <section className="lg:py-[100px] py-[50px]">
        <div className="container mx-auto px-3">
          <div className="pt-2">
            <button className="w-full inline-flex text-[30px] max-[330px]:text-2xl justify-center font-semibold text-[#fff] btn-color  py-8 max-[321px]:px-2  px-[20px] focus:outline-none">
              Advertisement
            </button>
          </div>
        </div>
      </section>
      <section className="bg-[#000] lg:py-[100px] py-[50px]">
        <div className="container mx-auto px-3">
          <div className="flex flex-col lg:flex-row  items-center lg:gap-5 min-[1280px]:gap-[4rem] py-5 justify-between ">
            <div className=" w-full lg:w-[60%]">
              <h3 className="text-3xl max-[330px]:text-2xl text-[#fff] font-bold">
                We specialize in creating products that grant accessible
                blockchain data to individuals, development teams, and research
                organizations.
              </h3>
              <p className="text-base text-[#A0A0A0] font-normal py-5 ">
                Blockchain, the pioneering blockchain explorer, integrates
                numerous blockchains into a unified search engine. Our ongoing
                mission is to make blockchain data easily comprehensible and
                accessible to a diverse audience interested in blockchain and
                cryptocurrency, all while prioritizing the privacy and security
                of our users in product development.
              </p>
              <p className="text-base text-[#A0A0A0] font-normal">
                In our commitment to this mission, we continuously innovate to
                provide valuable insights and tools that cater to the needs of
                individuals, development teams, and research organizations. Our
                goal is to enable informed decision-making, foster blockchain
                development, and support ground-breaking research within this
                rapidly evolving ecosystem. We aim to be at the forefront of
                blockchain accessibility, driving forward the democratization of
                this technology for the benefit of all.
              </p>
              <div className="pt-5">
                <button className=" inline-flex text-[20px] max-[330px]:text-base justify-center font-semibold text-[#fff] bg-[#A42EFF]  rounded-[5px] py-[8px] max-[321px]:px-2  px-[20px] focus:outline-none">
                  Know More
                </button>
              </div>
            </div>
            <div className="w-full lg:w-[40%]">
              <Image alt="Art" src={Art} className=" w-full" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Advertisement;
