"use client";
import Image from "next/image";
import Logo from "@/assets/LogoText.svg";
import Medal from "@/assets/medal.png";
import {
  Home,
  MessageSquare,
  Box,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "react-feather";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";
import { copyToClipboard } from "@/utils";
import useCurrentUser from "@/hooks/useCurrentUser";
import FeedbackModal from "./FeedbackModal";

function Sidebar() {
  const path = usePathname();
  const user = useCurrentUser();
  const router = useRouter();
  const { data } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    setIsOpen(true);
  };
  const menuItems = useMemo(
    () => [
      {
        id: "dashboard",
        link: "/dashboard",
        icon: <Home size={20} color="#667185" />,
        label: "Dashboard",
      },
      {
        id: "projects",
        link: "/projects",
        icon: <MessageSquare size={20} color="#667185" />,
        label: "Projects",
      },
      {
        id: "explore",
        link: "/explore",
        icon: <Box size={20} color="#667185" />,
        label: "Explore",
      },
      {
        id: "people",
        icon: <User size={20} color="#667185" />,
        link: "/people",
        label: "People",
      },
      {
        id: "settings",
        icon: <Settings size={20} color="#667185" />,
        link: "/profile",
        label: "Settings",
      },
      {
        id: "help-center",
        icon: <HelpCircle size={20} color="#667185" />,
        link: "/help-center",
        label: "Help Center",
      },
    ],
    []
  );

  const getActiveTab = useCallback(() => {
    return menuItems.find((item) => {
      if (path.slice(1).startsWith(item.id)) {
        return item.id;
      }
    });
  }, [menuItems, path]);

  return (
    <div className="max-w-[20%] hidden lg:flex h-screen sticky top-0 left-0 justify-between flex-col w-96 bg-white border-r border-[#E4E7EC]">
      <FeedbackModal showModal={isOpen} setShowModal={setIsOpen} />
      <div>
        <div className="mx-6 mt-4 mb-8">
          <Link href="/dashboard">
            <Image src={Logo} height={40} alt="logo" />
          </Link>
        </div>
        <div className="pb-3 px-2">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <div
                className={`flex mt-1 cursor-pointer items-center gap-3 px-4 py-3 ${
                  getActiveTab()?.id === item.id
                    ? "bg-[#F1E9FD] rounded-lg"
                    : ""
                }`}
              >
                {React.cloneElement(item.icon, {
                  color: getActiveTab()?.id === item.id ? "#9065F2" : "#667185",
                })}
                <p
                  className={`text-sm ${
                    getActiveTab()?.id === item.id
                      ? "text-gray900 font-medium"
                      : "text-gray700"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-auto px-4 mb-4 w-full flex items-center">
        <div className="bg-card-bg p-4 rounded-10 text-center">
          <Image src={Medal} alt="medal" className="mx-auto" />
          <p className="text-base text-white">Drop a feedback</p>
          <p className="text-xs text-milk">
            We&apos;d like to hear what you think about Collabo
          </p>
          <button
            onClick={handleSubmit}
            className="text-purple700 mt-3 mx-auto text-sm bg-white flex items-center gap-1 py-3 px-4 rounded-lg"
          >
            Drop feedback
          </button>
        </div>
        {/* <Image
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
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
