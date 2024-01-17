import { Group } from "@/models/Group";
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

  const formatKey = (key: string) => {
    // Convert keys with underscores to spaced words
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (match) => match.toUpperCase());
  };

  return (
    <>
      <p
        className="text-sm cursor-pointer font-semibold text-20blue"
        onClick={() => setShowModal(true)}
      >
        See More Details
      </p>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-clip fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[620px] my-6 mx-auto h-4/5 overflow-scroll max-w-3xl">
              {/*content*/}
              <div className="border border-[#E4E7EC] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="p-5 border-b text-center">
                  <h3 className="text-3xl font-semibold">Project Details</h3>
                  <p className="text-xs">
                    Here are the details of your project
                  </p>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  {project &&
                    Object.entries(project).map(
                      ([key, value]) =>
                        key !== "id" && (
                          <div key={key}>
                            <h2 className="text-xl mt-8 mb-2 capitalize">
                              {formatKey(key)}
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
