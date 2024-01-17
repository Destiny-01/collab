"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Filter, PlusCircle } from "react-feather";
import Select from "react-select";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import Modal from "@/components/Modal";
import API from "@/utils/api";
import { toast } from "react-toastify";
import { Group } from "@/models/Group";
import Link from "next/link";

export default function Projects() {
  const [activeTab, setActiveTab] = useState(1);
  const options = [
    { value: "design", label: "Design" },
    { value: "software_development", label: "Software Development" },
    { value: "science", label: "Science/Tech" },
    { value: "human_rights", label: "Human Rights" },
    { value: "education", label: "Education" },
    { value: "business", label: "Business" },
    { value: "media", label: "Media" },
    { value: "environment", label: "Environment" },
    { value: "sociology", label: "Sociology" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState<Array<Group> | null>();
  const [myGroups, setMyGroups] = useState<Array<Group> | null>();

  useEffect(() => {
    API.get(`/groups`)
      .then((res) => {
        console.log(res);
        res.status === 200 && setGroups(res.data.data);
      })
      .catch((err) => toast.error(err.message));

    API.get(`/groups/mine`)
      .then((res) => {
        console.log(res);
        res.status === 200 && setMyGroups(res.data.data);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  return (
    <div className="px-8 pt-7">
      <div className="justify-between flex items-center">
        <div>
          <h2>Projects</h2>
          <p className="text-[#667185]">
            Find projects in your niche and projects you&apos;re part of
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#353799] text-white flex items-center gap-1 py-2.5 px-3 rounded-lg"
        >
          <PlusCircle size={20} /> New Project
        </button>
        <Modal showModal={showModal} setShowModal={setShowModal} />
      </div>
      <div className="mt-8 border-b border-[#E4E7EC]">
        <div className="flex justify-between items-center">
          <div className="flex">
            <div
              className={`p-4 cursor-pointer ${
                activeTab === 1 && "border-b border-[#5758AA] transition-all"
              }`}
              onClick={() => setActiveTab(1)}
            >
              <p
                className={`${
                  activeTab === 1
                } ? "text-[#5758AA]" : "text-[#344054]"`}
              >
                All Projects
              </p>
            </div>
            <div
              className={`p-4 cursor-pointer ${
                activeTab === 2 && "border-b border-[#5758AA] transition-all"
              }`}
              onClick={() => setActiveTab(2)}
            >
              <p
                className={`${
                  activeTab === 2
                } ? "text-[#5758AA]" : "text-[#344054]"`}
              >
                My Projects
              </p>
            </div>
          </div>
          <div className="flex">
            <Select
              defaultValue={options[0]}
              onChange={(newVal) => setSelectedOption(newVal || options[0])}
              options={options}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#F9FAFB",
                  primary: "white",
                },
                borderRadius: 8,
              })}
              styles={{
                option: (styles) => ({ ...styles, color: "#344054" }),
              }}
            />
            <button className="ml-4 border rounded-lg flex gap-1 items-center border-[#5758AA] px-3 py-2 text-[#5758AA] bg-transparent font-semibold text-sm">
              <Filter color="#5758AA" size={20} /> Filter
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-4 my-8">
        {activeTab === 1
          ? groups?.map((group, i) => (
              <Link href={`/projects/${group.uuid}`} key={i}>
                {" "}
                <div className="w-[33%]">
                  <div className="h-[200px]">
                    <Image
                      src={Pic}
                      alt="banner"
                      className="h-full w-full rounded-t-[10px] object-cover object-top overflow-hidden"
                    />
                  </div>
                  <div className="bg-white p-4 rounded-b-[10px]">
                    <p className="text-xs text-[#667185]">{group.category}</p>
                    <h2>{group.project?.name}</h2>
                    <p className="text-[#667185]">
                      {group.project?.description}
                    </p>
                    <div className="flex mt-2 pt-2 justify-between border-t border-[#F0F2F5] items-center">
                      <div className="flex">
                        <Image
                          className="rounded-full h-10 w-10 border border-white"
                          src={Pic}
                          height={40}
                          width={40}
                          alt="avatar"
                        />
                        <Image
                          className="rounded-full h-10 w-10 border border-white -ml-3"
                          src={Pic}
                          height={40}
                          width={40}
                          alt="avatar"
                        />
                        <Image
                          className="rounded-full h-10 w-10 border border-white -ml-3"
                          src={Pic}
                          height={40}
                          width={40}
                          alt="avatar"
                        />
                      </div>
                      <p>50 Upvotes</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          : myGroups?.map((group, i) => (
              <Link href={`/projects/${group.uuid}`} key={i}>
                {" "}
                <div className="w-[33%]">
                  <div className="h-[200px]">
                    <Image
                      src={Pic}
                      alt="banner"
                      className="h-full w-full rounded-t-[10px] object-cover object-top overflow-hidden"
                    />
                  </div>
                  <div className="bg-white p-4 rounded-b-[10px]">
                    <p className="text-xs text-[#667185]">{group.category}</p>
                    <h2>{group.project?.name}</h2>
                    <p className="text-[#667185]">
                      {group.project?.description}
                    </p>
                    <div className="flex mt-2 pt-2 justify-between border-t border-[#F0F2F5] items-center">
                      <div className="flex">
                        <Image
                          className="rounded-full h-10 w-10 border border-white"
                          src={Pic}
                          height={40}
                          width={40}
                          alt="avatar"
                        />
                        <Image
                          className="rounded-full h-10 w-10 border border-white -ml-3"
                          src={Pic}
                          height={40}
                          width={40}
                          alt="avatar"
                        />
                        <Image
                          className="rounded-full h-10 w-10 border border-white -ml-3"
                          src={Pic}
                          height={40}
                          width={40}
                          alt="avatar"
                        />
                      </div>
                      <p>50 Upvotes</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
