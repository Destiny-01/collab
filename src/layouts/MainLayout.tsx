import MobileSidebar from "@/components/MobileSidebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useResponsive from "@/hooks/useResponsive";
import React, { useState } from "react";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useResponsive();
  console.log(isMobile, isSidebarOpen);

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen w-full">
      <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar />
      <div className={`w-full ${isSidebarOpen ? "hidden" : "block"}`}>
        <Navbar setIsOpen={setIsSidebarOpen} isLoggedIn={true} />
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
