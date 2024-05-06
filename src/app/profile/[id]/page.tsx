"use client";

import { useGetUser } from "@/hooks/useGetUser";
import MainLayout from "@/layouts/MainLayout";
import { User, UserDocument } from "@/models/User";
import Image from "next/image";
import React from "react";
import Pic from "@/assets/avatar.jpeg";
import {
  Calendar,
  CheckSquare,
  MapPin,
  MessageSquare,
  Share2,
  ThumbsUp,
} from "react-feather";
import moment from "moment";
import { underscoreToCapital } from "@/utils";
import Loader from "@/components/Loader";
import Link from "next/link";
import { Group } from "@/models/Group";
import { useGetAllGroups } from "@/hooks/useCurrentProject";
import useResponsive from "@/hooks/useResponsive";
import EmptyState from "@/assets/empty-project.png";

function UserProfile({ params }: { params: { id: string } }) {
  const { isMobile } = useResponsive();
  const { data } = useGetUser(params.id);
  const user: UserDocument | null = data?.data?.data;
  const { data: groupsData, isLoading } = useGetAllGroups(params.id);

  const groups: Group[] = groupsData?.data?.data || [];

  return (
    <MainLayout>
      <div className="bg-white items-center lg:flex border-b gap-4 border-borderColor p-8">
        <Image
          src={user?.avatar || Pic}
          alt="banner"
          width={130}
          unoptimized
          height={130}
          sizes="100vw"
          className="h-[130px] w-[130px] rounded-[10px] object-cover object-top"
        />
        <div>
          <h2>{user?.name}</h2>
          <p className="text-sm">{user?.title}</p>
          <div className="my-4 flex gap-6">
            <p> @{user?.username}</p>
            <div className="flex items-center gap-1">
              <Calendar size={20} color="#667185" />
              <p className="text-sm">
                Joined {moment(user?.createdAt).format("MMM YYYY")}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={20} color="#667185" />
              <p className="text-sm">{user?.country}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 my-3">
            {user?.interests?.map((interest, i) => (
              <div key={i} className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
                <p className="text-[#232566] capitalize text-xs font-medium">
                  {underscoreToCapital(interest)}
                </p>
              </div>
            ))}
          </div>
        </div>
        {!isMobile && (
          <button
            // onClick={() => setShowModal(true)}
            className="border h-fit lg:ml-auto rounded-lg flex gap-2 items-center border-borderColor px-3 py-2 text-[#344054] bg-transparent font-semibold text-sm"
          >
            <Share2 size={18} color="#344054" />
            Share
          </button>
        )}
      </div>
      <div className="p-8 lg:flex gap-8">
        <div className="w-full">
          <div className="mb-8">
            <h5 className="font-medium mb-2 text-xl">About Me</h5>
            <p className="text-sm">{user?.bio}</p>
          </div>
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-black text-xl font-medium"> Projects</h2>
          </div>
          <div className="lg:flex flex-wrap gap-4">
            {isLoading ? (
              <Loader />
            ) : groups.length === 0 ? (
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
              groups.slice(0, 2)?.map((group, i) => (
                <div
                  className="lg:w-[calc(33.33%-12px)] mb-4 lg:mb-0 w-full p-4 rounded-xl border-milk border bg-white text-start"
                  key={i}
                >
                  <Link href={`/projects/${group.uuid}`}>
                    <div className="lg:h-[118px] h-[187px] mb-2">
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
                              unoptimized
                              height={32}
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
        <div className="min-w-[350px]">
          <div className="bg-white border border-borderColor p-6 rounded-xl min-w-fit h-fit">
            <h2 className="text-xl mb-8">Contact Details</h2>
            <p className="uppercase text-sm">Email Address</p>
            <p className="text-gray900">{user?.email}</p>
          </div>
          <div className="bg-white border border-borderColor mt-8 p-6 rounded-xl min-w-fit h-fit">
            <h2 className="text-xl mb-8">Stats</h2>
            <div className="flex gap-4">
              <div className="bg-[#f9fafb] w-full rounded-lg p-3 items-center flex gap-4 border border-milk">
                <CheckSquare size={20} color="#667185" />
                <div>
                  <h2 className="text-black">{user?.groups.length}</h2>
                  <p className="text-sm mb-1">Projects</p>
                </div>
              </div>
              <div className="bg-[#f9fafb] w-full rounded-lg p-3 items-center flex gap-4 border border-milk">
                <ThumbsUp size={20} color="#667185" />
                <div>
                  <h2 className="text-black mt-1">
                    {user?.votedProjects.length}
                  </h2>
                  <p className="text-sm mb-1">Upvotes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserProfile;
