"use client";

import MainLayout from "@/layouts/MainLayout";
import { Group } from "@/models/Group";
import { underscoreToCapital } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MessageSquare, Search } from "react-feather";
import Pic from "@/assets/avatar.jpeg";
import Loader from "@/components/Loader";
import options from "@/data/options";
import "@/app/globals.css";
import { useGetAllUsers } from "@/hooks/useGetUser";
import { User, UserDocument } from "@/models/User";
import useCurrentUser from "@/hooks/useCurrentUser";

function People() {
  const [search, setSearch] = useState("");
  const currentUser = useCurrentUser();
  const { data, isLoading } = useGetAllUsers();
  const users: UserDocument[] = data?.data?.data || [];
  const searchedUsers =
    search.length > 0
      ? users?.filter((user) =>
          user?.name?.toLowerCase()?.startsWith(search.trim().toLowerCase())
        )
      : users;
  console.log(data);

  return (
    <MainLayout>
      <div className={`${!currentUser && "lg:mx-32 mx-4"} "py-6 lg:px-8 px-4"`}>
        <div className="lg:max-w-[60%] break-word">
          <h2 className="mb-1 mt-6 lg:text-2xl text-xl text-black">
            Discover people
          </h2>
          <p className="text-sm mb-2 lg:mb-0 ">
            Find people you might be interested in
          </p>
        </div>
        <div className="relative my-6 max-w-[80%] lg:max-w-[50%]">
          <input
            type="text"
            className="pl-10 pr-4 w-full text-gray900 placeholder:text-gray600 text-sm py-2 bg-white border border-borderColor rounded-lg"
            placeholder="Search Projects"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute focus:outline-none inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search color="#475367" size={20} />
          </div>
        </div>
        <div className="flex gap-4 my-8">
          {isLoading ? (
            <Loader />
          ) : (
            searchedUsers?.map((user, i) => (
              <div
                key={i}
                className="bg-white cursor-pointer max-w-[50%] lg:max-w-[20%] rounded-10 border mb-4 lg:mb-0 border-milk lg:w-[20%]"
              >
                <Link href={`/profile/${user._id}`}>
                  <div className="h-[180px] relative overflow-hidden p-4">
                    <Image
                      src={user.avatar || Pic}
                      alt="banner"
                      width="0"
                      height="0"
                      unoptimized
                      sizes="100vw"
                      className="h-full w-full rounded-[10px] object-cover object-top"
                    />
                  </div>
                  <div className="p-4 pt-0">
                    <h6>{user.name}</h6>
                    <p className="text-[#667185] text-xs">{user.title}</p>
                    <div className="flex flex-wrap max-h-[60px] overflow-hidden gap-2 my-3">
                      {user.interests?.map((interest, i) => (
                        <div
                          key={i}
                          className="bg-[#D7D7EB] px-2 py-1 rounded-3xl"
                        >
                          <p className="text-[#232566] capitalize text-xs font-medium">
                            {underscoreToCapital(interest)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex mt-4 pt-4 justify-between border-t border-[#F0F2F5] items-center">
                      <p className="text-xs">{user.groups.length} Projects</p>
                      <a href="#" className="text-sm">
                        See More
                      </a>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default People;
