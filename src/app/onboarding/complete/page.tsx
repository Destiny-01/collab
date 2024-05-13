"use client";

import Image from "next/image";
import Pic from "@/assets/avatar.jpeg";
import LogoText from "@/assets/LogoText.svg";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import useResponsive from "@/hooks/useResponsive";
import { ChevronRight, LogOut } from "react-feather";
import { useGetAllGroups } from "@/hooks/useCurrentProject";
import { Group } from "@/models/Group";
import { underscoreToCapital } from "@/utils";
import Loader from "@/components/Loader";
import DefaultCover from "@/assets/Default Cover.png";

export default function Onboarding() {
  const { data, isLoading } = useGetAllGroups();
  const groups: Group[] = data?.data?.data || [];
  console.log(groups);
  const router = useRouter();
  const { isMobile } = useResponsive();

  return (
    <div className="bg-purple100 min-h-screen relative">
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
      <div className=" flex flex-col gap-8 justify-center mx-auto lg:max-w-[950px] max-w-[90%] lg:py-16 py-8 items-center">
        <div className="bg-white text-center px-5 w-full md:px-7 rounded-10">
          <h5 className="mt-6 mb-2 text-[28px]">
            Projects that might interest you
          </h5>
          <p>We have handpicked some projects that might interest you</p>
          <div className="flex flex-wrap gap-4 my-8">
            {isLoading ? (
              <Loader />
            ) : (
              groups.slice(0, 6)?.map((group, i) => (
                <div className="w-[32%] text-start" key={i}>
                  <Link href={`/projects/${group.uuid}`}>
                    <div className="h-[162px]">
                      <Image
                        src={group.photo || DefaultCover}
                        width="0"
                        height="0"
                        unoptimized
                        alt="banner"
                        className="h-full w-full rounded-t-[10px] object-cover object-top overflow-hidden"
                      />
                    </div>
                    <div className="bg-white border-milk border p-4 rounded-b-[10px]">
                      <p className="text-xs text-[#667185]">
                        {underscoreToCapital(group.category)}
                      </p>
                      <h2>{group.project?.name}</h2>
                      <div className="flex mt-2 pt-2 justify-between border-t border-[#F0F2F5] items-center">
                        <div className="flex">
                          {group?.members?.slice(0, 3).map((member, i) => (
                            <Image
                              className={`rounded-full h-8 w-8 border border-white ${
                                i > 0 && "-ml-3"
                              }`}
                              src={member.avatar || Pic}
                              height={32}
                              width={32}
                              unoptimized
                              alt="avatar"
                              key={i}
                            />
                          ))}
                        </div>
                        <p className="text-xs">
                          {group.updates?.length} Upvotes
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex w-full justify-between items-center">
          <Link href="/dashboard">
            <div className="flex items-center gap-1 text-sm">
              Skip to Dashboard <ChevronRight size={20} />
            </div>
          </Link>
          <Link href="/projects/new">
            {" "}
            <button
              className="bg-purple500 text-white lg:py-3 py-2 lg:px-4 px-4 rounded-lg"
              // onClick={handleSubmit}
            >
              Create new project
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
