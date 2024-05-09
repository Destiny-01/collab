"use client";

import Image from "next/image";
import LogoFull from "@/assets/logo-full.png";
import LogoText from "@/assets/LogoText.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { signIn, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import "@/app/globals.css";
import { ChevronLeft } from "react-feather";
import { useResetPassword } from "@/hooks/useAuthHooks";
import useResponsive from "@/hooks/useResponsive";

export default function Login() {
  const { isMobile } = useResponsive();
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { mutate, isPending, isSuccess } = useResetPassword();
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    mutate({ password: data.password, email_verification: code });
  };

  useEffect(() => {
    isSuccess && router.push("/auth/login");
  }, [isSuccess, router]);

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
      <div className="bg-login-bg">
        <div className=" flex flex-col justify-center lg:py-24 py-12 items-center">
          <div className="bg-white px-5 lg:max-w-[450px] max-w-[90%] lg:px-7 lg:py-8 py-6 rounded-10 border-1 border-solid border-bcolor">
            <div className="flex flex-col text-center justify-center items-center">
              <Image src={LogoFull} className="text-center" alt="logo-full" />
              <h5 className=" text-xl lg:text-[28px] lg:mt-6 mt-3">
                Reset Password
              </h5>
              <p className="lg:text-base text-gray600 pt-1">
                Provide new password to complete reset
              </p>
            </div>
            <form className="pt-2">
              <label>New Password</label>
              <input
                className=" bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                placeholder="Enter password"
                type="password"
                name="password"
                onChange={handleChange}
              ></input>
              <label>Confirm Password</label>
              <input
                className=" bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                placeholder="Enter password again"
                type="password"
                name="confirmPassword"
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
