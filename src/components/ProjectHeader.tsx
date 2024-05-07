import useResponsive from "@/hooks/useResponsive";
import { Group } from "@/models/Group";
import Link from "next/link";
import React from "react";
import { Settings, Share2 } from "react-feather";

type Props = {
  group: Group | null;
};

function ProjectHeader({ group }: Props) {
  const { isMobile } = useResponsive();

  return (
    <div className="lg:p-8 p-4 lg:pb-0 bg-white pb-0 flex items-center justify-between">
      <div className="w-full">
        <div className="flex gap-1">
          <Link className="lg:text-sm text-xs" href={`/projects`}>
            Project
          </Link>
          <p className="lg:text-sm text-xs">/</p>
          <p className="lg:text-sm text-xs">Project Details</p>
        </div>
        <h5 className="font-semibold text-2xl max-w-[80%] break-word lg:mt-2">
          {group?.project?.name}
        </h5>
      </div>
      <div className="flex items-center gap-4">
        <button
          // onClick={() => setShowModal(true)}
          className="border rounded-full flex items-center border-borderColor p-2.5 text-[#344054] bg-transparent font-semibold text-sm"
        >
          <Settings size={18} color="#344054" />
        </button>
        <button
          // onClick={() => setShowModal(true)}
          className="border rounded-lg flex gap-2 items-center border-borderColor px-3 py-2 text-[#344054] bg-transparent font-semibold text-sm"
        >
          <Share2 size={18} color="#344054" />
          {!isMobile && "Share"}
        </button>
      </div>
    </div>
  );
}

export default ProjectHeader;
