"use client";

import Image from "next/image";
import Pic from "@/assets/logo.png";
import Select from "react-select";
// import "@/app/globals.css";
import { useLayoutEffect, useState } from "react";
import HomeImage from "@/assets/home-image_out.png";
import Link from "next/link";
import getCurrentUser from "@/utils/getCurrentUser";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import options from "@/data/options";
import Loader from "@/components/Loader";

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { data, status } = useSession();
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useLayoutEffect(() => {
    data?.user && router.replace("/dashboard");
  }, [data, router]);

  if (status === "loading") {
    return <Loader isFull />;
  }

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
          <Link href="/auth/login">
            <p className="text-purple500 font-semibold">Login</p>
          </Link>
          <Link href="/auth/signup">
            <button className="bg-purple500 text-white flex items-center gap-1 py-2 px-4 rounded-lg">
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
              value={selectedOption}
              onChange={(newVal) => setSelectedOption(newVal || options[0])}
              options={options}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#F9FAFB",
                  primary: "hsl(0, 0%, 90%)",
                },
                borderRadius: 8,
              })}
              styles={{
                option: (styles) => ({
                  ...styles,
                  color: "#101928",
                }),
                input: (styles) => ({
                  ...styles,
                  width: "375px",
                  padding: "8px",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  color: "#101928",
                  paddingLeft: "8px",
                }),
              }}
            />
            <button
              onClick={() => setShowModal(true)}
              className="bg-purple500 text-white flex items-center gap-1 py-3 px-6 rounded-lg"
            >
              Get Started
            </button>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              selectedCategory={selectedOption}
            />
          </div>
        </div>
        <Image className="w-[80%] mx-auto" src={HomeImage} alt="globe" />
      </div>
    </div>
  );
}
