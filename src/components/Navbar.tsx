"use client";
import React, { Fragment, useState } from "react";
import { Bell, Search } from "react-feather";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";

export default function Navbar({ isWhite = false, isLoggedIn = false }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      {isLoggedIn ? (
        <nav className="bg-white sticky top-0 py-3 px-8 flex justify-between items-center w-full">
          <div className="relative min-w-[50%]">
            <input
              type="text"
              className="pl-10 pr-4 w-full text-sm py-2 bg-[#F9FAFB] text-[#475367] border rounded-lg"
              placeholder="Search Projects"
            />
            <div className="absolute focus:outline-none inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
            <button
              onClick={() => setShowModal(true)}
              className="border rounded-lg border-[#D0D5DD] px-4 py-2.5 text-[#344054] bg-transparent font-semibold text-sm"
            >
              Start Project
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
          </div>
        </nav>
      ) : (
        <nav
          className={`flex ${
            isWhite ? "bg-white" : "bg-[#F3F3FA]"
          } items-center px-[72px] py-4 justify-between`}
        >
          <Image src={Pic} alt="logo" height={24} />
          <div className="flex items-center gap-6">
            <Link href="/explore">
              <p className="text-[#101928] font-semibold">Projects</p>
            </Link>
            <Link href="/people">
              <p className="text-[#101928] font-semibold">People</p>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/auth/login">
              <p className="text-[#353799] font-semibold">Login</p>
            </Link>
            <Link href="/auth/signup">
              <button className="bg-[#353799] text-white flex items-center gap-1 py-2 px-4 rounded-lg">
                Get Started
              </button>
            </Link>
          </div>
        </nav>
      )}
    </Fragment>
  );
}
