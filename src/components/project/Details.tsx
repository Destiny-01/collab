import React from "react";
import Button from "../Button";
import { Group } from "@/models/Group";

function Details({ group }: { group: Group }) {
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
      <div className="my-8">
        <h5 className="font-medium mb-2 text-lg">About Project</h5>
        <p className="text-sm">{group.project?.shortDescription}</p>
      </div>
      <div>
        <h5 className="font-medium mb-2 text-lg">Project Brief</h5>
        <p className="text-sm">{group.project?.description}</p>
      </div>
    </div>
  );
}

export default Details;
