"use client";

import Image from "next/image";
import LogoFull from "@/assets/logo-full.png";
import LogoText from "@/assets/LogoText.png";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "@/utils/api";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import useResponsive from "@/hooks/useResponsive";
import { ChevronLeft } from "react-feather";

export default function Login() {
  const router = useRouter();
  const { isMobile } = useResponsive();
  const [data, setData] = useState({
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
      await signOut({ redirect: false });
      console.log(data);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(res);
      setIsLoading(false);
      if (res?.ok) {
        toast.success("Login successful");
        router.push("/");
      } else {
        console.log("kkkkkkk", res?.error);
        toast.error(res?.error);
      }
    } catch (err: any) {
      setIsLoading(false);
      console.log("kkkk");
      console.log(err);
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
                Login to Collab
              </h5>
              <p className="lg:text-base text-gray600 lg:pt-1">
                Pick up from where you stopped
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
              <div className="flex justify-between lg:pt-6 pt-4">
                <div></div>
                <Link href="/auth/forgot-password">
                  <h4 className="text-xs lg:text-sm">Forgot Password?</h4>
                </Link>
              </div>
              <div className="lg:pt-6 pt-4">
                <button
                  onClick={handleSubmit}
                  className="bg-purple500   w-full  px-6 py-4 text-base font-semibold rounded-lg flex justify-center items-center"
                >
                  {isLoading ? (
                    <span className="loader small"></span>
                  ) : (
                    "Log into Account"
                  )}
                </button>
              </div>
              <div className="flex gap-2 pt-8 justify-center items-center">
                <p className="text-dimegrey text-sm">Are you new here?</p>
                <Link href="/auth/signup">
                  <h4>Create Account</h4>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
