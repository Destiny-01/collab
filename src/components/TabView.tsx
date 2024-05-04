import useResponsive from "@/hooks/useResponsive";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";

type Tabs = {
  title: string;
  image?: JSX.Element;
  component: any;
  props?: any;
};

function TabBar({
  tabs,
  aside,
  active,
}: {
  tabs: Tabs[];
  aside?: any;
  active?: any;
}) {
  const { isMobile } = useResponsive();
  const { titles, components } = useMemo(() => {
    const titles: Tabs[] = [];
    const components: Tabs[] = [];
    tabs.forEach((tab) => {
      titles.push({
        title: tab.title,
        image: tab.image,
        component: tab.component,
      });
      components.push(tab);
    });
    return { titles, components };
  }, [tabs]);
  const asPath = usePathname();
  const searchParams = useSearchParams();
  const queryTab = searchParams.get("tab");

  const [tab, setTab] = useState(queryTab || "");

  const tabIndex = useMemo(() => {
    const result = titles.findIndex((val) => val.title === tab);
    return result < 0 ? 0 : result;
  }, [tab, titles]);
  const DefaultComp = components[active - 1 || tabIndex];
  const borderBottomColor = "border-purple400";

  return (
    <div className="w-full">
      <div
        className={`flex bg-white justify-between ${
          isMobile && "overflow-x-scroll overflow-y-hidden no-scrollbar"
        } border-b`}
      >
        <div className={`flex gap-1 items-end lg:ml-8 ml-4 mt-4`}>
          {titles.map((title, index) => (
            <p
              className={`text-sm cursor-pointer flex gap-2 transition-all p-4 sm:text-sm  ${
                titles[active - 1 || tabIndex] === title
                  ? `relative text-purple400 after:content-"" after:block after:w-full after:absolute lg:after:-bottom-px after:bottom-0 after:left-0 after:border-b after:border-[#9065F2]`
                  : "text-gray700"
              }`}
              key={index}
              onClick={() => {
                const routerPush = () => {
                  const path = asPath.split("?")[0];
                  const newUrl =
                    "?" +
                    new URLSearchParams({
                      tab: title.title,
                    }).toString();
                  window.history.replaceState(
                    {
                      ...window.history.state,
                      as: path + newUrl,
                      url: path + newUrl,
                    },
                    "",
                    path + newUrl
                  );
                };
                routerPush();
                setTab(title.title);
              }}
            >
              {title.title}
              {title.image}
            </p>
          ))}
        </div>
        {aside && aside}
      </div>
      <DefaultComp.component {...DefaultComp.props} />
    </div>
  );
}

export default TabBar;
