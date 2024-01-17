"use client";

import Image from "next/image";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import EmptyState from "@/assets/empty-update.png";
import { useEffect, useState } from "react";
import API from "@/utils/api";
import { Group } from "@/models/Group";
import { toast } from "react-toastify";

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
  const [project, setProject] = useState<Group["project"] | null>();
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    console.log(params);
    API.get(`/groups/${params.id}`)
      .then((res) => {
        console.log(res);
        res.status === 200 && setProject(res.data.data.project);
      })
      .catch((err) => toast.error(err.message));
  }, [params]);

  const formatKey = (key: string) => {
    // Convert keys with underscores to spaced words
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  };

  return (
    <div className="flex">
      <div className="px-8 pt-7">
        <div className="justify-between flex items-center">
          <div>
            <h2>Projects</h2>
            <p className="text-[#667185]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <div className="my-8">
          <div className="h-[300px]">
            <Image
              src={Pic}
              alt="banner"
              className="h-full w-full rounded-t-[10px] object-cover object-top overflow-hidden"
            />
          </div>
          <div>
            {project &&
              Object.entries(project).map(([key, value]) => (
                <div key={key}>
                  <h2 className="text-xl mt-8 mb-2 capitalize">
                    {formatKey(key)}
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
              <h6 className="text-2xl text-center">65</h6>
              <p className="text-[#667185]">Upvotes</p>
            </div>
            <div>
              <h6 className="text-2xl text-center">65</h6>
              <p className="text-[#667185]">Updates</p>
            </div>
          </div>
          <div className="flex gap-1 mt-6 justify-center text-nowrap">
            <button
              onClick={() => toast.success("Glad you liked it!")}
              className="border rounded-lg border-[#D0D5DD] px-8 py-3 text-[#344054] bg-transparent font-semibold text-sm"
            >
              Upvote
            </button>{" "}
            <button
              onClick={handleClick}
              className="bg-[#353799] text-white flex items-center gap-1 py-3 px-6 rounded-lg"
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
