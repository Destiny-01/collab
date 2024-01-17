"use client";

import Image from "next/image";
import LogoImage from "@/assets/Dray-ui.svg";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import API from "@/utils/api";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

export default function Login() {
  const router = useRouter();
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
    <div className="bg-home-gradient h-[100vh]">
      <div className="bg-white ">
        <Image src={LogoImage} alt="Logo" />
      </div>
      <div className="bg-white py-7 lg:py-[180px]">
        <div className=" flex justify-center items-center ">
          <div className="px-5 lg:px-7 py-8  rounded-10 border-1 border-solid border-bcolor">
            <div className="flex flex-col justify-center items-center">
              <h5 className=" text-xl lg:text-[28px]">Log In</h5>
              <p className="lg:text-base pt-2">
                Enter your credentials to access your account
              </p>
            </div>
            <form className="pt-8">
              <h3>EMAIL ADDRESS</h3>
              <input
                className=" bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-scolor"
                placeholder="Enter Email"
                name="email"
                onChange={handleChange}
              ></input>
              <h3 className="pt-6">PASSWORD</h3>
              <input
                className=" bg-shade rounded-md  border-1 w-full  p-3 lg:p-4 text-sm  mt-1   text-dimegrey border-solid border-scolor"
                type="password"
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
              ></input>
              <div className="flex justify-between pt-8  lg:gap-14">
                <div className="flex gap-2 items-center ">
                  <input
                    className="lg:w-[24px] lg:h-[24px] rounded-xl"
                    type="checkbox"
                  />
                  <h3 className=" text-xs lg:text-sm">
                    Remember me for 30 days
                  </h3>
                </div>
                <Link href="#">
                  <h4 className="text-xs lg:text-sm">Forgot Password?</h4>
                </Link>{" "}
              </div>
              <div className="pt-8">
                <button
                  onClick={handleSubmit}
                  className="bg-dimeblue   w-full  px-6 py-4 text-base font-semibold rounded-lg flex justify-center items-center"
                >
                  {isLoading ? (
                    <span className="loader small"></span>
                  ) : (
                    "Log into Account"
                  )}
                </button>
              </div>
              <div className="flex gap-2 pt-8 justify-center items-center">
                <p className="text-xs font-medium text-dimegrey ">
                  Are you new here?
                </p>
                <Link href="/auth/signup">
                  <h4>Create Account</h4>
                </Link>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
