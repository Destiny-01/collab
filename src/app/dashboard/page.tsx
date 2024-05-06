"use client";

import MainLayout from "@/layouts/MainLayout";
import Image from "next/image";
import React from "react";
import DashboardImage from "@/assets/dashboard-image.png";
import StarDestroyer from "@/assets/star-destroyer.png";
import Pic from "@/assets/avatar.jpeg";
import EmptyState from "@/assets/empty-project.png";
import Link from "next/link";
import { useGetAllGroups, useGetMyGroups } from "@/hooks/useCurrentProject";
import { Group } from "@/models/Group";
import { underscoreToCapital } from "@/utils";
import { MessageCircle, MessageSquare, ThumbsUp } from "react-feather";
import useResponsive from "@/hooks/useResponsive";
import useCurrentUser from "@/hooks/useCurrentUser";
import Loader from "@/components/Loader";

function Dashboard() {
  const user = useCurrentUser();
  const { data, isLoading } = useGetAllGroups();
  const { data: myData } = useGetMyGroups();

  const groups: Group[] = data?.data?.data || [];
  const myGroups: Group[] = myData?.data?.data || [];
  const { isMobile } = useResponsive();

  return (
    <MainLayout>
      <div className="lg:flex mx-4 gap-8 mt-8 justify-stretch">
        <div className="w-full">
          <div className="bg-card-bg rounded-xl h-fit w-full lg:p-8 p-6 relative">
            <h5 className="text-white text-lg">
              Hi {user?.username}, need something fresh
            </h5>
            <p className="text-milk text-sm">
              Get a brand new real-world problem with the help of AI
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
          <div className="flex justify-between mt-8 mb-4 items-center">
            <h2 className="text-black text-xl font-medium">My Projects</h2>
            <Link href="/projects" className="text-sm">
              See All
            </Link>
          </div>
          <div className="lg:flex flex-wrap gap-4">
            {isLoading ? (
              <Loader />
            ) : myGroups.length === 0 ? (
              <div className="bg-white min-h-[240px] border border-milk shadow-card-shadow text-center rounded-xl p-4">
                <Image src={EmptyState} className="mx-auto" alt="empty" />
                <h6 className="mt-2 mb-1">
                  Projects you create or join will appear here
                </h6>
                <p className="text-xs mb-2">
                  Create a new project or join a project now
                </p>
                <Link href="/projects/new" className="text-sm">
                  Create
                </Link>
              </div>
            ) : (
              myGroups.slice(0, 2)?.map((group, i) => (
                <div
                  className="lg:w-[calc(33.33%-12px)] mb-4 lg:mb-0 w-full p-4 rounded-xl border-milk border bg-white text-start"
                  key={i}
                >
                  <Link href={`/projects/${group.uuid}`}>
                    <div className="lg:h-[118px] h-[187px] mb-2">
                      <Image
                        src={group.photo || Pic}
                        width="0"
                        unoptimized
                        height="0"
                        alt="banner"
                        className="h-full w-full rounded-lg object-cover object-top overflow-hidden"
                      />
                    </div>
                    <div className="rounded-b-[10px]">
                      <p className="text-xs text-[#667185]">
                        {underscoreToCapital(group.category)}
                      </p>
                      <h2 className="text-base font-medium">
                        {group.project?.name}
                      </h2>
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
          <div className="flex justify-between mt-8 mb-4 items-center">
            <h2 className="text-black text-xl font-medium">
              Projects you might like
            </h2>
            <Link className="text-sm" href="/explore">
              See More
            </Link>
          </div>
          {isLoading ? (
            <Loader />
          ) : groups.length === 0 ? (
            <div className="bg-white mb-4 min-h-[240px] border border-milk shadow-card-shadow text-center rounded-xl p-4">
              <Image src={EmptyState} className="mx-auto" alt="empty" />
              <h6 className="mt-2">
                Projects you create or join will appear here
              </h6>
              <p className="text-xs mt-1 mb-2">
                Create a new project or join a project now
              </p>
              <Link href="/projects/new" className="text-sm">
                Create
              </Link>
            </div>
          ) : (
            groups.slice(0, 2)?.map((group, i) => (
              <div
                className="w-full mb-4 p-4 rounded-xl border-milk border bg-white text-start"
                key={i}
              >
                <Link
                  className="lg:flex gap-4"
                  href={`/projects/${group.uuid}`}
                >
                  <div className="min-h-[118px] lg:min-w-[125px] min-w-[118px]">
                    <Image
                      src={group.photo || Pic}
                      width="0"
                      height="0"
                      unoptimized
                      alt="banner"
                      className="lg:h-full h-[125px] w-[125px] rounded-lg object-cover object-top overflow-hidden"
                    />
                  </div>
                  <div>
                    <h2 className="text-base lg:mt-0 mt-3 font-medium">
                      {group.project?.name}
                    </h2>
                    <p className="text-sm line-clamp-4">
                      {group.project?.description}
                    </p>
                    <div className="flex mt-4 justify-between items-center">
                      <div className="flex">
                        {group?.members?.slice(0, 2).map((member, i) => (
                          <Image
                            className={`rounded-full h-8 w-8 border border-white ${
                              i > 0 && "-ml-3"
                            }`}
                            src={member.avatar || Pic}
                            height={32}
                            width={32}
                            alt="avatar"
                            unoptimized
                            key={i}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <p className="text-sm">{group.updates?.length}</p>
                          <MessageCircle size={20} color="#667185" />
                        </div>
                        <div className="flex items-start gap-1">
                          <p className="text-sm">{group.votes}</p>
                          <ThumbsUp size={16} color="#667185" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
        <div className="shadow-card-shadow h-fit rounded-xl text-center lg:w-2/5 mb-4 bg-white border-milk border p-8">
          <Image src={StarDestroyer} className="mx-auto" alt="Star Destroyer" />
          <p className="text-xs pt-6 pb-1">Recent achievements</p>
          <p className="text-gray900 mb-4">Star Destroyer</p>
          <div className="flex justify-evenly">
            <div>
              <p className="text-lg text-gray900">0</p>
              <p className="text-sm">Total Points</p>
            </div>
            <div>
              <p className="text-lg text-gray900">0</p>
              <p className="text-sm">Global Rank</p>
            </div>
          </div>
          <p className="mt-6 text-sm mb-2 text-[#1D2739]">
            Next Level: Sauron Conqueror
          </p>
          <div className="bg-milk w-full h-3 rounded-[20px]"></div>
          <p className="mt-2 text-xs">Complete 5 new projects</p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
