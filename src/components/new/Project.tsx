"use client";

import { Group } from "@/models/Group";
import SingleProjectModal from "../SingleProjectModal";
import { underscoreToCapital } from "@/utils";

function Project({
  selectedProject,
  setSelectedProject,
  category,
  projects,
  setSelectedTab,
}: any) {
  return (
    <div className="flex flex-col gap-4">
      {projects?.map((project: Group["project"], i: number) => (
        <div
          key={i}
          onClick={() => setSelectedProject(i)}
          className={`border-solid  border-1 flex flex-col gap-6  lg:gap-1.5 ${
            selectedProject === i
              ? "border-borderblue bg-milk"
              : "border-50blue bg-white"
          } rounded-10 p-4 cursor-pointer`}
        >
          <h1 className="text-200grey text-xs">
            {underscoreToCapital(category)}
          </h1>
          <h6 className="text-xl font-semibold text-900grey">
            {project?.name}
          </h6>
          <p className="text-sm text-200grey lg:w-[544px]">
            {project?.description}
          </p>
          <div className="flex justify-between">
            <SingleProjectModal project={project} />
            <input
              className="rounded-full w-7 h-7"
              checked={selectedProject === i}
              type="checkbox"
              readOnly
            ></input>
          </div>
        </div>
      ))}
      <div className="bg-tgrey border-1 border-solid my-8"></div>
      <div className="flex gap-8">
        <button className="bg-shade text-borderblue border-bscolor border-[1.5px] border-solid    w-[70%]  lg:px-6 lg:py-4 text-base font-semibold rounded-lg flex justify-center items-center">
          Cancel
        </button>
        <button
          onClick={() => setSelectedTab(1)}
          className="bg-dimeblue   w-full  px-6 py-4 text-base font-semibold rounded-lg flex justify-center items-center"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

export default Project;
