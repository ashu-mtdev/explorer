import Link from "next/link";
import React from "react";

function NoData({ message = "No Data Found", home = false }) {
  return (
    <section className="lg:py-[100px]    pt-[100px] pb-[50px] overflow-hidden ">
      <div className="w-full text-lg text-center">
        {message}
        <br />
        {home &&
          <Link href="/" className="text-[#a42eff]">
            Go To Home
          </Link>}
      </div>
    </section>
  );
}

export default NoData;
