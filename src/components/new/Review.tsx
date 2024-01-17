"use client";

function Review({ setSelectedTab }: any) {
  return (
    <div className="p-6 rounded-10 border-solid border-1 border-mcolor ">
      <form className="pt-8">
        <h3 className="text-mgrey">Project Title</h3>
        <input
          className=" bg-shade  w-full  rounded-md border-1  p-4 text-sm mt-1  text-dimegrey border-solid border-scolor"
          placeholder="Enter Email"
        ></input>
        <h3 className="text-mgrey pt-6">Description</h3>
        <textarea
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
          <button className="bg-dimeblue   w-full  px-6 py-4 text-base font-semibold rounded-lg flex justify-center items-center">
            Finish
          </button>
        </div>
      </form>
    </div>
  );
}

export default Review;
