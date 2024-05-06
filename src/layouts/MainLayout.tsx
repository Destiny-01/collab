import MobileSidebar from "@/components/MobileSidebar";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useResponsive from "@/hooks/useResponsive";
import React, { Fragment, useState } from "react";

type Props = {
  children: React.ReactNode;
};

function MainLayout({ children }: Props) {
  const user = useCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useResponsive();
  console.log(isMobile, isSidebarOpen);

  return (
    <div className="flex bg-[#F9FAFB] min-h-screen w-full">
      {user && (
        <Fragment>
          <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <Sidebar />
        </Fragment>
      )}
      <div className={`w-full ${isSidebarOpen ? "hidden" : "block"}`}>
        <Navbar setIsOpen={setIsSidebarOpen} isLoggedIn={true} />
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
