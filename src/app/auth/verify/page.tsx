"use client";

import Image from "next/image";
import verifyImage from "@/assets/verify-image.png";
import LogoText from "@/assets/LogoText.svg";
import Link from "next/link";
import "@/app/globals.css";
import { ChevronLeft } from "react-feather";
import { useSearchParams } from "next/navigation";
import { useResendCode } from "@/hooks/useAuthHooks";
import useResponsive from "@/hooks/useResponsive";

export default function Verify() {
  const { isMobile } = useResponsive();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { mutate, isPending } = useResendCode();

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
      <div className="bg-login-bg h-[calc(100vh-56px)] flex justify-center">
        <div className=" flex flex-col justify-center lg:py-24 py-12 items-center">
          <div className="bg-white px-5 lg:max-w-[450px] max-w-[90%] lg:px-7 lg:py-8 py-6 rounded-10 border-1 border-solid border-bcolor">
            <div className="flex flex-col text-center justify-center items-center">
              <Image
                src={verifyImage}
                className="text-center"
                alt="logo-full"
              />
              <h5 className="mb-2 text-xl lg:text-[28px] lg:mt-6 mt-3">
                Verify your email
              </h5>
              <p>
                To maintain a secure and trustworthy community, we have sent an
                email to <span className="font-bold">{email}</span> for
                verification, which you will need to complete only once.
              </p>
              <div className="flex gap-2 pt-6 justify-center items-center">
                <p className="text-dimegrey text-sm">
                  Didn&apos;t receive email?
                </p>
                <a href="#" onClick={() => mutate({ email })}>
                  <h4 className="text-sm text-purple600">Resend email</h4>
                </a>
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-6 justify-center items-center">
            <p className="text-[#344054] text-sm">Already have an account?</p>
            <Link href="/auth/login">
              <h4 className="text-sm text-purple600">Log in</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
