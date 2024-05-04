"use client";
import React from "react";

function Review({
  setSelectedTab,
  name,
  description,
  setName,
  groupName,
  setGroupName,
  setDescription,
  submit,
  isLoading,
}: any) {
  return (
    <div className="p-6 rounded-10 border-solid border-1 border-mcolor ">
      <form>
        <h3 className="text-mgrey">Group Title</h3>
        <input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className=" bg-shade  w-full  rounded-md border-1  p-4 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
          placeholder="What do you want to call your group?"
        ></input>
        <h3 className="text-mgrey pt-6">Project Title</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" bg-shade w-full  rounded-md border-1  p-4 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
          placeholder="Project title"
        ></input>
        <h3 className="text-mgrey pt-6">Description</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" bg-shade  w-full    py-[22px] flex self-stretch items-start rounded-md border-1  px-4  text-sm mt-1  text-dimegrey border-solid border-scolor"
          placeholder="Enter text here..."
        ></textarea>
        <span className="text-pgrey text-sm pt-2">
          Keep this simple of 50 character
        </span>
        <div className="bg-tgrey border-1 border-solid my-8"></div>
        <div className="flex gap-8">
          <button
            onClick={() => setSelectedTab(1)}
            className="bg-shade text-borderblue border-bscolor border-[1.5px] border-solid    w-[70%]  lg:px-6 lg:py-4 text-base font-semibold rounded-lg flex justify-center items-center"
          >
            Back
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
            className="bg-dimeblue   w-full  px-6 py-4 text-base font-semibold rounded-lg flex justify-center items-center"
          >
            {isLoading ? <span className="loader small"></span> : "Finish"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Review;
