"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import Bubble from "@/assets/bubble.png";
import Image from "next/image";
import Select from "react-select";
import { Filter, Search } from "react-feather";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import Modal from "@/components/Modal";

export default function Project() {
  const options = [
    { value: "design", label: "Design" },
    { value: "software_development", label: "Software Development" },
    { value: "science", label: "Science/Tech" },
    { value: "human_rights", label: "Human Rights" },
    { value: "education", label: "Education" },
    { value: "business", label: "Business" },
    { value: "media", label: "Media" },
    { value: "environment", label: "Environment" },
    { value: "sociology", label: "Sociology" },
  ];
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className="bg-white min-h-screen">
      <Navbar isWhite={true} />
      <div className="max-w-[70%] mt-12 mx-auto">
        <div>
          <h2>Explore Projects</h2>
          <p className="text-[#667185]">Projects you might be interested in</p>
        </div>
        <div className="bg-gradient-to-br my-8 to-[#7477D2] relative rounded-xl px-6 py-7 from-[#4F52B1]">
          <h2 className="text-white">Need Something fresh?</h2>
          <p className="max-w-[45%] text-white mb-3 text-base leading-normal">
            Get a brand new real-world problem with advanced AI recommendation
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-white font-medium rounded-lg text-[#353799] px-6 py-3.5"
          >
            Generate Projects
          </button>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            category={selectedOption}
          />
          <Image
            src={Bubble}
            alt="bubble"
            className="z-10 absolute top-0 bottom-0 right-0"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="relative min-w-[40%]">
            <input
              type="text"
              className="pl-10 pr-4 w-full focus:outline-none text-sm py-2 bg-[#F9FAFB] text-[#475367] border rounded-lg"
              placeholder="Search Projects"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search color="#475367" size={20} />
            </div>
          </div>
          <div className="flex">
            <Select
              defaultValue={options[0]}
              onChange={(newVal) => setSelectedOption(newVal || options[0])}
              options={options}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#F9FAFB",
                  primary: "white",
                },
                borderRadius: 8,
              })}
              styles={{
                option: (styles) => ({
                  ...styles,
                  color: "#98A2B3",
                }),
                input: (styles) => ({
                  ...styles,
                  width: "200px",
                  padding: "3px",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  color: "#98A2B3",
                  paddingLeft: "3px",
                }),
              }}
            />
            <button className="ml-4 border rounded-lg flex gap-1 items-center border-[#5758AA] px-3 py-2 text-[#5758AA] bg-transparent font-semibold text-sm">
              <Filter color="#5758AA" size={20} /> Filter
            </button>
          </div>
        </div>
        <div className="flex gap-4 py-8">
          <div className="w-[33%]">
            <div className="h-[200px]">
              <Image
                src={Pic}
                alt="banner"
                className="h-full w-full rounded-t-[10px] object-cover object-top overflow-hidden"
              />
            </div>
            <div className="bg-white p-4 rounded-b-[10px]">
              <p className="text-xs text-[#667185]">Finance</p>
              <h2>United Capital Money Market Fund</h2>
              <p className="text-[#667185]">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem at
                provident fugit atque esse quas unde molestias natus repudiandae
                commodi!
              </p>
              <div className="flex mt-2 pt-2 justify-between border-t border-[#F0F2F5] items-center">
                <div className="flex">
                  <Image
                    className="rounded-full h-10 w-10 border border-white"
                    src={Pic}
                    height={40}
                    width={40}
                    alt="avatar"
                  />
                  <Image
                    className="rounded-full h-10 w-10 border border-white -ml-3"
                    src={Pic}
                    height={40}
                    width={40}
                    alt="avatar"
                  />
                  <Image
                    className="rounded-full h-10 w-10 border border-white -ml-3"
                    src={Pic}
                    height={40}
                    width={40}
                    alt="avatar"
                  />
                </div>
                <p>50 Upvotes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
