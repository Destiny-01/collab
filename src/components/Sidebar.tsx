"use client";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import {
  Home,
  MessageSquare,
  Box,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "react-feather";
import React, { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Sidebar() {
  const router = useRouter();
  const { data } = useSession();
  const [activeTab, setActiveTab] = useState("dashboard");
  const menuItems = [
    {
      id: "dashboard",
      link: "/",
      icon: <Home size={20} color="#667185" />,
      label: "Dashboard",
    },
    {
      id: "rooms",
      link: "/rooms",
      icon: <MessageSquare size={20} color="#667185" />,
      label: "Rooms",
    },
    {
      id: "projects",
      link: "/projects",
      icon: <Box size={20} color="#667185" />,
      label: "Projects",
    },
    {
      id: "people",
      icon: <User size={20} color="#667185" />,
      link: "/people",
      label: "People",
    },
  ];

  return (
    <div className="max-w-[25%] h-screen sticky top-0 left-0 justify-between flex flex-col w-96 bg-white border-r border-[#E4E7EC]">
      <div>
        <div className="mx-6 mt-8 mb-5">
          <Image src={Logo} alt="logo" />
        </div>
        <div className="pb-3 px-2 border-b border-[#F0F2F5]">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <div
                className={`flex mt-1 cursor-pointer items-center gap-3 px-4 py-3 ${
                  activeTab === item.id
                    ? "bg-[#D7D7EB] rounded-lg text-[#101928] font-medium"
                    : ""
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                {React.cloneElement(item.icon, {
                  color: activeTab === item.id ? "#5758AA" : "#667185",
                })}
                <p>{item.label}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="pt-3 px-2">
          <Link href="/profile">
            {" "}
            <div
              className={`flex mt-1 cursor-pointer items-center gap-3 px-4 py-3 ${
                activeTab === "settings"
                  ? "bg-[#D7D7EB] rounded-lg text-[#101928]"
                  : ""
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings size={20} color="#667185" /> <p> Settings</p>
            </div>
          </Link>
          <div
            className={`flex mt-1 cursor-pointer items-center gap-3 px-4 py-3 ${
              activeTab === "help"
                ? "bg-[#D7D7EB] rounded-lg text-[#101928]"
                : ""
            }`}
            onClick={() => setActiveTab("help")}
          >
            <HelpCircle size={20} color="#667185" /> <p> Help Center</p>
          </div>
        </div>
      </div>
      <div className="mt-auto pb-10 px-6 flex items-center">
        <Image
          className="rounded-full h-10 w-10 border border-white"
          src={Pic}
          height={40}
          width={40}
          alt="avatar"
        />
        <div className="flex flex-col ml-3">
          <p className="text-[#101928] font-semibold">{data?.user?.name}</p>
          <p>{data?.user?.email}</p>
        </div>
        <div
          className="ml-auto cursor-pointer"
          onClick={() =>
            signOut({
              redirect: false,
            }).then(() => router.push("/"))
          }
        >
          <LogOut size={20} color="#000000" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
