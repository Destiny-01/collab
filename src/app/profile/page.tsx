"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import API from "@/utils/api";
import { getCsrfToken, useSession } from "next-auth/react";
import { UserDocument } from "@/models/User";
import Pic from "@/assets/avatar.jpeg";
import Image from "next/image";
import { Check, Image as ImageIcon } from "react-feather";
import Divider from "@/components/Divider";
import MainLayout from "@/layouts/MainLayout";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUpdateUser } from "@/hooks/useUpdateUser";

export default function Profile() {
  const currentUser = useCurrentUser();
  const { mutate } = useUpdateUser();
  const [data, setData] = useState({
    title: currentUser?.title,
    name: currentUser?.name,
    bio: currentUser?.bio,
    avatar: currentUser?.avatar,
    country: currentUser?.country,
    timezone: "",
    username: currentUser?.username,
    phone_number: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | undefined>(
    currentUser?.avatar
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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

      setData((prevData) => ({
        ...prevData,
        avatar: data?.data.url,
      }));
      toast.success("Avatar Upload Success");
    }
  };

  return (
    <MainLayout>
      <div className="lg:px-8 px-4 pt-7">
        <div>
          <h2>Profile</h2>
          <p className="text-[#667185]">Edit your profile details</p>
        </div>
        <div className="rounded-lg lg:p-8 p-6 mt-8 mb-8 bg-white w--full">
          <div className="mb-8 gap-12 lg:max-w-[85%] md:flex items-center">
            <div className="lg:w-[33%] lg:min-w-[33%] relative">
              <h6>Profile Photo</h6>
              <p className="text-sm">
                This image will be displayed on your profile
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileInputChange}
              />
              <button
                onClick={handleButtonClick}
                className="border-[1.5px] rounded-lg border-[#9065F2] text-sm flex items-center gap-1 px-3 md:mt-6 mt-3 py-2 text-[#9065F2] bg-transparent font-semibold"
              >
                <ImageIcon color="#9065F2" size={20} />
                Change Photo
              </button>
            </div>
            <div className="relative w-fit ml-4 md:ml-0 mt-4 md:mt-0 h-fit">
              <Image
                src={previewURL ?? Pic}
                alt="logo"
                width={120}
                height={120}
                className="object-cover rounded-full w-[120px] h-[120px] object-center"
              />
              {previewURL && (
                <div className="absolute bottom-0 right-0">
                  <div className="rounded-full h-9 w-9 flex items-center justify-center p-1.5 bg-[#1671d9]">
                    <Check />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="mt-8 gap-12 lg:max-w-[85%] md:flex items-start justify-between">
            <div className="min-w-[33%] mb-8 md:mb-0 mt-4">
              <h6>Personal Information</h6>
              <p className="text-sm">Update your personal information</p>
              <button
                className="bg-purple500 mt-4 text-white flex items-center gap-1 py-2 px-4 rounded-lg"
                onClick={(e) => {
                  e.preventDefault();
                  mutate(data);
                }}
              >
                {isLoading ? (
                  <span className="loader small"></span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
            <form className="w-full">
              <label>Full Name</label>
              <input
                className="bg-shade w-full  rounded-md border-1 py-2 px-4 lg:py-3 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
                placeholder="Full Name"
                name="name"
                value={data.name}
                onChange={handleChange}
              ></input>
              <label>Username</label>
              <input
                className="bg-shade w-full  rounded-md border-1 py-2 px-4 lg:py-3 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
                placeholder="Username"
                name="username"
                type="text"
                value={data.username}
                onChange={handleChange}
              ></input>
              <label>Title</label>
              <input
                className="bg-shade w-full  rounded-md border-1 py-2 px-4 lg:py-3 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
                placeholder="Title"
                name="title"
                type="text"
                value={data.title}
                onChange={handleChange}
              ></input>
              <label>Bio</label>
              <input
                className="bg-shade w-full  rounded-md border-1 py-2 px-4 lg:py-3 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
                placeholder="I am a fun..."
                name="bio"
                type="text"
                value={data.bio}
                onChange={handleChange}
              ></input>
              <label>Country</label>
              <input
                className="bg-shade w-full  rounded-md border-1 py-2 px-4 lg:py-3 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
                placeholder="Nigeria"
                name="country"
                type="text"
                value={data.country}
                onChange={handleChange}
              ></input>
              {/* <label>Phone Number</label>
            <input
              className="bg-shade w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
              placeholder="+168483930"
              name="phone_number"
              type="text"
              value={currentUser?.phone_number}
              onChange={handleChange}
            ></input>
            <label>Timezone</label>
            <input
              className="bg-shade w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
              placeholder="GMT +1 or UTC -7"
              name="timezone"
              type="text"
              value={currentUser?.timezone}
              onChange={handleChange}
            ></input>
            <h3 className="mt-3">Language</h3>
            <input
              className="bg-shade w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1 text-[#101928] placeholder:text-dimegrey border-solid border-scolor"
              placeholder="English"
              name="language"
              type="text"
              value={currentUser?.language}
              onChange={handleChange}
            ></input> */}
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
