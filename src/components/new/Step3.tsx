import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Divider from "../Divider";
import { underscoreToCapital } from "@/utils";
import Pic from "@/assets/avatar.jpeg";
import { ChevronLeft, RefreshCw } from "react-feather";
import Image from "next/image";
import { useGetAllUsers } from "@/hooks/useGetUser";
import Loader from "../Loader";
import Link from "next/link";
import { useInviteToProject } from "@/hooks/useUpdateProject";
import { sortByInterests, sortUserByCountries } from "@/utils/sortCountries";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UserDocument } from "@/models/User";

function Step3({ data, setStep, group }: any) {
  const { data: userData, isLoading } = useGetAllUsers();
  const user = useCurrentUser();
  const [users, setUsers] = useState<UserDocument[] | null>([]);
  const { mutate, isPending } = useInviteToProject(group?.uuid);
  const [disabledMap, setDisabledMap] = useState<any>({});

  const handleClick = (email: string) => {
    if (disabledMap[email]) {
      return;
    }
    toast.success("Invite request sent successfully");
    mutate(email);
    setDisabledMap((prevState: any) => ({
      ...prevState,
      [email]: true, // Set the disabled state for the specific email to true
    }));
  };

  useEffect(() => {
    console.log(data, userData);
    sortByInterests(
      [...data?.project?.interests, ...data?.project?.core_skills],
      userData?.data.data
    ).then((users) =>
      setUsers(sortUserByCountries(user?.country, users ?? []))
    );
  }, [data, user?.country, userData]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!data.project) {
      toast.error("Please choose a project");
      return;
    }
    setStep(4);
  };

  return (
    <div className="bg-white w-full rounded-10 border border-milk px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-lg text-[#1A1A21]">
            Choose Team Members
          </p>
          <p className="text-sm text-[#8C94A6]">
            Who would you like to work with on this project
          </p>
        </div>
        <div className="bg-milk rounded-full h-10 w-10 p-2.5">
          <RefreshCw color="#334054" size={20} />
        </div>
      </div>
      <div className="flex gap-4 my-8">
        {isLoading ? (
          <Loader />
        ) : (
          users?.map((user, i) => (
            <div
              key={i}
              className="bg-white cursor-pointer max-w-[50%] lg:max-w-[33%] rounded-10 border mb-4 lg:mb-0 border-milk lg:w-[33%]"
            >
              <div className="h-[180px] relative overflow-hidden p-4">
                <Image
                  src={user.avatar || Pic}
                  alt="banner"
                  width="0"
                  unoptimized
                  height="0"
                  sizes="100vw"
                  className="h-full w-full rounded-[10px] object-cover object-top"
                />
              </div>
              <div className="p-4 pt-0">
                <h6>{user.name}</h6>
                <p className="text-[#667185] text-xs">{user.title}</p>
                <div className="flex flex-wrap max-h-[60px] overflow-hidden gap-2 my-3">
                  {user.interests?.map((interest, i) => (
                    <div key={i} className="bg-[#D7D7EB] px-2 py-1 rounded-3xl">
                      <p className="text-[#232566] capitalize text-xs font-medium">
                        {underscoreToCapital(interest)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex mt-4 pt-4 justify-between border-t border-[#F0F2F5] items-center">
                  <p className="text-xs">{user.groups.length} Projects</p>
                  <a
                    href="#"
                    onClick={() => handleClick(user.email)}
                    className={
                      disabledMap[user.email]
                        ? "text-gray700 opacity-60 cursor-not-allowed"
                        : "text-sm"
                    }
                  >
                    {disabledMap[user.email] ? "Invited" : "Invite"}
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Divider />
      <div className="flex mt-6 justify-between items-center">
        <a href="#" onClick={() => setStep(2)}>
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
    </div>
  );
}

export default Step3;
