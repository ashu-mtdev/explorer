import React, { useState } from "react";
import Accordian from "../../components/Accordian";
import { FAQ_DATA, SITE_DATA } from "../../components/Field";

function Index() {
  return (
    <section className="lg:py-[100px]  pt-[100px] pb-[50px] overflow-hidden">
      <div className="container mx-auto px-3 md:w-3/4 lg:w-3/5 w-[85%]">
        <h1 className="text-[2rem]">Frequently Asked Questions</h1>
        <p>
          We frequently receive inquiries regarding slow or malfunctioning
          transactions. Below, you'll find responses to the most commonly asked
          questions, along with direct steps you can take. Please note that
          Blockchair exclusively offers blockchain search and analytics
          services; therefore, we are unable to assist you with your payment
          issues.
        </p>
        <p className="mt-4">
          {SITE_DATA.name} solely offers blockchain search and analytics
          services, and thus, we are unable to assist you with any
          payment-related concerns.
        </p>
        <br />
        <div className="mt-5">
          {FAQ_DATA.map((item, key) => {
            return (
              <div className="my-0 borderr-b-2" key={item.index}>
                <Accordian item={item} key={item.index} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Index;
