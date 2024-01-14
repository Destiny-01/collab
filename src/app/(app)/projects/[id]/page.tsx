"use client";

import Image from "next/image";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import EmptyState from "@/assets/empty-update.png";

const renderList = (listItems: string[]) => {
  return (
    <ul className="ml-4">
      {listItems.map((item, index) => (
        <li key={index} className="list-disc">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default function Projects() {
  const project = {
    problem: "Isolation and Lack of Connection in Remote Work Environments",
    short_description:
      "A virtual coworking platform for remote teams to work together as if they were in the same physical office.",
    solution:
      "A virtual coworking platform that replicates the collaborative atmosphere of a physical office, allowing remote workers to connect, collaborate, and share experiences in real-time.",
    impact:
      "Fosters a sense of community and reduces feelings of isolation among remote workers, ultimately enhancing productivity and job satisfaction.",
    key_features: [
      "Virtual collaborative workspaces",
      "Real-time video conferencing",
      "Shared task boards",
      "Customizable avatars for personalization",
      "Interactive team-building activities",
      "File sharing and collaboration tools",
      "Integrated messaging and notification system",
    ],
    complexity: "Moderate",
    estimated_timeline: "6-8 months",
    description:
      "The virtual coworking platform aims to bridge the gap created by remote work by providing a digital space where individuals can seamlessly collaborate, communicate, and build a sense of community.",
  };

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
            {Object.entries(project).map(([key, value]) => (
              <div key={key}>
                <h2 className="text-xl mt-8 mb-2 capitalize">
                  {formatKey(key)}
                </h2>
                <p className="text-[#667185]">
                  {typeof value !== "string" ? renderList(value) : value}
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
            <button className="border rounded-lg border-[#D0D5DD] px-8 py-3 text-[#344054] bg-transparent font-semibold text-sm">
              Upvote
            </button>{" "}
            <button className="bg-[#353799] text-white flex items-center gap-1 py-3 px-6 rounded-lg">
              Join Project
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
