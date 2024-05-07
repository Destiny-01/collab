"use client";

import MainLayout from "@/layouts/MainLayout";
import ReactSelect, { SingleValue } from "react-select";
import React, { useState } from "react";
import { useFeedback } from "@/hooks/useFeeback";
import { toast } from "react-toastify";
import Divider from "@/components/Divider";
import { Mail, Phone, Twitter } from "react-feather";

function HelpCenter() {
  const options = [
    { label: "Bug", value: "bug" },
    { label: "Suggestion", value: "suggestion" },
    { label: "Collaboration", value: "Collaboration" },
    { label: "Others", value: "Others" },
  ];
  const [type, setType] = useState<any>();
  const [message, setMessage] = useState("");
  const { mutate, isPending } = useFeedback();
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!type || !message) {
      toast.error("All fields are required");
      return;
    }

    mutate({ type: type.value, message: message });
  };

  return (
    <MainLayout>
      <div className="lg:px-8 py-6 px-4">
        <h2 className="mb-1 lg:text-2xl text-xl text-black">Need Help?</h2>
        <p className="text-sm mb-2 lg:mb-0 ">
          Ask your question or drop a feedback below
        </p>
        <div className="lg:flex gap-8 mt-6">
          <div className="bg-white mb-4 lg:mb-0 w-full rounded-10 pt-8 pb-4 px-6 border border-milk">
            <p className="text-lg font-medium text-[#1A1A21]">Feedback form</p>
            <p className="text-sm mt-1 text-[#8C94A6]">Leave a feedback?</p>
            <div className="my-4">
              <label className="">Feedback Type</label>
              <ReactSelect
                // defaultValue={options[0]}
                value={type}
                placeholder="Type of feedback"
                onChange={(newVal) => setType(newVal)}
                options={options}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: "#F9FAFB",
                    primary: "hsl(0, 0%, 90%)",
                  },
                  borderRadius: 8,
                })}
                styles={{
                  option: (styles) => ({
                    ...styles,
                    color: "#101928",
                    fontSize: "14px",
                  }),
                  input: (styles) => ({
                    ...styles,
                    width: "375px",
                    fontSize: "14px",
                    padding: "8px",
                  }),
                  singleValue: (styles) => ({
                    ...styles,
                    fontSize: "14px",
                    color: "#101928",
                    paddingLeft: "8px",
                  }),
                }}
              />
              <label className="mt-8" htmlFor="message">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border h-28 mb-1 text-sm text-[#101928] w-full border-[#D0D5DD] px-3 py-3 outline-none rounded-md"
              ></textarea>
            </div>
            <Divider />
            <button
              className="bg-purple500 mt-4 text-white flex items-center gap-1 py-2 px-4 rounded-lg"
              onClick={handleSubmit}
            >
              {isPending ? <span className="loader small"></span> : "Continue"}
            </button>
          </div>
          <div className="bg-white min-w-[320px] h-fit rounded-10 py-8 px-6 border border-milk">
            <p className="text-lg font-medium text-[#1A1A21]">Contact info</p>
            <p className="text-sm mt-1 text-[#8C94A6]">
              Other ways to contact us
            </p>
            <div className="mt-8">
              <div className="flex gap-4 mb-6 items-center">
                <div className="bg-purple500 rounded-full p-2.5">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs">Email address</p>
                  <h6 className="text-sm">contact@collabo.com</h6>
                </div>
              </div>
              <div className="flex gap-4 mb-6 items-center">
                <div className="bg-purple500 rounded-full p-2.5">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs">Phone Number</p>
                  <h6 className="text-sm">+2349160558953</h6>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="bg-purple500 rounded-full p-2.5">
                  <Twitter size={20} />
                </div>
                <div>
                  <p className="text-xs">X Support</p>
                  <h6 className="text-sm">@aigbe_1</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HelpCenter;
