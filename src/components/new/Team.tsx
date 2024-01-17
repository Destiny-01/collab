"use client";
import Image from "next/image";
import Smile from "@/assets/smileguy.png";

function Team({ setSelectedTab }: any) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 pt-8">
      <div className="bg-white  rounded-[10px]">
        <div className="h-[200px] p-4">
          <Image
            src={Smile}
            alt="Smiling Man"
            className="h-full w-full rounded-[10px] object-cover object-top overflow-hidden"
          />
        </div>
        <div className="p-4 pt-0">
          <h6>John Dalton</h6>
          <p className="text-[#667185] text-xs">
            Senior Product Designer <span className="text-black">&#x2022;</span>{" "}
            Nigeria
          </p>
          <div className="flex gap-2 my-3">
            <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
              <p className="text-[#232566] text-xs font-medium">Technology</p>
            </div>
            <div className="bg-lightblu px-2 py-1 rounded-3xl">
              <p className="text-[#232566] text-xs font-medium">Design</p>
            </div>
          </div>
          <div className="flex mt-4 pt-4 justify-between border-t border-[#F0F2F5] items-center">
            <p className="text-xs font-medium">50 Projects</p>
            <p className="text-[#04802E] text-xs font-medium">95% Match</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[10px]">
        <div className="h-[200px] p-4">
          <Image
            src={Smile}
            alt="Smiling Man"
            className="h-full w-full rounded-[10px] object-cover object-top overflow-hidden"
          />
        </div>
        <div className="p-4 pt-0">
          <h6>John Dalton</h6>
          <p className="text-[#667185] text-xs">Senior Product Designer </p>
          <div className="flex gap-2 my-3">
            <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
              <p className="text-[#232566] text-xs font-medium">Technology</p>
            </div>
            <div className="bg-lightblu px-2 py-1 rounded-3xl">
              <p className="text-[#232566] text-xs font-medium">Design</p>
            </div>
          </div>
          <div className="flex mt-4 pt-4 justify-between border-t border-[#F0F2F5] items-center">
            <p className="text-xs font-medium">50 Projects</p>
            <p className="text-200grey text-xs font-medium">0 Achievements</p>
          </div>
        </div>
      </div>
      <div className="bg-white  rounded-[10px]">
        <div className="h-[200px] p-4">
          <Image
            src={Smile}
            alt="Smiling Man"
            className="h-full w-full rounded-[10px] object-cover object-top overflow-hidden"
          />
        </div>
        <div className="p-4 pt-0">
          <h6>John Dalton</h6>
          <p className="text-[#667185] text-xs">
            Senior Product Designer <span className="text-black">&#x2022;</span>{" "}
            Nigeria
          </p>
          <div className="flex gap-2 my-3">
            <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
              <p className="text-[#232566] text-xs font-medium">Technology</p>
            </div>
            <div className="bg-lightblu px-2 py-1 rounded-3xl">
              <p className="text-[#232566] text-xs font-medium">Design</p>
            </div>
          </div>
          <div className="flex mt-4 pt-4 justify-between border-t border-[#F0F2F5] items-center">
            <p className="text-xs font-medium">50 Projects</p>
            <p className="text-[#04802E] text-xs font-medium">95% Match</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-[10px]">
        <div className="h-[200px] p-4">
          <Image
            src={Smile}
            alt="Smiling Man"
            className="h-full w-full rounded-[10px] object-cover object-top overflow-hidden"
          />
        </div>
        <div className="p-4 pt-0">
          <h6>John Dalton</h6>
          <p className="text-[#667185] text-xs">Senior Product Designer </p>
          <div className="flex gap-2 my-3">
            <div className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
              <p className="text-[#232566] text-xs font-medium">Technology</p>
            </div>
            <div className="bg-lightblu px-2 py-1 rounded-3xl">
              <p className="text-[#232566] text-xs font-medium">Design</p>
            </div>
          </div>
          <div className="flex mt-4 pt-4 justify-between border-t border-[#F0F2F5] items-center">
            <p className="text-xs font-medium">50 Projects</p>
            <p className="text-200grey text-xs font-medium">0 Achievements</p>
          </div>
        </div>
        <div className="bg-tgrey border-1 border-solid my-8"></div>
        <div className="flex gap-8">
          <button
            onClick={() => setSelectedTab(0)}
            className="bg-shade text-borderblue border-bscolor border-[1.5px] border-solid    w-[70%]  lg:px-6 lg:py-4 text-base font-semibold rounded-lg flex justify-center items-center"
          >
            Cancel
          </button>
          <button
            onClick={() => setSelectedTab(2)}
            className="bg-dimeblue   w-full  px-6 py-4 text-base font-semibold rounded-lg flex justify-center items-center"
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
}

export default Team;
