"use client";

import ExploreProject from "@/components/ExploreProject";
import Loader from "@/components/Loader";
import Conversation from "@/components/project/Conversation";
import Details from "@/components/project/Details";
import Tasks from "@/components/project/Tasks";
import Update from "@/components/project/Update";
import ProjectHeader from "@/components/ProjectHeader";
import TabBar from "@/components/TabView";
import { useGetSingleProject } from "@/hooks/useCurrentProject";
import useCurrentUser from "@/hooks/useCurrentUser";
import MainLayout from "@/layouts/MainLayout";
import { Group } from "@/models/Group";
import React from "react";

function SingleProject({ params }: { params: { id: string } }) {
  const currentUser = useCurrentUser();
  const { data, isLoading } = useGetSingleProject(params.id);
  const group: Group | null = data?.data?.data;
  const project = group?.project;
  console.log(group);
  const isGroupMember = group?.members?.some(
    (member) => member._id === currentUser?._id
  );

  return (
    <MainLayout>
      {isLoading ? (
        <Loader />
      ) : isGroupMember ? (
        <div>
          <ProjectHeader group={group} />
          <TabBar
            tabs={[
              {
                title: "Conversation",
                image: (
                  <div className="px-2 rounded-xl flex items-center bg-purple400">
                    <p className="text-white text-xs leading-none">0</p>
                  </div>
                ),
                component: Conversation,
                props: {
                  group,
                  //   data: bookings,
                },
              },
              {
                title: "Update",
                component: Update,
                props: {
                  updates: group?.updates || [],
                  //   data: bookings?.filter((booking) => booking.status === "pending"),
                },
              },
              {
                title: "Tasks",
                component: Tasks,
                props: {
                  title: "Approved",
                  //   data: bookings?.filter(
                  //     (booking) => booking.status === "approved"
                  //   ),
                },
              },
              {
                title: "Details",
                component: Details,
                props: {
                  group,
                  //   data: bookings?.filter(
                  //     (booking) => booking.status === "cancelled"
                  //   ),
                },
              },
            ]}
          />
        </div>
      ) : (
        <ExploreProject params={params} />
      )}
    </MainLayout>
  );
}

export default SingleProject;
