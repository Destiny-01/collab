import options from "@/data/options";
import { useUpdateProject } from "@/hooks/useUpdateProject";
import { Group } from "@/models/Group";
import { underscoreToCapital } from "@/utils";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditProjectModal({
  showModal,
  setShowModal,
  project,
  handleChange: handleFinalChange,
}: {
  showModal: boolean;
  setShowModal: (value: boolean) => any;
  handleChange: (value: any) => any;
  project: Group["project"];
}) {
  const [data, setData] = useState<{
    [key: string]: string | string[] | undefined;
  }>({
    name: project?.name,
    problem: project?.problem,
    impact: project?.impact,
    estimated_timeline: project?.estimated_timeline,
    description: project?.description,
    shortDescription: project?.shortDescription,
    solution: project?.solution,
  });

  useEffect(() => {
    project && setData(project);
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-clip fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative max-h-[80%] overflow-y-scroll overflow-x-hidden w-[620px] my-6 m-auto max-w-3xl">
              {/*content*/}
              <div className="border mx-4 border-[#E4E7EC] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="p-5 border-b text-center">
                  <h3 className="text-3xl text-gray900 font-semibold">
                    Edit Project Details
                  </h3>
                  <p className="text-xs">
                    Edit the details of your project below
                  </p>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  <h2 className="text-base font-medium mt-4 mb-0 capitalize">
                    Name
                  </h2>
                  <input
                    className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                    name={"name"}
                    value={data.name}
                    onChange={handleChange}
                  />
                  <h2 className="text-base font-medium mt-4 mb-0 capitalize">
                    Short Description
                  </h2>
                  <input
                    className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                    name={"shortDescription"}
                    value={data.shortDescription}
                    onChange={handleChange}
                  />
                  <h2 className="text-base font-medium mt-4 mb-0 capitalize">
                    Description
                  </h2>
                  <textarea
                    name="description"
                    id="description"
                    value={data.description}
                    onChange={handleChange}
                    className="border h-28 placeholder:text-[#98A2B3] text-[#101928] w-full border-[#D0D5DD] px-3 py-3 outline-none rounded-md"
                  ></textarea>
                  <h2 className="text-base font-medium mt-4 mb-0 capitalize">
                    Problem
                  </h2>
                  <input
                    className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                    name={"problem"}
                    value={data.problem}
                    onChange={handleChange}
                  />
                  <h2 className="text-base font-medium mt-4 mb-0 capitalize">
                    Solution
                  </h2>
                  <input
                    className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                    name={"solution"}
                    value={data.solution}
                    onChange={handleChange}
                  />
                  <h2 className="text-base font-medium mt-4 mb-0 capitalize">
                    Impact
                  </h2>
                  <input
                    className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                    name={"impact"}
                    value={data.impact}
                    onChange={handleChange}
                  />
                  <h2 className="text-base font-medium mt-4 mb-0 capitalize">
                    Estimated Timeline
                  </h2>
                  <input
                    className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                    name={"estimated_timeline"}
                    value={data.estimated_timeline}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center gap-8 p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    onClick={() => setShowModal(false)}
                    className="border rounded-lg border-[#5758AA] w-full px-6 py-4 text-[#5758AA] bg-transparent font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleFinalChange({
                        target: { name: "project", value: data },
                      });
                      setShowModal(false);
                    }}
                    className="rounded-lg bg-purple500 w-full px-6 py-4 text-white font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </div>
              {/*footer*/}
            </div>
          </div>
          <div className="opacity-20 fixed inset-0 filter blur-sm z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
