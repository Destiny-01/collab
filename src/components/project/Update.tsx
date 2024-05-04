import React, { useState } from "react";
import Button from "../Button";
import Pic from "@/assets/original-0e5c617878edab087b0de31de9396844.png";
import Image from "next/image";
import NewUpdate from "../NewUpdate";
import { Group } from "@/models/Group";
import moment from "moment";

function Update({ updates }: { updates: Group["updates"] }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="lg:p-8 p-4">
      <div className="flex lg:items-end items-center justify-between mb-4">
        <div className="max-w-[60%] break-word">
          <p className="font-medium mb-1 lg:text-xl text-lg text-black">
            All Updates
          </p>
          <p className="text-sm mb-2 lg:mb-0 ">
            Updates are public. Use them to tell the world about the progress of
            your project
          </p>
        </div>
        <Button onClick={() => setShowModal(true)}>New Update</Button>
      </div>
      <div>
        {updates?.map((update, i) => (
          <div
            key={i}
            className="bg-white border mb-4 border-milk p-4 rounded-xl shadow-card-shadow"
          >
            <h5 className="font-medium">{update.title}</h5>
            <p className="text-sm mt-1 mb-4">{update.details}</p>
            <div className="flex items-center gap-2">
              <Image
                src={update.author.avatar || Pic}
                alt="avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <h5 className="font-medium text-sm">{update.author.name}</h5>
              <p className="text-sm ml-auto">
                {moment(update.date).format("DD/MM/YY")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <NewUpdate showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default Update;
