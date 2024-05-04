import React from "react";
import TaskImage from "@/assets/task.png";
import Image from "next/image";

function Tasks() {
  return (
    <div className="lg:p-8 p-4">
      <div className="rounded-10 text-center bg-white border border-milk shadow-card-shadow lg:p-8 p-4  lg:min-h-[500px] min-h-[350px]">
        <div className="lg:max-w-[60%] mx-auto">
          <Image src={TaskImage} className="mx-auto" alt="task" />
          <p className="mt-6 mb-3 w-fit mx-auto rounded-xl bg-milk text-gray700 text-sm py-0.5 px-3">
            Coming soon
          </p>
          <h2 className="text-[28px] my-2">Manage Tasks with Kanban Board</h2>
          <p>
            Assign, manage and build your project with an effective task
            manager. With Drag and Drop, Story creation and many more, our
            easy-to-use task manager would help you mange your tasks effectively
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
