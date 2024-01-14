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

function Sidebar() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const menuItems = [
    {
      id: "dashboard",
      icon: <Home size={20} color="#667185" />,
      label: "Dashboard",
    },
    {
      id: "rooms",
      icon: <MessageSquare size={20} color="#667185" />,
      label: "Rooms",
    },
    {
      id: "projects",
      icon: <Box size={20} color="#667185" />,
      label: "Projects",
    },
    {
      id: "people",
      icon: <User size={20} color="#667185" />,
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
            <div
              key={item.id}
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
          ))}
        </div>
        <div className="pt-3 px-2">
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
          <p className="text-[#101928] font-semibold">David Mcclaren</p>
          <p>david@gmail.com</p>
        </div>
        <div className="ml-auto">
          <LogOut size={20} color="#000000" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
