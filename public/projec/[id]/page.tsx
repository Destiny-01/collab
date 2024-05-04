"use client";

import Image from "next/image";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import EmptyState from "@/assets/empty-update.png";
import { useEffect, useState } from "react";
import API from "@/utils/api";
import { Group } from "@/models/Group";
import { toast } from "react-toastify";
import { underscoreToCapital } from "@/utils";
import { useGetSingleProject } from "@/hooks/useCurrentProject";
import { useSession } from "next-auth/react";
import { UserDocument } from "@/models/User";
import { useUpvoteProject } from "@/hooks/useUpdateProject";

const renderList = (listItems: string[]) => {
  return (
    <ul className="ml-4">
      {Array.isArray(listItems) &&
        listItems.map((item, index) => (
          <li key={index} className="list-disc">
            {item}
          </li>
        ))}
    </ul>
  );
};

export default function Projects({ params }: { params: { id: string } }) {
  const { data } = useGetSingleProject(params.id);
  const group: Group | null = data?.data?.data;
  const project = group?.project;
  const [isLoading, setIsLoading] = useState(false);
  const { data: sessionData } = useSession();
  const { mutate, isPending: isUpvotePending } = useUpvoteProject(params.id);
  const user: UserDocument | null | undefined = sessionData?.user as any;

  const handleClick = () => {
    setIsLoading(true);
    API.get(`/groups/${params.id}/apply`)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        res.status === 200 &&
          toast.success(
            "We've notified the group owner you requested to join! Look out for your mail"
          );
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div className="flex">
      <div className="px-8 pt-7">
        <div className="justify-between flex items-center">
          <div>
            <h2 className="text-3xl">Projects</h2>
            <p className="text-[#667185]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="my-8">
          <div>
            {project &&
              Object.entries(project).map(([key, value]) => (
                <div key={key}>
                  <h2 className="text-xl mt-8 mb-2 capitalize">
                    {underscoreToCapital(key)}
                  </h2>
                  <p className="text-[#667185]">
                    {typeof value !== "string" && value
                      ? renderList(value)
                      : value}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="mr-8 mt-28">
        <div className="bg-white p-6 rounded-xl min-w-fit h-fit">
          <div className="flex gap-12 justify-center">
            <div>
              <h6 className="text-2xl text-center">{group?.votes || 0}</h6>
              <p className="text-[#667185]">Upvotes</p>
            </div>
            <div>
              <h6 className="text-2xl text-center">65</h6>
              <p className="text-[#667185]">Updates</p>
            </div>
          </div>
          <div className="flex gap-1 mt-6 justify-center text-nowrap">
            <button
              onClick={() => mutate()}
              disabled={user?.votedProjects?.includes(group?.uuid ?? "null")}
              className="border rounded-lg disabled:opacity-35 disabled:cursor-not-allowed border-[#D0D5DD] px-8 py-3 text-[#344054] bg-transparent font-semibold text-sm"
            >
              {isUpvotePending ? (
                <span className="loader dark small"></span>
              ) : user?.votedProjects?.includes(group?.uuid ?? "null") ? (
                "Voted"
              ) : (
                "Upvote"
              )}
            </button>
            <button
              onClick={handleClick}
              className="bg-purple500 disabled: text-white flex items-center gap-1 py-3 px-6 rounded-lg"
            >
              {isLoading ? (
                <span className="loader small"></span>
              ) : (
                "Join Project"
              )}
            </button>
          </div>
        </div>
        <div className="bg-white mt-8 p-6 rounded-xl min-w-fit h-fit">
          <h2 className="text-xl">Updates</h2>
          <div className="flex text-center my-16 flex-col items-center justify-center">
            <Image src={EmptyState} alt="empty-projects" />
            <p className="text-black mt-8 text-base text-nowrap font-medium">
              Project Updates Coming Soon
            </p>
            <p>Updates about this project will show here when available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
