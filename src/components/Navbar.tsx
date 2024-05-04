"use client";
import React, { useState } from "react";
import { Bell, LogOut, Menu, Plus, Search } from "react-feather";
import Pic from "@/assets/logo.png";
import Picc from "@/assets/avatar.jpeg";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import useResponsive from "@/hooks/useResponsive";
import Logo from "@/assets/LogoText.png";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar({
  isWhite = false,
  isLoggedIn = false,
  setIsOpen,
}: any) {
  const user = useCurrentUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { isMobile } = useResponsive();

  return isLoggedIn ? (
    isMobile ? (
      <nav className="bg-white border-b border-[#E4E7EC] sticky top-0 z-10 p-4 flex justify-between items-center w-full">
        <Link href="/dashboard">
          <Image src={Logo} height={28} alt="logo" />
        </Link>
        <div className="flex items-center gap-4">
          <Search color="#344054" size={20} />
          <Link href="/projects/new">
            <Plus color="#344054" size={20} />
          </Link>
          <div
            className="cursor-pointer"
            onClick={() =>
              signOut({
                redirect: false,
              }).then(() => router.push("/"))
            }
          >
            <LogOut size={20} color="#344054" />
          </div>
          <Menu onClick={() => setIsOpen(true)} color="#344054" size={20} />
        </div>
      </nav>
    ) : (
      <nav className="bg-white border-b border-[#E4E7EC] sticky top-0 z-10 py-3 px-8 flex justify-between items-center w-full">
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
          <div
            className="cursor-pointer"
            onClick={() =>
              signOut({
                redirect: false,
              }).then(() => router.push("/"))
            }
          >
            <LogOut size={20} color="#344054" />
          </div>
          <Link href="/profile">
            <Image
              className="rounded-full h-10 w-10 border border-white"
              src={user?.avatar || Picc}
              height={40}
              width={40}
              alt="avatar"
            />
          </Link>
          <Link href="/projects">
            {" "}
            <button
              onClick={() => setShowModal(true)}
              className="border rounded-lg border-[#D0D5DD] px-3 py-2 text-[#344054] bg-transparent font-semibold text-sm"
            >
              Start Project
            </button>
          </Link>
          <Modal showModal={showModal} setShowModal={setShowModal} />
        </div>
      </nav>
    )
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
          <p className="text-purple500 font-semibold">Login</p>
        </Link>
        <Link href="/auth/signup">
          <button className="bg-purple500 text-white flex items-center gap-1 py-2 px-4 rounded-lg">
            Get Started
          </button>
        </Link>
      </div>
    </nav>
  );
}
