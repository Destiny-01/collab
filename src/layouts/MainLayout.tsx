import MobileSidebar from "@/components/MobileSidebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useResponsive from "@/hooks/useResponsive";
import React, { Fragment, useState } from "react";

type Props = {
  children: React.ReactNode;
  isWhite?: boolean;
};

function MainLayout({ children, isWhite = false }: Props) {
  const user = useCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useResponsive();
  console.log(isMobile, isSidebarOpen);

  return user ? (
    <div
      className={`flex ${
        isWhite ? "bg-white" : "bg-[#F9FAFB]"
      } min-h-screen w-full`}
    >
      <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar />

      <div className={`w-full ${isSidebarOpen ? "hidden" : "block"}`}>
        <Navbar setIsOpen={setIsSidebarOpen} />
        {children}
      </div>
    </div>
  ) : (
    <div
      className={`${isWhite ? "bg-white" : "bg-[#F9FAFB]"} min-h-screen w-full`}
    >
      <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className={`w-full ${isSidebarOpen ? "hidden" : "block"}`}>
        <Navbar isWhite={isWhite} setIsOpen={setIsSidebarOpen} />
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
