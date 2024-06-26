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
  X,
  ChevronRight,
} from "react-feather";
import Avatar from "@/assets/avatar.jpeg";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import useResponsive from "@/hooks/useResponsive";
import useCurrentUser from "@/hooks/useCurrentUser";
import { copyToClipboard } from "@/utils";
import FeedbackModal from "./FeedbackModal";

function MobileSidebar({ isOpen, setIsOpen }: any) {
  const path = usePathname();
  const user = useCurrentUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  return user && isOpen ? (
    <div className="h-screen p-4 justify-between flex flex-col w-screen bg-white border-r border-[#E4E7EC]">
      <div>
        <div className="flex justify-between mb-12">
          <Link href="/dashboard">
            <Image src={Logo} height={28} alt="logo" />
          </Link>
          <X onClick={() => setIsOpen(false)} color="#000000" />
        </div>
        <Link href="/profile">
          <div className="flex gap-2 mb-6 items-center">
            <Image
              className="rounded-full h-12 w-12 border border-white"
              src={user?.avatar || Avatar}
              height={48}
              width={48}
              alt="avatar"
            />
            <div>
              <p className="text-gray900 text-base font-medium">{user?.name}</p>
              <p className="text-sm">
                {user?.title} at {user?.company}
              </p>
            </div>

            <ChevronRight className="ml-auto text-gray600" />
          </div>
        </Link>

        <div className="pb-3">
          {menuItems.map((item) => (
            <Link key={item.id} href={item.link}>
              <div
                className={`flex mt-1 cursor-pointer items-center gap-3 px-4 py-3 ${
                  getActiveTab()?.id === item.id
                    ? "bg-[#F1E9FD] rounded-[4px]"
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
      <div className="mt-auto pb-4 w-full flex items-center">
        <div className="bg-card-bg p-4 rounded-10">
          <div className="flex items-center gap-2 mx-3">
            <Image src={Medal} alt="medal" className="mx-auto h-16 w-16" />
            <div>
              <p className="text-lg text-white">Drop a feedback</p>
              <p className="text-xs text-milk">
                We&apos;d like to hear what you think about Collabo
              </p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="text-purple700 w-full mt-3 mx-auto text-sm bg-white flex justify-center items-center gap-1 py-3 px-4 rounded-lg"
          >
            Drop Feedback
          </button>
        </div>
        <FeedbackModal showModal={isModalOpen} setShowModal={setIsModalOpen} />
      </div>
    </div>
  ) : (
    isOpen && (
      <div className="relative">
        <div className="absolute z-10 top-16 w-[-webkit-fill-available] py-3 px-4 bg-white border mx-4 border-milk shadow-card-shadow rounded-lg">
          <div className="">
            <Link href="/explore">
              <div
                className={`flex mt-1 cursor-pointer items-center mb-8 gap-3`}
              >
                <p
                  className={`text-sm ${
                    path === "/explore"
                      ? "text-gray900 font-medium"
                      : "text-gray700"
                  }`}
                >
                  Projects
                </p>
              </div>
            </Link>
            <Link href="/people">
              <div
                className={`flex mt-1 cursor-pointer mb-8 items-center gap-3`}
              >
                <p
                  className={`text-sm ${
                    path === "/people"
                      ? "text-gray900 font-medium"
                      : "text-gray700"
                  }`}
                >
                  People
                </p>
              </div>
            </Link>
            <Link href="/auth/login">
              <div
                className={`flex mt-1 cursor-pointer mb-8 items-center gap-3`}
              >
                <p
                  className={`text-sm ${
                    path === "/auth/login"
                      ? "text-gray900 font-medium"
                      : "text-gray700"
                  }`}
                >
                  Login
                </p>
              </div>
            </Link>
            <Link href="/auth/signup">
              <button className="bg-purple500 text-white w-full justify-center flex items-center gap-1 py-3 font-medium px-4 rounded-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
}

export default MobileSidebar;
