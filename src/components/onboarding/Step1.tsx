import { UserDocument } from "@/models/User";
import API from "@/utils/api";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { ChangeEvent, useMemo, useRef, useState } from "react";
import { ChevronLeft, UploadCloud } from "react-feather";
import { toast } from "react-toastify";
import Select, { SingleValue } from "react-select";
import countryList from "react-select-country-list";

function Step1({ handleChange, setStep, data: values }: any) {
  const { data: sessionData } = useSession();
  const options = useMemo(() => countryList().getData(), []) as any;

  const changeHandler = (value: any) => {
    console.log(value);
    value && handleChange({ target: { name: "country", value: value.label } });
  };
  const currentUser: UserDocument | null | undefined = sessionData?.user as any;
  const [previewURL, setPreviewURL] = useState<string | undefined>(
    currentUser?.avatar
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      !values?.avatar ||
      !values.name ||
      !values.username ||
      !values.country
    ) {
      toast.error("All fields are required");
      return;
    }
    setStep(2);
  };

  const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "gif"];

  const handleFileInputChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (fileExtension && !ALLOWED_EXTENSIONS.includes(fileExtension)) {
        toast.error(
          "Invalid file type. Please select a PNG, JPG, JPEG, or GIF file."
        );
        return;
      }
      if (file && file.size > 2 * 1024 * 1024) {
        toast.error("File exceeds 2mb");
        return;
      }

      console.log(file);
      const formData = new FormData();
      formData.set("file", file);

      for (let key of Array.from(formData.entries())) {
        console.log(key[0] + ", " + key[1]);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);

      const { data } = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      if (!data?.success) {
        toast.error("An error occurred while uploading file");
      }

      handleChange({ target: { name: "avatar", value: data?.data?.url } });
      toast.success("Avatar Upload Success");
    }
  };

  return (
    <div className="bg-white px-5 md:max-w-[450px] max-w-[90%] md:px-7 lg:py-8 py-6">
      <p>1/3</p>
      <h5 className="mt-6 mb-2 text-[28px]">Please set up your profile</h5>
      <p>
        We want to help you build your profile and we&apos;ll need a few details
        from you
      </p>
      <form className="pt-2">
        <label>Profile photo</label>
        <div className="flex gap-4 my-4 items-center">
          <div className="h-16 w-16 flex justify-center rounded-lg items-center bg-milk">
            {previewURL ? (
              <Image
                src={previewURL}
                alt="logo"
                width={64}
                height={64}
                className="object-cover rounded-lg w-16 h-16 object-center"
              />
            ) : (
              <UploadCloud color="#475367" />
            )}
          </div>
          <div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileInputChange}
            />
            <button
              onClick={handleButtonClick}
              className="border-[1.5px] rounded-lg border-purple600 mb-1 text-sm px-4 py-2 text-purple600 bg-transparent font-semibold"
            >
              Upload Image
            </button>
            <p className="text-dimegrey text-sm">
              Square photo recommended &#x2022; Max. 2MB
            </p>
          </div>
        </div>
        <label>What&apos;s your full name</label>
        <input
          className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
          name="name"
          value={values?.name}
          placeholder="First and last name"
          onChange={handleChange}
        ></input>
        <label>Select a nickname</label>
        <input
          className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
          name="username"
          placeholder="Nickname"
          value={values?.username}
          onChange={handleChange}
        ></input>
        <label>Which country do you live in</label>
        {/* <input
          className=" bg-shade rounded-md lg:mb-2 border-1 w-full  p-3 lg:p-4 text-sm  text-[#101928] placeholder:text-dimegrey  border-solid border-scolor"
          name="country"
          placeholder="Select a country"
          onChange={handleChange}
          value={values?.country}
        ></input> */}
        <Select
          options={options}
          placeholder="Select your country"
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
          value={
            values?.country
              ? {
                  value: countryList().getValue(values?.country),
                  label: values?.country,
                }
              : undefined
          }
          onChange={changeHandler}
        />
        <div className="flex justify-end mt-6 items-center">
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

export default Step1;
