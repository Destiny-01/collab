import options from "@/data/options";
import { useAppFeedback } from "@/hooks/useFeedback";
import useResponsive from "@/hooks/useResponsive";
import { useCreateUpdate, useUpdateProject } from "@/hooks/useUpdateProject";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FeedbackModal({ showModal, setShowModal }: any) {
  const { isMobile } = useResponsive();
  const { mutate, isPending, isSuccess } = useAppFeedback();
  const [data, setData] = useState({
    what: "",
    how: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    isSuccess && setShowModal(false);
  }, [isSuccess, setShowModal]);

  useEffect(() => {
    const card = document.getElementById("card");
    if (!isMobile) document.body.style.overflow = showModal ? "hidden" : "";
    if (card) card.style.zIndex = showModal ? "-1" : "0";
  }, [showModal, isMobile]);

  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-[999] overflow-hidden flex justify-center items-center">
            <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-md"></div>
            <div className="relative mx-4 lg:py-4 py-4 rounded-10 lg:px-4 px-4 max-h-[80%] lg:max-h-full overflow-scroll shadow-modal-shadow border border-milk bg-white w-[650px] max-w-lg">
              <div className="pb-4 border-b text-center">
                <h3 className="text-3xl text-gray900 font-semibold">
                  Drop a feedback
                </h3>
                <p className="text-xs">
                  Let us know your thoughts about Collabo
                </p>
              </div>
              {/*body*/}
              <div className="relative py-2">
                <div className="mt-4">
                  <h2 className="text-lg">What do you think about Collabo</h2>
                  <textarea
                    name="what"
                    id="what"
                    onChange={handleChange}
                    className="border h-28 placeholder:text-[#98A2B3] text-[#101928] w-full border-[#D0D5DD] px-3 py-3 outline-none rounded-md"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <h2 className="text-lg">
                    How do you think Collabo can help you?
                  </h2>
                  <textarea
                    name="how"
                    id="how"
                    onChange={handleChange}
                    className="border h-28 placeholder:text-[#98A2B3] text-[#101928] w-full border-[#D0D5DD] px-3 py-3 outline-none rounded-md"
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
        </>
      ) : null}
    </>
  );
}
