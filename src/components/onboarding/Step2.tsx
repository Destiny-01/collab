import { ChevronLeft } from "react-feather";
import { toast } from "react-toastify";
import Select, { MultiValue } from "react-select";
import options from "@/data/options";
import { useState } from "react";

function Step2({ handleChange, setStep, data }: any) {
  const handleSelectChange = (newValue: MultiValue<string>) => {
    if (data.interests.length < 5) {
      handleChange({ target: { name: "interests", value: newValue } });
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!data?.avatar || !data.name || !data.username || !data.country) {
      toast.error("All fields are required");
      return;
    }
    setStep(3);
  };

  return (
    <div className="bg-white px-5 md:max-w-[450px] max-w-[90%] md:px-7 lg:py-8 py-6">
      <p>2/3</p>
      <h5 className="mt-6 mb-2 text-[28px]">What do you do</h5>
      <p>Tell us what you do. It&apos;s cool if you&apos;re a student too</p>
      <form className="pt-2">
        <label>Title</label>
        <input
          className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
          name="title"
          value={data.title}
          placeholder="Eg. Mech Eng Student, Software Dev"
          onChange={handleChange}
        ></input>
        <label>Company/School</label>
        <input
          className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
          name="company"
          value={data.company}
          placeholder="Eg, University Of Benin, Apple, etc"
          onChange={handleChange}
        ></input>
        <label>Area of Interest (Max 5)</label>
        {/* <input
          className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
          name="interests"
          placeholder="Eg, Tech, SDG etc"
          value={data.interests}
          onChange={handleChange}
        ></input> */}
        <Select
          value={data.interests}
          closeMenuOnSelect={false}
          isMulti
          onChange={handleSelectChange}
          options={options}
          placeholder="Select interests"
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
              fontSize: "14px",
              color: "#101928",
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
        <div className="flex mt-6 justify-between items-center">
          <a href="#" onClick={() => setStep(1)}>
            <div className="flex items-center gap-1 text-sm">
              <ChevronLeft size={16} /> Back
            </div>
          </a>
          <button
            className="bg-purple500 text-white lg:py-3 py-2 lg:px-4 px-4 rounded-lg"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step2;
