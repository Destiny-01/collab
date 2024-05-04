import React, { useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import options from "@/data/options";
import Divider from "../Divider";
import { Group } from "@/models/Group";
import { underscoreToCapital } from "@/utils";
import SingleProjectModal from "../SingleProjectModal";
import { ChevronLeft } from "react-feather";

function Step2({ data, setStep, handleChange, group }: any) {
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!data.project) {
      toast.error("Please choose a project");
      return;
    }
    setStep(3);
  };

  return (
    <div className="bg-white w-full rounded-10 border border-milk px-6 py-8">
      <p className="font-medium text-lg text-[#1A1A21]">Select refined ideas</p>
      <p className="text-sm text-[#8C94A6]">
        Here are the project ideas we generated for you
      </p>
      <div className="my-8">
        {group.suggestedTopics?.map((project: Group["project"], i: number) => {
          const activeProject = group.suggestedTopics.findIndex(
            (topic: any) => topic.name === data.project?.name
          );
          console.log(activeProject);
          return (
            <div
              key={i}
              onClick={() =>
                handleChange({ target: { name: "project", value: project } })
              }
              className={`border flex gap-3 mb-4 lg:gap-2 ${
                activeProject === i
                  ? "border-purple500 bg-white"
                  : "border-[#D0D5DD] bg-white"
              } rounded-10 p-4 cursor-pointer`}
            >
              <div
                className={`w-5 h-5 flex mt-0.5 flex-shrink-0 items-center justify-center rounded-full border ${
                  activeProject === i ? "border-purple400" : "border-[#D0D5DD]"
                }`}
              >
                {activeProject === i && (
                  <div className="w-2.5 h-2.5 rounded-full bg-purple400"></div>
                )}
              </div>
              <div>
                <p className="font-medium text-gray900">{project?.name}</p>
                <p className="text-sm text-gray600 mb-2 mt-1">
                  {project?.description}
                </p>
                <SingleProjectModal project={project} />
              </div>
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="flex mt-6 justify-between items-center">
        <a href="#" onClick={() => setStep(1)}>
          <div className="flex items-center gap-1 text-sm">
            <ChevronLeft size={16} /> Back
          </div>
        </a>
        <button
          className="bg-purple500 text-white lg:py-3 py-2 lg:px-4 px-4 rounded-lg"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default Step2;
