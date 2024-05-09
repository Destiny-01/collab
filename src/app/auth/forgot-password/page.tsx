"use client";

import Image from "next/image";
import LogoFull from "@/assets/logo-full.png";
import LogoText from "@/assets/LogoText.svg";
import Link from "next/link";
import { useState } from "react";
import verifyImage from "@/assets/verify-image.png";
import "@/app/globals.css";
import { ChevronLeft } from "react-feather";
import { useForgotPassword } from "@/hooks/useAuthHooks";
import useResponsive from "@/hooks/useResponsive";

export default function ForgotPassword() {
  const { isMobile } = useResponsive();
  const [data, setData] = useState({
    email: "",
  });
  const { mutate, isPending, isSuccess } = useForgotPassword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    mutate(data);
  };

  return (
    <div className="bg-[#F2ECFE] min-h-screen relative">
      <div className="flex justify-between items-center pt-5 lg:mx-24 mx-6">
        <Link href="/">
          <Image src={LogoText} height={isMobile ? 24 : 32} alt="logo" />
        </Link>
        <Link href="/">
          <div className="flex items-center gap-1 text-sm">
            <ChevronLeft size={16} /> Back to website
          </div>
        </Link>
      </div>
      <div className="bg-login-bg h-[calc(100vh-56px)] justify-center flex">
        <div className=" flex flex-col justify-center lg:py-24 py-12 items-center">
          {isSuccess ? (
            <div className="bg-white px-5 text-center lg:max-w-[450px] max-w-[90%] lg:px-7 lg:py-8 py-6 rounded-10 border-1 border-solid border-bcolor">
              <Image
                src={verifyImage}
                className="text-center mx-auto"
                alt="logo-full"
              />
              <h5 className=" text-xl lg:text-[28px] lg:mt-6 mt-3">
                Email sent successfully
              </h5>
              <p>
                We have sent an email to{" "}
                <span className="font-bold">{data.email}</span> for
                verification. Please check spam folder if not found.
              </p>
              <div className="flex gap-2 pt-6 justify-center items-center">
                <p className="text-dimegrey text-sm">
                  Didn&apos;t receive email?
                </p>
                <a href="#" onClick={() => mutate({ ...data, isResend: true })}>
                  <h4 className="text-sm text-purple600">Resend email</h4>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white px-5 lg:max-w-[450px] max-w-[90%] lg:px-7 lg:py-8 py-6 rounded-10 border-1 border-solid border-bcolor">
              <div className="flex flex-col text-center justify-center items-center">
                <Image src={LogoFull} className="text-center" alt="logo-full" />
                <h5 className=" text-xl lg:text-[28px] lg:mt-6 mt-3">
                  Forgot Password
                </h5>
                <p className="lg:text-base text-sm text-gray600 pt-1">
                  Provide your email address to reset Password
                </p>
              </div>
              <form className="pt-2">
                <label>Email Address</label>
                <input
                  className=" bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  type="email"
                  onChange={handleChange}
                ></input>
                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    className="bg-purple500 text-white w-full  px-6 py-4 text-base font-semibold rounded-lg flex justify-center items-center"
                  >
                    {isPending ? (
                      <span className="loader small"></span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="flex gap-2 pt-6 justify-center items-center">
            <p className="text-[#344054] text-sm">Want to return?</p>
            <Link href="/auth/login">
              <h4>Login</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
