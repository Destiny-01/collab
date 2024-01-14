"use client";
import React from "react";
import { Bell, Search } from "react-feather";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="bg-white sticky top-0 py-3 px-8 flex justify-between items-center w-full">
      <div className="relative min-w-[50%]">
        <input
          type="text"
          className="pl-10 pr-4 w-full text-sm py-2 bg-[#F9FAFB] text-[#475367] border rounded-lg"
          placeholder="Search Projects"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search color="#475367" size={20} />
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div className="h-10 w-10 flex justify-center items-center bg-[#F0F2F5] rounded-full">
          <Bell size={20} color="#344054" />
        </div>
        <Image
          className="rounded-full h-10 w-10 border border-white"
          src={Pic}
          height={40}
          width={40}
          alt="avatar"
        />
        <button className="border rounded-lg border-[#D0D5DD] px-4 py-2.5 text-[#344054] bg-transparent font-semibold text-sm">
          Start Project
        </button>
      </div>
    </div>
  );
}
