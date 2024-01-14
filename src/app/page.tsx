"use client";

import Image from "next/image";
import Pic from "@/assets/logo.png";
import Select from "react-select";
import { useState } from "react";
import HomeImage from "@/assets/home-image_out.png";
import Link from "next/link";

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const options = [
    { value: "all", label: "All Categories" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  // const session = await getServerSession(authOptions);
  // console.log(session);
  return (
    <div className="bg-white">
      <nav className="flex bg-[#F3F3FA] items-center px-[72px] py-4 justify-between">
        <Image src={Pic} alt="logo" height={24} />
        <div className="flex items-center gap-6">
          <Link href="/projects">
            <p className="text-[#101928] font-semibold">Projects</p>
          </Link>
          <Link href="/people">
            <p className="text-[#101928] font-semibold">People</p>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login">
            <p className="text-[#353799] font-semibold">Login</p>
          </Link>
          <Link href="/signup">
            <button className="bg-[#353799] text-white flex items-center gap-1 py-2 px-4 rounded-lg">
              Get Started
            </button>
          </Link>
        </div>
      </nav>
      <div className="bg-home-gradient pt-16">
        <div className="max-w-[70%] mb-8 mx-auto">
          <h1 className="text-[64px] text-[#2E2E33] leading-tight text-center font-bold">
            Where diverse minds <br /> unite to solve real problems
          </h1>
          <p className="text-2xl my-8 text-[#3E3E42] text-center">
            Join hands across races and fields of expertise. Let AI match you
            with a team that complements your skills. Break down barriers, build
            up solutions.
          </p>
          <div className="flex gap-2 justify-center items-center">
            <Select
              defaultValue={options[0]}
              onChange={setSelectedOption as any}
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
                  width: "375px",
                  padding: "8px",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  color: "#98A2B3",
                  paddingLeft: "8px",
                }),
              }}
            />
            <button className="bg-[#353799] text-white flex items-center gap-1 py-3 px-6 rounded-lg">
              Get Started
            </button>
          </div>
        </div>
        <Image className="w-[80%] mx-auto" src={HomeImage} alt="globe" />
      </div>
    </div>
  );
}
