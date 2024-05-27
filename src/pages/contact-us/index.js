import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FaLinkedinIn,
  FaTelegramPlane,
  FaTwitter,
  FaGithub
} from "react-icons/fa";
import { SITE_DATA } from "../../components/Field";
import Link from "next/link";

function Index() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    description: ""
  });
  const handleChange = e => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  const onSubmit = e => {
    e.preventDefault();
    const { name, email, description } = formData;
    if (!email || !name || !description)
      return toast.error("All fields are required");
  };
  const ShowCard = ({ Icon, text = "text", link }) => {
    return (
      <div className="border shadow-lg rounded-full w-32 h-32 p-3 flex-col  flex items-center justify-center text-center ">
        <Link href={link} target="_blank">
          {Icon}
        </Link>
        {/* </div> */}
        <Link href={link} target="_blank">
          <div className="w-full mt-1 text-[1.2rem] text-center">
            {text}
          </div>
        </Link>
      </div>
    );
  };
  return (
    <div className="lg:py-[100px]  pt-[100px] pb-[50px] overflow-hidden ">
      <div className="container mx-auto px-[2rem] py-[3rem] md:w-6/12 text-[1rem] border rounded-md shadow-lg">
        <h1 className="text-[1.5rem] text-center font-semibold">Contact Us</h1>
        <p className="my-[3rem] text-[1.2rem] text-wrap break-normal">
          We value your feedback and inquiries. Whether you have questions about
          our services, need assistance, or want to share your thoughts, we're
          here to help. Feel free to reach out to us using the form below. Your
          messages are important to us, and we aim to respond promptly. Thank
          you for getting in touch!
        </p>
        <div className="flex gap-3 flex-wrap justify-around mt-[5rem]">
          <ShowCard
            Icon={<FaTwitter fontSize="3rem" color="#26a7de " />}
            text="Twitter"
            link={SITE_DATA.twitter}
          />
          <ShowCard
            Icon={<FaGithub fontSize="3rem" color="#2b3137" />}
            text="Github"
            link={SITE_DATA.github}
          />
          <ShowCard
            Icon={<FaLinkedinIn fontSize="3rem" color="#0072b1 " />}
            text="Linkedin"
            link={SITE_DATA.linkedin}
          />
          <ShowCard
            Icon={<FaTelegramPlane fontSize="3rem" color="#0088cc " />}
            text="Telegram"
            link={SITE_DATA.telegram}
          />
        </div>
        {/* <form onSubmit={onSubmit}> */}

        {/* <div className="flex flex-col gap-y-[1rem] mx-auto">
            <h1 className="text-[1.5rem] text-center font-semibold">
              Contact Us
            </h1>

            <div>
              <label>Name</label>
              <input
                className="w-full border py-2 px-2 text-[1.2rem]"
                name="name"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                className="w-full border py-2 px-2 text-[1.2rem]"
                name="email"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                className="w-full border py-2 px-2 text-[1.2rem] max-h-[6rem]"
                name="description"
                type="text"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="border mt-6 w-full bg-black text-white rounded-lg p-3"
            >
              Submit
            </button>
          </div> */}
        {/* </form> */}
      </div>
    </div>
  );
}

export default Index;
