"use client";

import Image from "next/image";
import LogoFull from "@/assets/logo-full.png";
import LogoText from "@/assets/LogoText.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import useResponsive from "@/hooks/useResponsive";
import { LogOut } from "react-feather";
import Step1 from "@/components/onboarding/Step1";
import Step2 from "@/components/onboarding/Step2";
import Step3 from "@/components/onboarding/Step3";
import { useUpdateUser } from "@/hooks/useUpdateUser";

export default function Onboarding() {
  const { mutate, isPending } = useUpdateUser();

  const router = useRouter();
  const { isMobile } = useResponsive();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    avatar: "",
    username: "",
    name: "",
    country: "",
    title: "",
    company: "",
    interests: [],
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-white min-h-screen relative">
      <div className="flex justify-between items-center pt-5 lg:mx-24 mx-6">
        <Link href="/">
          <Image src={LogoText} height={isMobile ? 24 : 32} alt="logo" />
        </Link>
        <a
          href="#"
          onClick={() =>
            signOut({
              redirect: false,
            }).then(() => router.push("/"))
          }
        >
          <div className="flex items-center gap-1 text-sm">
            Logout <LogOut size={16} />
          </div>
        </a>
      </div>
      <div className=" flex flex-col justify-center lg:py-16 py-8 items-center">
        {step === 1 ? (
          <Step1 setStep={setStep} data={data} handleChange={handleChange} />
        ) : step === 2 ? (
          <Step2 setStep={setStep} data={data} handleChange={handleChange} />
        ) : (
          <Step3
            mutate={mutate}
            isPending={isPending}
            data={data}
            setStep={setStep}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}
