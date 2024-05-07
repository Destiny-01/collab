"use client";

import Button from "@/components/Button";
import { useGetAllGroups } from "@/hooks/useCurrentProject";
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
import { useSearchParams } from "next/navigation";
import EmptyState from "@/assets/empty-project.png";
import useCurrentUser from "@/hooks/useCurrentUser";
import useResponsive from "@/hooks/useResponsive";
import DashboardImage from "@/assets/dashboard-image.png";

function Projects() {
  const user = useCurrentUser();
  const { isMobile } = useResponsive();
  const searchParams = useSearchParams();
  const search_query = searchParams.get("search_query");
  const category = searchParams.get("category");

  const [filter, setFilter] = useState(category ?? "all");
  const [search, setSearch] = useState(search_query || "");
  const { data, isLoading } = useGetAllGroups();
  const groups: Group[] = data?.data?.data || [];
  const searchedGroups =
    search.length > 0
      ? groups?.filter((group) =>
          group.project?.name
            ?.toLowerCase()
            ?.startsWith(search.trim().toLowerCase())
        )
      : groups;
  const filteredGroups =
    filter === "all"
      ? searchedGroups
      : searchedGroups?.filter((group) => group.category === filter);

  return (
    <MainLayout>
      <div
        className={`${!user && "lg:mx-32 bg-[#F9FAFB] mx-0"} my-6 lg:px-8 px-4`}
      >
        <div className="lg:max-w-[60%] break-word">
          <h2 className="mb-1 mt-6 lg:text-2xl text-xl text-black">
            Explore Projects
          </h2>
          <p className="text-sm mb-2 lg:mb-0 ">
            Discover projects you might be interested in
          </p>
        </div>
        <div className="bg-card-bg mt-6 rounded-xl h-fit w-full lg:p-8 p-6 relative">
          <h5 className="text-white text-lg">Need a brand new idea?</h5>
          <p className="text-milk text-sm">
            Get a brand new real-world problem with the help of AI or use your
            idea
          </p>
          <Link href="/projects/new">
            <button className="text-purple700 mt-4 text-sm bg-white flex items-center gap-1 py-3 px-4 rounded-lg">
              Create Project
            </button>
          </Link>
          {!isMobile && (
            <Image
              src={DashboardImage}
              className="absolute right-0 -bottom-6"
              alt="image"
            />
          )}
        </div>
        <div className="relative my-6 max-w-[80%] lg:max-w-[50%]">
          <input
            type="text"
            className="pl-10 pr-4 w-full text-gray900 placeholder:text-gray600 text-sm py-2 bg-white border border-borderColor rounded-lg"
            placeholder="Search Projects"
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="absolute focus:outline-none inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search color="#475367" size={20} />
          </div>
        </div>
        <div className="flex overflow-scroll no-scrollbar mb-6 gap-3">
          <div
            onClick={() => setFilter("all")}
            className={`${
              filter === "all" ? "bg-[#F1E9FD]" : "bg-milk"
            } rounded-md flex-shrink-0 h-fit px-3 py-2 cursor-pointer border border-borderColor`}
          >
            <p
              className={`${
                filter === "all" ? "text-gray900" : "text-gray600"
              } text-sm`}
            >
              All
            </p>
          </div>
          {options.map((option, i) => (
            <div
              key={i}
              onClick={() => setFilter(option.value)}
              className={`${
                filter === option.value ? "bg-[#F1E9FD]" : "bg-milk"
              } rounded-md flex-shrink-0 h-fit px-3 py-2 cursor-pointer border border-borderColor`}
            >
              <p
                className={`${
                  filter === option.value ? "text-gray900" : "text-gray600"
                } text-sm`}
              >
                {option.label}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:flex gap-4">
          {isLoading ? (
            <Loader />
          ) : filteredGroups.length === 0 ? (
            <div className="bg-white mx-auto min-w-[100%] min-h-[240px] border border-milk shadow-card-shadow text-center rounded-xl p-4">
              <Image src={EmptyState} className="mx-auto" alt="empty" />
              <h6 className="mt-2 mb-1">No projects found</h6>
              <p className="text-xs mb-2">
                Try checking out other tags or create your own project
              </p>
              <Link href="/projects/new" className="text-sm">
                Create
              </Link>
            </div>
          ) : (
            filteredGroups?.map((group, i) => (
              <div
                className="lg:w-[33%] mb-4 lg:mb-0 w-full p-4 rounded-xl border-milk border bg-white text-start"
                key={i}
              >
                <Link href={`/projects/${group.uuid}`}>
                  <div className="lg:h-[200px] h-[187px] mb-2">
                    <Image
                      src={group.photo || Pic}
                      alt="banner"
                      width="0"
                      unoptimized
                      height="0"
                      className="h-full w-full rounded-lg object-cover object-top overflow-hidden"
                    />
                  </div>
                  <div className="rounded-b-[10px]">
                    <h2 className="text-xl font-medium">
                      {group.project?.name}
                    </h2>
                    <p className="text-sm line-clamp-4">
                      {group.project?.description}
                    </p>
                    <div className="flex mt-2 pt-2 justify-between border-t border-[#F0F2F5] items-center">
                      <div className="flex">
                        {group?.members?.slice(0, 2).map((member, i) => (
                          <Image
                            className={`rounded-full h-8 w-8 border border-white ${
                              i > 0 && "-ml-3"
                            }`}
                            src={member.avatar || Pic}
                            height={32}
                            unoptimized
                            width={32}
                            alt="avatar"
                            key={i}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm">{group.updates?.length}</p>
                        <MessageSquare size={20} color="#667185" />
                      </div>
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

export default Projects;
