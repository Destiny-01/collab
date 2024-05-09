import { Group } from "@/models/Group";
import { underscoreToCapital } from "@/utils";
import React, { useState } from "react";

export default function SingleProjectModal({
  project,
}: {
  project: Group["project"];
}) {
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <a
        href="#"
        className="text-sm font-medium"
        onClick={() => setShowModal(true)}
      >
        More Details
      </a>
      {showModal ? (
        <>
          <div className="justify-center cursor-default items-center flex overflow-clip fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[620px] my-6 mx-auto h-4/5 overflow-scroll no-scrollbar max-w-3xl">
              {/*content*/}
              <div className="border border-[#E4E7EC] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="p-5 border-b text-center">
                  <h3 className="text-2xl font-semibold text-gray900">
                    Project Details
                  </h3>
                  <p className="text-xs">
                    Here are the details of your project
                  </p>
                </div>
                {/*body*/}
                <div className="relative p-6 pt-2">
                  {project &&
                    Object.entries(project).map(
                      ([key, value]) =>
                        key !== "_id" && (
                          <div key={key}>
                            <h2 className="text-lg font-medium mt-4 mb-0 capitalize">
                              {underscoreToCapital(key)}
                            </h2>
                            <p className="text-[#667185]">
                              {typeof value !== "string"
                                ? renderList(value)
                                : value}
                            </p>
                          </div>
                        )
                    )}
                </div>
                {/*footer*/}
                <div className="flex items-end gap-8 p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    onClick={() => setShowModal(false)}
                    className="border rounded-lg border-[#5758AA] w-full px-6 py-4 text-[#5758AA] bg-transparent font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 filter blur-sm z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
