"use client";

import Image from "next/image";
import Pic from "@/assets/avatar.jpeg";
import API from "@/utils/api";
import { Group } from "@/models/Group";
import { toast } from "react-toastify";
import { underscoreToCapital } from "@/utils";
import { useGetSingleProject } from "@/hooks/useCurrentProject";
import "@/app/globals.css";
import { useApplyToProject, useUpvoteProject } from "@/hooks/useUpdateProject";
import { ThumbsUp } from "react-feather";
import useCurrentUser from "@/hooks/useCurrentUser";
import moment from "moment";
import Link from "next/link";
import { renderList } from "./project/Details";
import NotLoggedInModal from "./NotLoggedInModal";
import { useState } from "react";

export default function ExploreProject({ params }: { params: { id: string } }) {
  const { data } = useGetSingleProject(params.id);
  const group: Group | null = data?.data?.data;
  const user = useCurrentUser();
  const [showModal, setShowModal] = useState(false);

  const {
    mutate,
    isPending: isUpvotePending,
    isSuccess,
  } = useUpvoteProject(params.id);
  const { mutate: apply, isPending: isApplyPending } = useApplyToProject(
    params.id
  );
  const isDisabled = group?.invitations?.pending?.includes(user?._id);

  return (
    <div className={!user ? "bg-[#F9FAFB] lg:mx-32" : ""}>
      <div className="lg:px-8 px-4 lg:pt-8 pt-4">
        <p className="text-xs">{underscoreToCapital(group?.category)}</p>
        <h2 className="mb-6 lg:text-2xl text-xl text-black">
          {group?.project?.name}
        </h2>
      </div>
      <div className="lg:flex gap-8 lg:pt-6 pt-0 lg:p-8 p-4">
        <div className="w-full">
          <Image
            src={group?.photo || Pic}
            width="0"
            height="0"
            unoptimized
            className="lg:h-[360px] h-[240px] w-full rounded-lg"
            alt="banner"
          />
          <div>
            <div className="mt-8">
              <h5 className="font-medium mb-2 text-lg">About Project</h5>
              <p className="text-sm">{group?.project?.shortDescription}</p>
            </div>
            <div className="mt-8">
              <h5 className="font-medium mb-2 text-lg">Project Brief</h5>
              <p className="text-sm">{group?.project?.description}</p>
            </div>
            <div className="mt-8">
              <h5 className="font-medium mb-2 text-lg">Impact</h5>
              <p className="text-sm">{group?.project?.impact}</p>
            </div>
            <div className="mt-8">
              <h5 className="font-medium mb-2 text-lg">Problem</h5>
              <p className="text-sm">{group?.project?.problem}</p>
            </div>
            <div className="mt-8">
              <h5 className="font-medium mb-2 text-lg">Solution</h5>
              <p className="text-sm">{group?.project?.solution}</p>
            </div>
            <div className="mt-8">
              <h5 className="font-medium mb-2 text-lg">Estimated Timeline</h5>
              <p className="text-sm">{group?.project?.estimated_timeline}</p>
            </div>
            <div className="mt-8">
              <h5 className="font-medium mb-2 text-lg">Key Features</h5>
              <p className="text-sm">
                {renderList(group?.project?.keyFeatures)}
              </p>
            </div>
          </div>
          <div className="my-6">
            <h5 className="font-medium mb-2 text-lg">Team members</h5>
            <div className="flex flex-wrap gap-4">
              {group?.members?.map((member, i) => (
                <Link
                  key={i}
                  href={`/profile/${member._id}`}
                  className="lg:w-1/3 w-full"
                >
                  <div className="bg-white rounded-10 p-4 border border-milk">
                    <Image
                      src={member.avatar || Pic}
                      alt="logo"
                      height="0"
                      width="0"
                      unoptimized
                      className="object-cover rounded-lg w-full h-[190px] object-center"
                    />
                    <p className="mt-4 mb-1 text-gray900">{member.name}</p>
                    <p className="text-xs">{member.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {showModal && <NotLoggedInModal onClose={() => setShowModal(false)} />}
        <div className="lg:w-[350px]">
          <div className="bg-white border border-borderColor p-6 rounded-xl min-w-fit h-fit">
            <div className="flex gap-12 justify-center">
              <div>
                <h6 className="text-2xl text-center">{group?.votes || 0}</h6>
                <p className="text-[#667185]">Upvotes</p>
              </div>
              <div>
                <h6 className="text-2xl text-center">
                  {group?.updates?.length}
                </h6>
                <p className="text-[#667185]">Updates</p>
              </div>
            </div>
            <div className="flex gap-1 mt-6 justify-center text-nowrap">
              <button
                onClick={() => (user ? mutate() : setShowModal(true))}
                disabled={
                  isSuccess ||
                  user?.votedProjects?.includes(group?.uuid ?? "null")
                }
                className="border rounded-lg disabled:opacity-35 disabled:cursor-not-allowed border-[#D0D5DD] px-8 py-3 text-[#344054] bg-transparent font-semibold text-sm"
              >
                {isUpvotePending ? (
                  <span className="loader dark small"></span>
                ) : isSuccess ||
                  user?.votedProjects?.includes(group?.uuid ?? "null") ? (
                  "Voted"
                ) : (
                  <div className="flex items-center gap-2">
                    <ThumbsUp size={18} color="#344054" />{" "}
                    <p className="font-medium mt-[3px]">Upvote</p>
                  </div>
                )}
              </button>
              <button
                onClick={() => (user ? apply() : setShowModal(true))}
                disabled={isDisabled}
                className="bg-purple500 disabled:bg-gray600 disabled:opacity-40 text-white flex items-center gap-1 py-3 px-6 rounded-lg"
              >
                {isApplyPending ? (
                  <span className="loader small"></span>
                ) : isDisabled ? (
                  "Pending"
                ) : (
                  "Join Project"
                )}
              </button>
            </div>
          </div>
          <div className="bg-white border border-borderColor mt-8 p-6 rounded-xl min-w-fit h-fit">
            <h2 className="text-xl mb-8">Updates</h2>
            {group?.updates?.map((update, i) => (
              <div
                key={i}
                className="bg-white border mb-4 border-milk p-4 rounded-xl shadow-card-shadow"
              >
                <h5 className="font-medium">{update.title}</h5>
                <p className="text-sm mt-1 mb-4">{update.details}</p>
                <div className="flex items-center gap-2">
                  <Image
                    src={Pic}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <h5 className="font-medium text-sm">{update.author.name}</h5>
                  <p className="text-sm ml-auto">
                    {moment(update.date).format("DD/MM/YY")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
