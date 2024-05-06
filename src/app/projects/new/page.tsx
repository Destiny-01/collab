"use client";

import Step1 from "@/components/new/Step1";
import Step2 from "@/components/new/Step2";
import Step3 from "@/components/new/Step3";
import Step4 from "@/components/new/Step4";
import MainLayout from "@/layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { CheckSquare, File, Star, UserPlus } from "react-feather";
import { Group } from "@/models/Group";
import { useCreateProject, useUpdateProject } from "@/hooks/useUpdateProject";
import { toast } from "react-toastify";
import useCurrentUser from "@/hooks/useCurrentUser";

function NewProject() {
  const {
    data: groupsData,
    isPending,
    mutate,
    isSuccess,
    error,
  } = useCreateProject();
  const user = useCurrentUser();
  const { isPending: isUpdatePending, mutate: updateMutate } =
    useUpdateProject();

  const group: Group = groupsData?.data.data;
  const [data, setData] = useState({
    idea: "",
    phot: "",
    category: "",
    project: {},
    photo: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    isSuccess && setActiveTab(2);
    console.log(error);
    error && toast.error(error.message);
  }, [isSuccess, error]);
  console.log(group);
  const steps = [
    {
      icon: File,
      text: "Basic Details",
    },
    {
      icon: Star,
      text: "Select Refined Idea",
    },
    {
      icon: UserPlus,
      text: "Choose Team Members",
    },
    {
      icon: CheckSquare,
      text: "Review Project",
    },
  ];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <MainLayout>
      <div className={`lg:px-8 ${!user && "mx-32"}  px-4 py-6`}>
        <div className="mb-8">
          <h2 className="mb-1 lg:text-2xl text-xl text-black">
            Create New Project
          </h2>
          <p className="text-sm mb-2 lg:mb-0 ">
            Start your own project in less than a minute even without an idea
          </p>
        </div>
        <div className="lg:flex gap-8">
          {activeTab === 1 ? (
            <Step1
              data={data}
              setStep={setActiveTab}
              handleChange={handleChange}
              isPending={isPending}
              mutate={mutate}
            />
          ) : activeTab === 2 ? (
            <Step2
              data={data}
              group={group}
              setStep={setActiveTab}
              handleChange={handleChange}
            />
          ) : activeTab === 3 ? (
            <Step3
              data={data}
              setStep={setActiveTab}
              handleChange={handleChange}
              group={group}
            />
          ) : (
            <Step4
              data={data}
              setStep={setActiveTab}
              handleChange={handleChange}
              group={group}
              mutate={updateMutate}
              isPending={isUpdatePending}
            />
          )}
          <div className="lg:min-w-[350px] mt-4 lg:mt-0 h-fit border border-milk rounded-xl bg-white px-8 py-6">
            {steps.map((step, i) => (
              <div key={i}>
                <div className="flex gap-4 items-center">
                  <div
                    className={`${
                      activeTab === i + 1
                        ? "bg-[#F1E9FD]"
                        : activeTab > i + 1
                        ? "bg-purple500"
                        : "bg-transparent border border-borderColor"
                    } p-2.5 rounded-full`}
                  >
                    <step.icon
                      size={20}
                      color={
                        activeTab === 1
                          ? "#9065F2"
                          : activeTab > i + 1
                          ? "#ffffff"
                          : "#344054"
                      }
                    />
                  </div>
                  <div>
                    <p className="text-gray600 text-xs">Step {i + 1}</p>
                    <p className="text-sm text-gray900">{step.text}</p>
                  </div>
                </div>
                {steps.length > i + 1 && (
                  <div className="my-2 w-px h-10 bg-[#D0D5DD] mx-5"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default NewProject;
