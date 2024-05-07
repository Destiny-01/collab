import React, { useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import options from "@/data/options";
import Divider from "../Divider";
import NotLoggedInModal from "../NotLoggedInModal";

function Step1({ data, handleChange, isPending, mutate, user }: any) {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!data.category) {
      console.log("err");
      toast.error("All fields are required");
      return;
    }
    if (!user) {
      setShowModal(true);
      return;
    }
    mutate({ category: data.category.value, idea: data.idea });
  };

  return (
    <div className="bg-white w-full rounded-10 border border-milk px-6 py-8">
      <p className="font-medium text-lg text-[#1A1A21]">Basic Details</p>
      <p className="text-sm text-[#8C94A6]">
        What type of project do you want to work on?
      </p>
      <div>
        <div>
          <label className="mt-8">Category</label>
          <ReactSelect
            // defaultValue={options[0]}
            value={data?.category}
            placeholder="Choose a category"
            onChange={(newVal) =>
              handleChange({ target: { name: "category", value: newVal } })
            }
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
        </div>
        <div>
          <label className="mt-8" htmlFor="idea">
            Base Idea (Optional)
          </label>
          <textarea
            name="idea"
            id="idea"
            value={data?.idea}
            onChange={handleChange}
            className="border h-28 mb-1 text-sm placeholder:text-[#98A2B3] text-[#101928] w-full border-[#D0D5DD] px-3 py-3 outline-none rounded-md"
            placeholder="What direction do you have in mind"
          ></textarea>
          <p className="mb-8 text-sm">
            If you have an idea, our AI can build on that
          </p>
          <Divider />
          <div className="flex justify-end mt-6 items-center">
            <button
              className="bg-purple500 text-white lg:py-3 py-2 lg:px-4 px-4 rounded-lg"
              onClick={handleSubmit}
            >
              {isPending ? <span className="loader small"></span> : "Continue"}
            </button>
          </div>
        </div>
        {showModal && <NotLoggedInModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default Step1;
