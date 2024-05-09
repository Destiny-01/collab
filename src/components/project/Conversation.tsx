import React from "react";
import Pic from "@/assets/avatar.jpeg";
import Image from "next/image";
import { LogOut, Plus, Settings, VolumeX } from "react-feather";
import { Group } from "@/models/Group";
import TaskImage from "@/assets/task.png";
import Link from "next/link";

function Conversation({ group }: { group: Group }) {
  return (
    <div className="lg:flex gap8 justify-between">
      <div className="rounded-10 lg:m-8 m-4 text-center bg-white border border-milk shadow-card-shadow lg:p-8 p-4 lg:min-h-[500px] min-h-[350px]">
        <div className="lg:max-w-[60%] mx-auto">
          <Image src={TaskImage} className="mx-auto" alt="task" />
          <p className="mt-6 mb-3 w-fit mx-auto rounded-xl bg-milk text-gray700 text-sm py-0.5 px-3">
            Coming soon
          </p>
          <h2 className="text-[28px] my-2">Collaborate and share ideas</h2>
          <p>
            Collaborate, brainstorm, connect and plan the project details. In
            the mean time, we advice primary means of communication like{" "}
            <Link href="whatsapp.com">Whatsapp</Link>,{" "}
            <Link href="discord.com">Discord</Link>,{" "}
            <Link href="slack.com">Slack</Link> and other major mainstream media
          </p>
        </div>
      </div>
      <div className="bg-white p-8 lg:w-1/2 mx-4 lg:mx-0 mb-4 lg:mb-0 rounded-10 lg:rounded-none lg:border-l border-[#E4E7EC]">
        <Image
          src={group?.photo || Pic}
          className="h-20 mx-auto w-20 rounded-lg"
          alt="avatar"
          width="0"
          height="0"
          unoptimized
        />
        <h5 className="font-semibold text-xl text-center my-6">
          {group?.project?.name}
        </h5>
        <p className="text-sm text-center">
          {group?.project?.shortDescription}
        </p>
        <div className="mt-8 mb-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray900">
              Members ({group?.members?.length})
            </p>
            <p className="text-gray600 text-sm">
              {group.members?.length} Online
            </p>
          </div>
          <Link href="/people">
            <div className="border p-2.5 rounded-lg border-borderColor">
              <Plus color="#000000" size={20} />
            </div>
          </Link>
        </div>
        {group?.members?.map((member, i) => (
          <Link href={`/profile/${member._id}`} key={i}>
            <div className="flex gap-2 mb-4">
              <Image
                className="rounded-full h-10 w-10 border border-white"
                src={member.avatar || Pic}
                height={40}
                width={40}
                unoptimized
                alt="avatar"
              />
              <div>
                <h5 className="font-medium">{member.username}</h5>
                <p className="text-sm text-[#04802E]">Online</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Conversation;
