import React, { useState } from "react";
import Button from "../Button";
import { Group } from "@/models/Group";
import EditProjectModal from "../EditProjectModal";
import { useUpdateProject } from "@/hooks/useUpdateProject";

export const renderList = (listItems: string[] | undefined) => {
  return (
    <ul className="ml-4">
      {Array.isArray(listItems) &&
        listItems?.map((item, index) => (
          <li key={index} className="list-disc">
            {item}
          </li>
        ))}
    </ul>
  );
};

function Details({ group }: { group: Group }) {
  const [showModal, setShowModal] = useState(false);
  const { mutate } = useUpdateProject();
  const handleChange = (e: any) => {
    mutate({ id: group.uuid, data: e.target.value });
  };

  return (
    <div className="lg:p-8 p-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-medium mb-1 lg:text-xl text-xl text-black">
            Project Details
          </p>
          <p className="text-sm">An overview of your project</p>
        </div>
        <Button>Edit Details</Button>
      </div>
      <EditProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        project={group.project}
        handleChange={handleChange}
      />
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">About Project</h5>
        <p className="text-sm">{group.project?.short_description}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Project Brief</h5>
        <p className="text-sm">{group.project?.description}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Impact</h5>
        <p className="text-sm">{group.project?.impact}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Problem</h5>
        <p className="text-sm">{group.project?.problem}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Solution</h5>
        <p className="text-sm">{group.project?.solution}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Estimated Timeline</h5>
        <p className="text-sm">{group.project?.estimated_timeline}</p>
      </div>
      <div className="mt-8">
        <h5 className="font-medium mb-2 text-lg">Key Features</h5>
        <p className="text-sm">{renderList(group.project?.key_features)}</p>
      </div>
    </div>
  );
}

export default Details;
