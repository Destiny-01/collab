"use client";

import Image from "next/image";
import LogoImage from "@/assets/Dray-ui.svg";
import messageImage from "@/assets/message-icon.svg";
import eyeImage from "@/assets/eye-icon.svg";
import React, { useState } from "react";
import API from "@/utils/api";
import { toast } from "react-toastify";
import Link from "next/link";
import "@/app/globals.css";

export default function Signup() {
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
        toast.success("Success. An email has been sent to verify your mail");
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
      toast.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="h-[100vh]">
      <div className="bg-white">
        <Image src={LogoImage} alt="Logo" />
      </div>
      <div className="bg-home-gradient">
        <div className="bg-white ">
          <div className="py-8 flex justify-center items-center  ">
            <div className="px-7 py-8  rounded-10 border border-solid border-bcolor  ">
              <div className="flex flex-col justify-center items-center">
                <h5 className=" text-xl lg:text-[28px]">Register</h5>
                <p className="lg:text-base pt-2">
                  Enter your credentials to create your account
                </p>
              </div>
              <form className="pt-8">
                <h3>NAME</h3>
                <input
                  className=" bg-shade  w-full  rounded-md border p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-[#BCBCDD]"
                  placeholder="Enter Email"
                  onChange={handleChange}
                  name="name"
                ></input>
                <h3 className="pt-6">USERNAME</h3>
                <input
                  className=" bg-shade  w-full  rounded-md border p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-[#BCBCDD]"
                  onChange={handleChange}
                  name="username"
                  placeholder="Enter Email"
                ></input>
                <h3 className="pt-6">EMAIL ADDRESS</h3>
                <input
                  className=" bg-shade  w-full  rounded-md border p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-[#BCBCDD]"
                  onChange={handleChange}
                  name="email"
                  placeholder="Enter Email"
                ></input>
                <Image
                  className="relative bottom-9 left-[90%] cursor-pointer"
                  src={messageImage}
                  alt="message"
                />
                <h3 className="pt-6">PASSWORD</h3>
                <input
                  className=" bg-shade rounded-md  border w-full  p-3 lg:p-4 text-sm  mt-1   text-dimegrey border-solid border-[#BCBCDD]"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                ></input>
                <Image
                  className="relative bottom-9 left-[90%] cursor-pointer"
                  src={eyeImage}
                  alt="message"
                />

                <div className="pt-8">
                  <button
                    onClick={handleSubmit}
                    className="bg-dimeblue w-full px-6 py-4 text-base font-semibold rounded-lg flex justify-center items-center"
                  >
                    {isLoading ? (
                      <span className="loader small"></span>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
                <div className="flex gap-2 pt-8 justify-center items-center">
                  <p className="text-xs font-medium text-dimegrey ">
                    Already have an account?
                  </p>
                  <Link href="/auth/login">
                    <h4>Log in</h4>
                  </Link>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
