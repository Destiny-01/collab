"use client";

import Image from "next/image";
import Pic from "@/assets/logo.png";
import Select from "react-select";
// import "@/app/globals.css";
import { useLayoutEffect, useState } from "react";
import HomeImage from "@/assets/home-image.png";
import Link from "next/link";
import getCurrentUser from "@/utils/getCurrentUser";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { useSession } from "next-auth/react";
import options from "@/data/options";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

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
      <Navbar isWhite />
      <div className="flex min-h-screen items-center gap-[72px] mt-16 mx-32">
        <div>
          <h1 className="text-[56px] text-[#2E2E33] leading-tight font-bold">
            Where diverse minds <br /> unite to solve real problems
          </h1>
          <p className="text-lg my-8 text-gray700">
            Get project recommendations that interests you, build a team that
            complements your skills, break down barriers, build up solutions.
          </p>
          <div className="flex gap-2 items-center">
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
        <Image className="" src={HomeImage} alt="globe" />
      </div>
    </div>
  );
}
