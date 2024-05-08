import options from "@/data/options";
import { useCreateUpdate, useUpdateProject } from "@/hooks/useUpdateProject";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewUpdate({ showModal, setShowModal }: any) {
  const { id } = useParams();
  const { mutate, isPending, isSuccess } = useCreateUpdate(id);
  const [data, setData] = useState({
    title: "",
    details: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    isSuccess && setShowModal(false);
  }, [isSuccess, setShowModal]);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-clip fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[620px] my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border mx-4 border-[#E4E7EC] rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="p-5 border-b text-center">
                  <h3 className="text-3xl text-gray900 font-semibold">
                    Create New Update
                  </h3>
                  <p className="text-xs">
                    Tell the world the latest happenings of your project
                  </p>
                </div>
                {/*body*/}
                <div className="relative p-6">
                  <div>
                    <label htmlFor="">Title</label>
                    <input
                      className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
                      name="title"
                      placeholder="Title of the update?"
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="idea">Description</label>
                    <textarea
                      name="details"
                      id="details"
                      onChange={handleChange}
                      className="border h-28 placeholder:text-[#98A2B3] text-[#101928] w-full border-[#D0D5DD] px-3 py-3 outline-none rounded-md"
                      placeholder="What's the update?"
                    ></textarea>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center gap-8 p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    onClick={() => setShowModal(false)}
                    className="border rounded-lg border-[#5758AA] w-full px-6 py-4 text-[#5758AA] bg-transparent font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => mutate(data)}
                    className="rounded-lg bg-purple500 w-full px-6 py-4 text-white font-semibold"
                  >
                    {isPending ? (
                      <span className="loader small"></span>
                    ) : (
                      "Submit"
                    )}
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
