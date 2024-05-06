"use client";

import Image from "next/image";
import Solutions from "@/assets/dashboard/solutions.png";
import Growth from "@/assets/dashboard/growth.png";
import Solving from "@/assets/dashboard/solving.png";
import Expertise from "@/assets/dashboard/expertise.png";
import Collaboration from "@/assets/dashboard/collaboration.png";
import Select from "react-select";
// import "@/app/globals.css";
import { useLayoutEffect, useState } from "react";
import HomeImage from "@/assets/home-image.png";
import GlobalCollab from "@/assets/global-collab.png";
import HomeCollab from "@/assets/home-collab.png";
import Pic from "@/assets/avatar.jpeg";
import EmptyState from "@/assets/empty-project.png";
import Logo from "@/assets/LogoText.png";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import options from "@/data/options";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import useResponsive from "@/hooks/useResponsive";
import { useGetAllGroups } from "@/hooks/useCurrentProject";
import { Group } from "@/models/Group";
import Link from "next/link";
import { ThumbsUp } from "react-feather";

export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();
  const { isMobile } = useResponsive();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [filter, setFilter] = useState("all");
  const { data: groupsData, isLoading } = useGetAllGroups();

  const groups: Group[] = groupsData?.data?.data || [];
  const filteredGroups =
    filter === "all"
      ? groups
      : groups?.filter((group) => group.category === filter);

  useLayoutEffect(() => {
    data?.user && router.replace("/dashboard");
  }, [data, router]);

  if (status === "loading") {
    return <Loader isFull />;
  }

  return (
    <div className="bg-white">
      <Navbar isWhite />
      <div className="flex min-h-screen items-center gap-[72px] mt-4 mx-32">
        <div>
          <h1 className="text-[56px] text-[#2E2E33] leading-tight font-bold">
            Where diverse minds <br /> unite to solve real problems
          </h1>
          <p className="text-lg my-8 text-gray700">
            Get project recommendations that interests you, build a team that
            complements your skills, break down barriers, build up solutions.
          </p>
          <div className="flex gap-2 items-center">
            <Select
              value={selectedOption}
              onChange={(newVal) => setSelectedOption(newVal || options[0])}
              options={options}
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
                }),
                input: (styles) => ({
                  ...styles,
                  width: "375px",
                  padding: "8px",
                }),
                singleValue: (styles) => ({
                  ...styles,
                  color: "#101928",
                  paddingLeft: "8px",
                }),
              }}
            />
            <button className="bg-purple500 text-white flex items-center gap-1 py-3 px-6 rounded-lg">
              Get Started
            </button>
          </div>
        </div>
        <Image className="" src={HomeImage} alt="globe" />
      </div>
      <div className="bg-[#F9FAFB] px-32 pt-16">
        <h2 className="text-[40px] text-center text-[#2E2E33] max-w-[600px] mx-auto mb-8 leading-10">
          A new way to build projects and connections
        </h2>
        <div className="flex mt-10 flexwrap gap-6">
          <div className="flex-grow solutions w-1/3">
            <Image
              src={Solutions}
              alt="solution"
              className="rounded-t-xl w-full"
            />
            <div className="bg-white maxw-[379px] rounded-b-xl p-8">
              <p className="text-gray900 text-xl font-medium mb-1">
                Innovative Solutions
              </p>
              <p className="text-gray700">
                Collaborate with like-minded individuals to develop innovative
                solutions to complex challenges, leveraging diverse perspectives
                and skills.
              </p>
            </div>
          </div>
          <div className="flex-grow solutions w-1/3">
            <Image
              src={Growth}
              alt="solution"
              className="rounded-t-xl w-full"
            />
            <div className="bg-white maxw-[379px] rounded-b-xl p-8">
              <p className="text-gray900 text-xl font-medium mb-1">
                Personal and Professional Growth
              </p>
              <p className="text-gray700">
                Engage in collaborative projects that offer opportunities for
                learning, skill development, and professional networking.
              </p>
            </div>
          </div>
          <div className="flex-grow solutions w-1/3">
            <Image
              src={Solving}
              alt="solution"
              className="rounded-t-xl w-full"
            />
            <div className="bg-white maxw-[379px] rounded-b-xl p-8">
              <p className="text-gray900 text-xl font-medium mb-1">
                Efficient Problem-Solving
              </p>
              <p className="text-gray700">
                Benefit from streamlined collaboration processes and effective
                communication tools, enhancing efficiency in problem-solving.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flexwrap mt-6 gap-6">
          <div className="solutions w-2/3">
            <Image
              src={Expertise}
              alt="solution"
              className="rounded-t-xl w-full"
            />
            <div className="bg-white max-w[781px] rounded-b-xl p-8">
              <p className="text-gray900 text-xl font-medium mb-1">
                Access to Diverse Expertise
              </p>
              <p className="text-gray700">
                Connect with Professionals from Around the Globe, Spanning
                Various Backgrounds, Industries, and Disciplines. Gain
                Insightful Perspectives and Tap into a Vast Pool of Knowledge
                and Expertise to Enhance Your Collaborative Projects and Drive
                Innovation Forward.
              </p>
            </div>
          </div>
          <div className="solutions w-1/3">
            <Image
              src={Collaboration}
              alt="solution"
              className="rounded-t-xl w-full"
            />
            <div className="bg-white maxw-[379px] rounded-b-xl p-8">
              <p className="text-gray900 text-xl font-medium mb-1">
                AI-Enhanced Collaboration
              </p>
              <p className="text-gray700">
                Utilize AI algorithms for project matching and personalized
                recommendations, ensuring efficient collaboration and fostering
                synergistic partnerships.
              </p>
            </div>
          </div>
          {/* <div className="growth"></div>
          <div className="solving"></div>
          <div className="expertise"></div>
          <div className="collaboration"></div> */}
        </div>
      </div>
      <div className="bg-white px-32 py-16 flex items-center gap-20">
        <Image className="" src={GlobalCollab} alt="global-collab" />
        <div>
          <h2 className="text-[40px] leading-[48px] text-[#2E2E33] mb-6">
            Global Collaboration: {!isMobile && <br />} Connect Across
            Boundaries
          </h2>
          <p className="text-base text-gray700 mb-6">
            At Collabo, we celebrate diversity and the richness it brings to
            collaboration. Join a vibrant community where individuals from
            diverse countries, backgrounds, and demographics come together to
            share their expertise, ideas, and perspectives.
          </p>
          <button className="bg-purple500 text-white flex items-center gap-1 py-3 px-6 rounded-lg">
            Get Started
          </button>
        </div>
      </div>
      <div className="bg-white px-32 py-16 gap-20">
        <h2 className="text-[40px] text-center text-[#2E2E33] max-w-[600px] mx-auto mb-8 leading-10">
          Select projects from a diverse range of categories
        </h2>
        <div className="flex overflow-scroll mx-auto no-scrollbar mb-6 gap-3">
          <div
            onClick={() => setFilter("all")}
            className={`${
              filter === "all" ? "bg-[#F1E9FD]" : "bg-milk"
            } rounded-md flex-shrink-0 h-fit px-3 py-2 cursor-pointer border border-borderColor`}
          >
            <p
              className={`${
                filter === "all" ? "text-gray900" : "text-gray600"
              } text-sm`}
            >
              All
            </p>
          </div>
          {options.map((option, i) => (
            <div
              key={i}
              onClick={() => setFilter(option.value)}
              className={`${
                filter === option.value ? "bg-[#F1E9FD]" : "bg-milk"
              } rounded-md flex-shrink-0 h-fit px-3 py-2 cursor-pointer border border-borderColor`}
            >
              <p
                className={`${
                  filter === option.value ? "text-gray900" : "text-gray600"
                } text-sm`}
              >
                {option.label}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:flex mx-auto gap-4">
          {isLoading ? (
            <Loader />
          ) : filteredGroups.length === 0 ? (
            <div className="bg-white mx-auto min-w-[60%] min-h-[240px] border border-milk shadow-card-shadow text-center rounded-xl p-4">
              <Image src={EmptyState} className="mx-auto" alt="empty" />
              <h6 className="mt-2 mb-1">No projects found</h6>
              <p className="text-xs mb-2">
                Try checking out other tags or create your own project
              </p>
              <Link href="/projects/new" className="text-sm">
                Create
              </Link>
            </div>
          ) : (
            filteredGroups?.slice(0, 2).map((group, i) => (
              <div
                className="lg:w-[33%] mb-4 lg:mb-0 w-full p-4 rounded-xl border-milk border bg-white text-start"
                key={i}
              >
                <Link href={`/projects/${group.uuid}`}>
                  <div className="lg:h-[200px] h-[187px] mb-2">
                    <Image
                      src={group.photo || Pic}
                      alt="banner"
                      width="0"
                      height="0"
                      className="h-full w-full rounded-lg object-cover object-top overflow-hidden"
                    />
                  </div>
                  <div className="rounded-b-[10px]">
                    <h2 className="text-xl font-medium">
                      {group.project?.name}
                    </h2>
                    <p className="text-sm line-clamp-4">
                      {group.project?.description}
                    </p>
                    <div className="flex mt-2 pt-2 justify-between border-t border-[#F0F2F5] items-center">
                      <div className="flex">
                        {group?.members?.slice(0, 2).map((member, i) => (
                          <Image
                            className={`rounded-full h-8 w-8 border border-white ${
                              i > 0 && "-ml-3"
                            }`}
                            src={member.avatar || Pic}
                            height={32}
                            width={32}
                            alt="avatar"
                            key={i}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <p className="text-base mt-1">{group.votes}</p>
                        <ThumbsUp size={18} color="#667185" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
        <button className="bg-purple500 text-white flex items-center gap-1 py-3 px-6 rounded-lg">
          See More
        </button>
      </div>
      <div className="bg-white px-32 py-16">
        <div className="bg-card-bg rounded-xl flex items-center justify-between gap-8 h-fit w-full relative">
          <div className="px-20 max-w-[60%]">
            <h2 className="text-white leading-[48px] text-[40px]">
              Take the Next Step Towards Collaboration!
            </h2>
            <p className="text-milk text-base mb-6 mt-4">
              Join Collabo to connect with a global network of innovators,
              explore exciting projects, and contribute your unique expertise.
            </p>
            <Link href="/explore">
              <button className="text-purple700 text-sm bg-white flex items-center gap-1 py-3 px-4 rounded-lg">
                Explore Projects
              </button>
            </Link>
          </div>
          {!isMobile && (
            <Image src={HomeCollab} className="mr-[78px]" alt="image" />
          )}
        </div>
      </div>
      <footer className="px-32 py-10">
        <div className="flex items-start justify-between">
          <Image src={Logo} alt="logo" height={32} />
          <div className="text-right">
            <p className="text-gray900 text-xl mb-4 font-medium">
              Built by Aigbe Destiny
            </p>
            <p className="text-base ">
              This project is built and managed with love by{" "}
              <Link href="/">Aigbe Destiny</Link>. <br />
              Special thanks to Rise Program by Shcmidt Ventures
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8 justify-end mt-20">
          <p className="text-gray700 text-sm mr-auto">
            © Copyright 2024, Collabo
          </p>
          <Link href="/explore">
            <p className="text-gray700 text-sm font-medium">Projects</p>
          </Link>
          <Link href="/people">
            <p className="text-gray700 text-sm font-medium">People</p>
          </Link>
          <Link href="/auth/login">
            <p className="text-gray700 text-sm font-medium">Login</p>
          </Link>
          <Link href="/auth/signup">
            <p className="text-gray700 text-sm font-medium">Get Started</p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
