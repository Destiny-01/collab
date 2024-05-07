"use client";
import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  Lock,
  LogOut,
  Menu,
  Plus,
  Search,
} from "react-feather";
import Picc from "@/assets/avatar.jpeg";
import UsFlag from "@/assets/us-flag.png";
import Image from "next/image";
import Link from "next/link";
import useResponsive from "@/hooks/useResponsive";
import Logo from "@/assets/LogoText.png";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Navbar({ isWhite = false, isOpen, setIsOpen }: any) {
  const user = useCurrentUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search_query = searchParams.get("search_query");
  const [search, setSearch] = useState(search_query);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isMobile } = useResponsive();

  const languages = [
    { name: "French", shortName: "Fre" },
    { name: "Spanish", shortName: "Esp" },
    { name: "Hindi", shortName: "हिन्" },
    { name: "Arabic", shortName: "عرب" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    router.push("/explore?search_query=" + e.target.value);
  };

  return user ? (
    isMobile ? (
      <nav className="bg-white border-b border-[#E4E7EC] sticky top-0 z-10 p-4 flex justify-between items-center w-full">
        <Link href="/dashboard">
          <Image src={Logo} height={28} alt="logo" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/explore">
            <Search color="#344054" size={20} />
          </Link>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-1 py-1 cursor-pointer relative flex justify-center items-center bg-[#F0F2F5] rounded-3xl"
          >
            <div className="h-4 w-4 overflow-hidden">
              <Image
                src={UsFlag}
                height="0"
                width="0"
                className="rounded-full h-full w-full object-cover"
                alt="flag"
              />
            </div>
            {isDropdownOpen && (
              <div className="absolute cursor-default bottom-8 rounded-lg bg-white p-4">
                {languages.map((language, i) => (
                  <div className="flex gap-2 py-2" key={i}>
                    <Lock size={20} color="#344054" />
                    <p>{language.shortName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
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
            onChange={handleChange}
            value={search ?? ""}
          />
          <div className="absolute focus:outline-none inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search color="#475367" size={20} />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="px-2 py-1 relative cursor-pointer flex justify-center items-center bg-[#F0F2F5] rounded-3xl"
          >
            <div className="h-4 w-4 overflow-hidden">
              <Image
                src={UsFlag}
                height="0"
                width="0"
                className="rounded-full h-full w-full object-cover"
                alt="flag"
              />
            </div>
            <p className="text-gray700 text-sm ml-2">Eng</p>
            {isDropdownOpen && (
              <div className="absolute cursor-default top-12 left-8 rounded-lg bg-white p-4">
                {languages.map((language, i) => (
                  <div
                    className="flex gap-2 items-center py-2 opacity-60"
                    key={i}
                  >
                    <Lock size={20} color="#344054" />
                    <p>{language.shortName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
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
              unoptimized
              height={40}
              width={40}
              alt="avatar"
            />
          </Link>
          <Link href="/projects/new">
            <button className="border rounded-lg border-[#D0D5DD] px-3 py-2 text-[#344054] bg-transparent font-semibold text-sm">
              Start Project
            </button>
          </Link>
        </div>
      </nav>
    )
  ) : isMobile ? (
    <nav
      className={`${
        isWhite ? "bg-white" : "bg-[#F9FAFB]"
      } lg:border-b border-[#E4E7EC] sticky top-0 z-10 p-4 flex justify-between items-center w-full`}
    >
      <Link href="/dashboard">
        <Image src={Logo} height={28} alt="logo" />
      </Link>
      <Menu onClick={() => setIsOpen(!isOpen)} color="#344054" size={24} />
    </nav>
  ) : (
    <nav
      className={`flex ${
        isWhite ? "bg-white" : "bg-[#F9FAFB] border-b border-[#D0D5DD]"
      } items-center px-32 py-6 justify-between`}
    >
      <Link href="/">
        <Image src={Logo} alt="logo" height={32} />
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/">
          <p className="text-gray900 font-semibold">Home</p>
        </Link>
        <Link href="/explore">
          <p className="text-gray900 font-semibold">Projects</p>
        </Link>
        <Link href="/people">
          <p className="text-gray900 font-semibold">People</p>
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
