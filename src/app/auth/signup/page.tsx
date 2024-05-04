"use client";

import Image from "next/image";
import LogoFull from "@/assets/logo-full.png";
import LogoText from "@/assets/LogoText.png";
import React, { useState } from "react";
import API from "@/utils/api";
import { toast } from "react-toastify";
import Link from "next/link";
import "@/app/globals.css";
import useResponsive from "@/hooks/useResponsive";
import { ChevronLeft } from "react-feather";
import { useRouter } from "next/navigation";

export default function Signup() {
  const { isMobile } = useResponsive();
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      console.log(data);
      const res = await API.post("/auth/register", data);
      console.log(res);
      if (res.status === 200) {
        router.push(`/auth/verify?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      toast.error(err.response?.data || err.message);
    }
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
      <div className="bg-login-bg">
        <div className=" flex flex-col justify-center lg:py-24 py-12 items-center">
          <div className="bg-white px-5 lg:max-w-[450px] max-w-[90%] lg:px-7 lg:py-8 py-6 rounded-10 border-1 border-solid border-bcolor">
            <div className="flex flex-col text-center justify-center items-center">
              <Image src={LogoFull} className="text-center" alt="logo-full" />
              <h5 className=" text-xl lg:text-[28px] lg:mt-6 mt-3">
                Welcome to Collab
              </h5>
              <p className="lg:text-base text-gray600 pt-1">
                Start collaborating with like-minds to build projects
              </p>
            </div>
            <form className="pt-2">
              <label>Email Address</label>
              <input
                className=" bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                placeholder="Enter Email"
                name="email"
                type="email"
                onChange={handleChange}
              ></input>
              <label>Password</label>
              <input
                className=" bg-shade rounded-md  border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
              ></input>

              <div className="pt-8">
                <button
                  onClick={handleSubmit}
                  className="bg-purple600 w-full px-6 py-4 text-base font-semibold rounded-lg flex justify-center items-center"
                >
                  {isLoading ? (
                    <span className="loader small"></span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
              <div className="flex gap-2 pt-8 justify-center items-center">
                <p className="text-dimegrey text-sm">
                  Already have an account?
                </p>
                <Link href="/auth/login">
                  <h4 className="text-base text-purple600">Log in</h4>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
