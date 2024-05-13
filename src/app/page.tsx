"use client";

import Image from "next/image";
import Solutions from "@/assets/dashboard/solutions.svg";
import Growth from "@/assets/dashboard/growth.svg";
import Solving from "@/assets/dashboard/solving.svg";
import Expertise from "@/assets/dashboard/expertise.svg";
import Collaboration from "@/assets/dashboard/collaboration.svg";
import Select from "react-select";
// import "@/app/globals.css";
import { useLayoutEffect, useState } from "react";
import HomeImage from "@/assets/home-image.png";
import GlobalCollab from "@/assets/global-collab.png";
import HomeCollab from "@/assets/home-collab.svg";
import Pic from "@/assets/avatar.jpeg";
import EmptyState from "@/assets/empty-project.png";
import Logo from "@/assets/LogoText.svg";
import DefaultCover from "@/assets/Default Cover.png";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import options from "@/data/options";
import Loader from "@/components/Loader";
import useResponsive from "@/hooks/useResponsive";
import { useGetAllGroups } from "@/hooks/useCurrentProject";
import { Group } from "@/models/Group";
import Link from "next/link";
import { ThumbsUp } from "react-feather";
import MainLayout from "@/layouts/MainLayout";

export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();
  const { isMobile } = useResponsive();
  const [selectedOption, setSelectedOption] = useState<any>(undefined);
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
    <MainLayout isWhite>
      <div className="bg-white">
        <div className="lg:flex items-center gap-[72px] mt10  lg:mx-32 mx-4">
          <div className="text-center lg:text-start">
            <h1 className="lg:text-[56px] text-[36px] text-[#2E2E33] leading-tight font-bold">
              Where diverse minds {!isMobile && <br />} unite to solve real
              problems
            </h1>
            <p className="text-lg lg:my-8 my-6 text-gray700">
              Get project recommendations that interests you, build a team that
              complements your skills, break down barriers, build up solutions.
            </p>
            <div className="lg:flex text-start gap-2 items-center">
              <Select
                value={selectedOption}
                placeholder="What are you interested in"
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
              <Link href={`/explore?category=${selectedOption?.value}`}>
                <button className="bg-purple500 my-3 lg:my-0 text-white w-full justify-center flex items-center gap-1 py-3 px-6 rounded-lg">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <Image className="my-16 lg:my-10" src={HomeImage} alt="globe" />
        </div>
        <div className="bg-[#F9FAFB] lg:px-32 px-4 lg:py-16 py-10">
          <h2 className="lg:text-[40px] text-[28px] text-center text-[#2E2E33] max-w-[600px] mx-auto mb-8 lg:leading-10 leading-8">
            A new way to build projects and connections
          </h2>
          <div className="solutions-container">
            <div className="flex-grow solutions h-full">
              <div className="overflow-hidden max-h-[232px] w-full h-full">
                <Image
                  src={Solutions}
                  alt="solution"
                  height={232}
                  className="object-cover rounded-t-xl w-full"
                />
              </div>
              <div className="bg-white lg:min-h-[190px] rounded-b-xl lg:p-8 p-6 mb-6 lg:mb-0">
                <p className="text-gray900 text-xl font-medium mb-1">
                  Innovative Solutions
                </p>
                <p className="text-gray700">
                  Collaborate with like-minded individuals to develop innovative
                  solutions to complex challenges, leveraging diverse
                  perspectives and skills.
                </p>
              </div>
            </div>
            <div className="flex-grow growth h-full">
              <div className="overflow-hidden max-h-[232px] w-full h-full">
                <Image
                  src={Growth}
                  alt="solution"
                  height={232}
                  unoptimized={false}
                  className="object-cover rounded-t-xl w-full"
                />
              </div>
              <div className="bg-white lg:min-h-[190px] rounded-b-xl lg:p-8 p-6 mb-6 lg:mb-0">
                <p className="text-gray900 text-xl font-medium mb-1">
                  Personal and Professional Growth
                </p>
                <p className="text-gray700">
                  Engage in collaborative projects that offer opportunities for
                  learning, skill development, and professional networking.
                </p>
              </div>
            </div>
            <div className="flex-grow solving h-full">
              <div className="overflow-hidden max-h-[232px] w-full h-full">
                <Image
                  src={Solving}
                  alt="solution"
                  height={232}
                  className="object-cover rounded-t-xl w-full"
                />
              </div>
              <div className="bg-white lg:min-h-[190px] rounded-b-xl lg:p-8 p-6 mb-6 lg:mb-0">
                <p className="text-gray900 text-xl font-medium mb-1">
                  Efficient Problem-Solving
                </p>
                <p className="text-gray700">
                  Benefit from streamlined collaboration processes and effective
                  communication tools, enhancing efficiency in problem-solving.
                </p>
              </div>
            </div>
            <div className="expertise h-full">
              <div className="overflow-hidden max-h-[232px] w-full h-full">
                <Image
                  src={Expertise}
                  alt="solution"
                  height={232}
                  className="lg:h-auto object-cover lg:object-fill rounded-t-xl w-full"
                />
              </div>
              <div className="bg-white lg:min-h-[190px] rounded-b-xl lg:p-8 p-6 mb-6 lg:mb-0">
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
            <div className="collaboration h-full">
              <div className="overflow-hidden max-h-[232px] w-full h-full">
                <Image
                  src={Collaboration}
                  alt="solution"
                  height={232}
                  className="object-cover rounded-t-xl w-full"
                />
              </div>
              <div className="bg-white lg:min-h-[190px] rounded-b-xl lg:p-8 p-6 mb-6 lg:mb-0">
                <p className="text-gray900 text-xl font-medium mb-1">
                  AI-Enhanced Collaboration
                </p>
                <p className="text-gray700">
                  Utilize AI algorithms for project matching and personalized
                  recommendations, ensuring efficient collaboration and
                  fostering synergistic partnerships.
                </p>
              </div>
            </div>
            {/* <div className="growth"></div>
          <div className="solving"></div>
          <div className="expertise"></div>
          <div className="collaboration"></div> */}
          </div>
        </div>
        <div className="bg-white lg:px-32 px-4 lg:py-16 py-4 flex-col-reverse lg:flex-row flex items-center gap-8 lg:gap-20">
          <Image className="" src={GlobalCollab} alt="global-collab" />
          <div>
            <h2 className="lg:text-[40px] text-[28px] leading-[33px] lg:leading-[48px] text-[#2E2E33] mb-6">
              Global Collaboration: {!isMobile && <br />} Connect Across
              Boundaries
            </h2>
            <p className="text-base text-gray700 mb-6">
              At Collabo, we celebrate diversity and the richness it brings to
              collaboration. Join a vibrant community where individuals from
              diverse countries, backgrounds, and demographics come together to
              share their expertise, ideas, and perspectives.
            </p>
            <Link href="/auth/signup">
              <button className="bg-purple500 text-white flex items-center gap-1 py-3 px-6 rounded-lg">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-white lg:px-32 px-4 lg:py-16 py-10">
          <h2 className="lg:text-[40px] text-[28px] text-center text-[#2E2E33] max-w-[600px] mx-auto mb-8 lg:leading-10 leading-8">
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
          <div className="lg:flex flex-wrap mx-auto gap-4">
            {isLoading ? (
              <Loader />
            ) : filteredGroups.length === 0 ? (
              <div className="bg-white mx-auto w-full min-h-[240px] border border-milk shadow-card-shadow text-center rounded-xl p-4">
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
              filteredGroups?.slice(0, 3).map((group, i) => (
                <div
                  className="lg:w-[32%] mb-4 lg:mb-0 w-full p-4 rounded-xl border-milk border bg-white text-start"
                  key={i}
                >
                  <Link href={`/projects/${group.uuid}`}>
                    <div className="lg:h-[200px] h-[187px] mb-2">
                      <Image
                        src={group.photo || DefaultCover}
                        alt="banner"
                        width="0"
                        unoptimized
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
                          {group?.members?.slice(0, 3).map((member, i) => (
                            <Image
                              className={`rounded-full h-8 w-8 border border-white ${
                                i > 0 && "-ml-3"
                              }`}
                              src={member.avatar || Pic}
                              height={32}
                              width={32}
                              alt="avatar"
                              unoptimized
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
          <Link href="/explore">
            <button className="bg-purple500 mx-auto mt-6 text-white flex items-center gap-1 py-3 px-6 rounded-lg">
              See More
            </button>
          </Link>
        </div>
        <div className="bg-white lg:px-32 px-4 lg:py-16 py-10">
          <div className="bg-card-bg rounded-xl pb-8 lg:pb-0 lg:flex items-center justify-between gap-8 h-fit w-full relative">
            <div className="lg:px-20 px-6 py-8 lg:py-0 lg:max-w-[60%]">
              <h2 className="text-white lg:leading-[48px] leading-[33px] text-[28px] lg:text-[40px]">
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
            <Image
              src={HomeCollab}
              className="lg:mr-[78px] px-4 lg:px-0 mx-auto lg:mx-0"
              alt="image"
            />
          </div>
        </div>
        <footer className="lg:px-32 px-4 py-10">
          <div className="lg:flex items-start justify-between">
            <Image
              src={Logo}
              alt="logo"
              className="mx-auto lg:mx-0"
              height={32}
            />
            <div className="lg:text-right mt-8 lg:mt-0 text-center">
              <p className="text-gray900 text-xl mb-4 font-medium">
                Built by Aigbe Destiny
              </p>
              <p className="text-base text-gray700">
                This project is built and managed with love by{" "}
                <Link href="/" className="text-lg">
                  Aigbe Destiny
                </Link>
                . <br />
                Special thanks to Rise Program by Shcmidt Ventures
              </p>
            </div>
          </div>
          <div className="lg:flex items-center justify-end lg:mt-20 mt-10">
            <p className="text-gray700 text-center lg:text-start lg:mb-0 mb-6 text-sm mr-auto">
              © Copyright 2024, Collabo
            </p>
            <div className="flex items-center justify-center gap-8">
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
          </div>
        </footer>
      </div>
    </MainLayout>
  );
}
