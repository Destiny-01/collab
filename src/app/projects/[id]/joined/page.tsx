"use client";

import Image from "next/image";
import verifiedImage from "@/assets/verified-image.png";
import LogoText from "@/assets/LogoText.svg";
import Link from "next/link";
import "@/app/globals.css";
import { ChevronLeft } from "react-feather";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useResponsive from "@/hooks/useResponsive";

export default function Joined({ params }: { params: { id: string } }) {
  const { isMobile } = useResponsive();
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(
      () => router.replace(`/projects/${params.id}`),
      3000
    );
    return () => clearTimeout(timeout);
  }, [params.id, router]);

  return (
    <div className="bg-[#F2ECFE] min-h-screen relative">
      <div className="flex justify-between items-center pt-5 lg:mx-24 mx-6">
        <Image src={LogoText} height={isMobile ? 24 : 32} alt="logo" />
        <Link href="/">
          <div className="flex items-center gap-1 text-sm">
            <ChevronLeft size={16} /> Back to website
          </div>
        </Link>
      </div>
      <div className="bg-login-bg h-[calc(100vh-56px)] justify-center flex">
        <div className=" flex flex-col justify-center lg:py-24 py-12 items-center">
          <div className="bg-white px-5 lg:max-w-[450px] max-w-[90%] lg:px-7 lg:py-8 py-6 rounded-10 border-1 border-solid border-bcolor">
            <div className="flex flex-col text-center justify-center items-center">
              <Image
                src={verifiedImage}
                className="text-center"
                alt="logo-full"
              />
              <h5 className="mb-2 text-xl lg:text-[28px] lg:mt-6 mt-3">
                Accepted the invite
              </h5>
              <p>
                You have accepted the invite and will be redirected to the
                project page in a few seconds, or you can{" "}
                <Link href={`/projects/${params.id}`}> click here</Link> if not
                redirected{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
