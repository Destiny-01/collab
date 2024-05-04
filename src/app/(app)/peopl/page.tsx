"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Filter, PlusCircle } from "react-feather";
import Select from "react-select";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import { useGetAllUsers } from "@/hooks/useGetUser";

export default function People() {
  const { data, isLoading } = useGetAllUsers();

  return (
    <div className="px-8 pt-7">
      <div>
        <h2>People</h2>
        <p className="text-[#667185]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="flex gap-4 my-8">
        {/* {isLoading} */}
        <div className="bg-white w-[25%] rounded-[10px]">
          <div className="h-[200px] p-4">
            <Image
              src={Pic}
              alt="banner"
              className="h-full w-full rounded-[10px] object-cover object-top overflow-hidden"
            />
          </div>
          <div className="p-4 pt-0">
            <h6>John Dalton</h6>
            <p className="text-[#667185] text-xs">
              Senior Product Designer{" "}
              <span className="text-black">&#x2022;</span> Nigeria
            </p>
            <div className="flex gap-2 my-3">
              <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
                <p className="text-[#232566] text-xs font-medium">Technology</p>
              </div>
              <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
                <p className="text-[#232566] text-xs font-medium">Design</p>
              </div>
            </div>
            <div className="flex mt-4 pt-4 justify-between border-t border-[#F0F2F5] items-center">
              <p className="text-xs font-medium">50 Projects</p>
              <p className="text-[#04802E] text-xs font-medium">95% Match</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-[25%] rounded-[10px]">
          <div className="h-[200px] p-4">
            <Image
              src={Pic}
              alt="banner"
              className="h-full w-full rounded-[10px] object-cover object-top overflow-hidden"
            />
          </div>
          <div className="p-4 pt-0">
            <h6>John Dalton</h6>
            <p className="text-[#667185] text-xs">
              Senior Product Designer{" "}
              <span className="text-black">&#x2022;</span> Nigeria
            </p>
            <div className="flex gap-2 my-3">
              <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
                <p className="text-[#232566] text-xs font-medium">Technology</p>
              </div>
              <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
                <p className="text-[#232566] text-xs font-medium">Design</p>
              </div>
            </div>
            <div className="flex mt-4 pt-4 justify-between border-t border-[#F0F2F5] items-center">
              <p className="text-xs font-medium">50 Projects</p>
              <p className="text-[#04802E] text-xs font-medium">95% Match</p>
            </div>
          </div>
        </div>
        <div className="bg-white w-[25%] rounded-[10px]">
          <div className="h-[200px] p-4">
            <Image
              src={Pic}
              alt="banner"
              className="h-full w-full rounded-[10px] object-cover object-top overflow-hidden"
            />
          </div>
          <div className="p-4 pt-0">
            <h6>John Dalton</h6>
            <p className="text-[#667185] text-xs">
              Senior Product Designer{" "}
              <span className="text-black">&#x2022;</span> Nigeria
            </p>
            <div className="flex gap-2 my-3">
              <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
                <p className="text-[#232566] text-xs font-medium">Technology</p>
              </div>
              <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
                <p className="text-[#232566] text-xs font-medium">Design</p>
              </div>
            </div>
            <div className="flex mt-4 pt-4 justify-between border-t border-[#F0F2F5] items-center">
              <p className="text-xs font-medium">50 Projects</p>
              <p className="text-[#04802E] text-xs font-medium">95% Match</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
