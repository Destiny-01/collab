"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "@/utils/api";
import { getCsrfToken, useSession } from "next-auth/react";
import { UserDocument } from "@/models/User";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(1);
  const { data: sessionData } = useSession();
  const currentUser: UserDocument | null | undefined = sessionData?.user as any;
  const [data, setData] = useState({
    name: "",
    bio: "",
    language: "",
    country: "",
    timezone: "",
    username: "",
    phone_number: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const { name, username, ...details } = data;
      const res = await API.put(`/user/${currentUser?.id}`, {
        name,
        username,
        details,
      });

      console.log(res);
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        setIsLoading(false);
        API.post("/auth/session", {
          crsfToken: await getCsrfToken(),
          data: {
            name: res.data.data.name,
            email: res.data.data.email,
            image: undefined,
            username: res.data.data.username,
            id: res.data.data._id,
            details,
            avatar: undefined,
            groups: res.data.data.groups,
            isVerified: res.data.data.isVerified,
          },
        })
          .then(() => {})
          .catch((err: any) => {
            setIsLoading(false);
            console.log(err, JSON.stringify(err.response?.data));
            // toast.error(JSON.stringify(err.response?.data) || err.message);
          });
      } else {
        console.log("kkkkkkk", res?.data?.message);
        toast.error(res?.data?.message);
      }
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);
      toast.error(err.response?.data || err.message);
      console.log("kkkk");
    }
  };

  return (
    <div className="px-8 pt-7">
      <div>
        <h2>Profile</h2>
        <p className="text-[#667185]">Please update your profile to continue</p>
      </div>
      <div className="mt-8 border-b border-[#E4E7EC]">
        <div className="flex">
          <div
            className={`p-4 cursor-pointer ${
              activeTab === 1 && "border-b border-[#5758AA] transition-all"
            }`}
            onClick={() => setActiveTab(1)}
          >
            <p
              className={`${
                activeTab === 1
              } ? "text-[#5758AA]" : "text-[#344054]"`}
            >
              Profile
            </p>
          </div>
          <div
            className={`p-4 cursor-pointer ${
              activeTab === 2 && "border-b border-[#5758AA] transition-all"
            }`}
            onClick={() => setActiveTab(1)}
          >
            <p
              className={`${
                activeTab === 2
              } ? "text-[#5758AA]" : "text-[#344054]"`}
            >
              Preference
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 rounded-lg flex mb-8 justify-between bg-white w--full">
        <div className="max-w-[40%] mt-12 ml-6">
          <h6>Personal Information</h6>
          <p>Update your details so we can better match you</p>
          <button
            className="bg-[#353799] mt-4 text-white flex items-center gap-1 py-2.5 px-3 rounded-lg"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <span className="loader small"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
        <form className="p-8 w-full">
          <h3 className="mt-3">Full Name</h3>
          <input
            className="bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-scolor"
            placeholder="Full Name"
            name="name"
            value={currentUser?.name}
            onChange={handleChange}
          ></input>
          <h3 className="mt-3">Username</h3>
          <input
            className="bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-scolor"
            placeholder="Username"
            name="username"
            type="text"
            value={currentUser?.username}
            onChange={handleChange}
          ></input>
          <h3 className="mt-3">Bio</h3>
          <input
            className="bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-scolor"
            placeholder="I am a fun..."
            name="bio"
            type="text"
            value={currentUser?.details?.bio}
            onChange={handleChange}
          ></input>
          <h3 className="mt-3">Country</h3>
          <input
            className="bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-scolor"
            placeholder="Nigeria"
            name="country"
            type="text"
            value={currentUser?.details?.country}
            onChange={handleChange}
          ></input>
          <h3 className="mt-3">Phone Number</h3>
          <input
            className="bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-scolor"
            placeholder="+168483930"
            name="phone_number"
            type="text"
            value={currentUser?.details?.phone_number}
            onChange={handleChange}
          ></input>
          <h3 className="mt-3">Timezone</h3>
          <input
            className="bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-scolor"
            placeholder="GMT +1 or UTC -7"
            name="timezone"
            type="text"
            value={currentUser?.details?.timezone}
            onChange={handleChange}
          ></input>
          <h3 className="mt-3">Language</h3>
          <input
            className="bg-shade  w-full  rounded-md border-1 p-3 lg:p-4 text-sm mt-1  text-dimegrey border-solid border-scolor"
            placeholder="English"
            name="language"
            type="text"
            value={currentUser?.details?.language}
            onChange={handleChange}
          ></input>
        </form>
      </div>
    </div>
  );
}
