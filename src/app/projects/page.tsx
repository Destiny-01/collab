"use client";

import Button from "@/components/Button";
import { useGetAllGroups, useGetMyGroups } from "@/hooks/useCurrentProject";
import MainLayout from "@/layouts/MainLayout";
import { Group } from "@/models/Group";
import { underscoreToCapital } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MessageSquare } from "react-feather";
import Pic from "@/assets/avatar.jpeg";
import Loader from "@/components/Loader";
import EmptyState from "@/assets/empty-project.png";

function Projects() {
  const { data, isLoading } = useGetMyGroups();
  const groups: Group[] = data?.data?.data || [];

  return (
    <MainLayout>
      <div className="my-6 lg:px-8 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="max-w-[60%] break-word">
            <h2 className="mb-1 lg:text-2xl text-xl text-black">My Projects</h2>
            <p className="text-sm mb-2 lg:mb-0 ">
              View and manage projects you are a member of
            </p>
          </div>
          <Link href="/projects/new">
            <Button>New Project</Button>
          </Link>
        </div>
        <div className="lg:flex gap-4">
          {isLoading ? (
            <Loader />
          ) : groups.length === 0 ? (
            <div className="bg-white mb-4 w-full min-h-[240px] border border-milk shadow-card-shadow text-center rounded-xl p-4">
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
            groups?.map((group, i) => (
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
                            width={32}
                            unoptimized
                            alt="avatar"
                            key={i}
                          />
                        ))}{" "}
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
