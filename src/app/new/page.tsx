"use client";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Project from "@/components/new/Project";
import Team from "@/components/new/Team";
import Review from "@/components/new/Review";
import { useSession } from "next-auth/react";
import { Group } from "@/models/Group";
import { useGetMyGroups } from "@/hooks/useCurrentProject";
import { useUpdateProject } from "@/hooks/useUpdateProject";

export default function New() {
  const [selectedProject, setSelectedProjects] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const { data } = useGetMyGroups();
  const groups = data?.data?.data || [];
  const { isPending, mutate } = useUpdateProject();

  const group: Group = groups[groups.length - 1];
  const projects = group?.suggestedTopics;
  console.log(projects, groups, selectedProject);
  const project = projects && projects[selectedProject];
  const [name, setName] = useState(project?.name);
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState(project?.description);

  useEffect(() => {
    setName(project?.name);
    setDescription(project?.description);
  }, [project]);

  const renderHeader = () => {
    if (selectedTab === 0) {
      return (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">Select Project</h3>
          <p className="text-[#8C94A6]">
            Fill out these details to build your broadcast
          </p>
        </div>
      );
    } else if (selectedTab === 1) {
      return (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold">Choose Team members</h3>
          <p className="text-[#8C94A6]">
            These team members match your profile the best. Select up to 3
          </p>
        </div>
      );
    } else if (selectedTab === 2) {
      return (
        <div className="text-center">
          <h3 className="text-2xl font-semibold">Review Your Project</h3>
          <p className="text-[#8C94A6]">Review and start your project</p>
        </div>
      );
    }
  };
  const renderComponent = () => {
    if (selectedTab === 0) {
      return (
        <Project
          selectedProject={selectedProject}
          projects={projects}
          category={groups[groups.length - 1]?.category}
          setSelectedProject={setSelectedProjects}
          setSelectedTab={setSelectedTab}
        />
      );
    } else if (selectedTab === 1) {
      return (
        <Team
          setSelectedTab={setSelectedTab}
          selectedProject={selectedTab}
          setSelectedProject={setSelectedProjects}
        />
      );
    } else if (selectedTab === 2) {
      return (
        <Review
          name={name}
          groupName={groupName}
          setGroupName={setGroupName}
          description={description}
          setDescription={setDescription}
          setName={setName}
          setSelectedTab={setSelectedTab}
          isLoading={isPending}
          submit={() =>
            mutate({
              data: {
                ...group,
                name: groupName,
                project: { ...project, name, description },
              },
              id: group?.uuid,
            })
          }
        />
      );
    }
  };

  return (
    <div className="bg-milk h-auto w-full pb-[115px]">
      <Navbar isWhite={true} />
      <div className="flex flex-col pt-[24px] gap-9 px-2 lg:flex lg:flex-row justify-center lg:gap-8">
        <div className="p-6 rounded-10 bg-white min-w-[600px] ">
          {renderHeader()}
          {renderComponent()}
        </div>
        <div className="flex flex-col justify-between gap-36 bg-white p-6 rounded-10 border-solid border-1 border-mcolor ">
          <div className="flex flex-col gap-6">
            <div className="flex gap-9">
              <div
                className={`w-[48px] h-[48px] hover:text-white text-lcolor ${
                  selectedTab === 0 ? "bg-bl" : "bg-white"
                } hover:border-none cursor-pointer border-lcolor border-solid border-1 rounded-full flex justify-center font-bold text-xl items-center`}
              >
                1
              </div>
              <div>
                <h1 className="font-semibold text-base text-900grey">
                  Select Project
                </h1>
                <p className="text-xs text-mgrey">
                  Fill out these details and get your campaign ready
                </p>
              </div>
            </div>
            <div className="flex gap-9">
              <div
                className={`w-[48px] h-[48px] text-lcolor ${
                  selectedTab === 1 ? "bg-bl text-white" : "bg-white"
                } hover:border-none cursor-pointer border-lcolor border-solid border-1 rounded-full flex justify-center font-bold text-xl items-center`}
              >
                2
              </div>
              <div>
                <h1 className="font-semibold text-base text-900grey ">
                  Choose Team Members
                </h1>
                <p className="text-xs text-mgrey">
                  Get full control over your audience
                </p>
              </div>
            </div>
            <div className="flex gap-9">
              <div
                className={`w-[48px] h-[48px] text-lcolor ${
                  selectedTab === 2 ? "bg-bl text-white" : "bg-white"
                } hover:border-none cursor-pointer border-lcolor border-solid border-1 rounded-full flex justify-center font-bold text-xl items-center`}
              >
                3
              </div>
              <div>
                <h1 className="font-semibold text-base text-900grey">
                  Review Project
                </h1>
                <p className="text-xs text-mgrey">
                  Optimize your campaign reach with adsense
                </p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-base text-200grey">Need Help?</h1>
            <p className="text-sm max-w-[222px] pt-1 leading-[145%] text-lcolor">
              Get to know how your campaign can reach a wider audience.
            </p>
            <button className="bg-shade px-4 py-2 mt-3 text-sm font-semibold text-600grey border-600grey border-1 border-solid rounded-md ">
              {" "}
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
