import React from "react";
import { ColorIcon } from "../components/icons/Icon";
import { useScroll } from "../hooks/useScroll";
import { useNavBarContext } from "../context/NavBarContext";

export const Container = ({
  children,
  title,
  subtitle,
  icon,
  headerType,
  headerChildren,
}) => {
  const { expanded } = useNavBarContext();
  return (
    <div
      className={`min-h-screen ${
        expanded ? "w-[85%]" : "w-[95%]"
      } border pt-10 bg-gray-100  transition-all duration-100`}
    >
      <Header
        title={title}
        subtitle={subtitle}
        icon={icon}
        headerType={headerType}
        headerChildren={headerChildren}
      />
      <div className="px-10 pb-10 mt-10">{children}</div>
    </div>
  );
};

export const Header = ({
  title,
  subtitle,
  icon,
  headerType,
  headerChildren,
}) => {
  const scrollPosition = useScroll();
  return (
    <>
      {headerType !== "static" && (
        <ScrollableHeader title={title} subtitle={subtitle} icon={icon} />
      )}
      {(scrollPosition > 90 || headerType === "static") && (
        <StaticHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
          children={headerChildren}
        />
      )}
    </>
  );
};

export const StaticHeader = ({ title, icon, subtitle, children }) => (
  <div className="flex flex-col p-10 fixed shadow-md top-12 bg-white w-full py-3 gap-6">
    <div className="flex flex-row items-end gap-6 ">
      <div className="flex gap-2 items-center">
        <ColorIcon color="FFBB64" fontSize="30px">
          {icon}
        </ColorIcon>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <h2 className="text-xl font-bold text-nc-dark-orange">{subtitle}</h2>
    </div>
    {children}
  </div>
);

const ScrollableHeader = ({ title, icon, subtitle }) => (
  <div className={`px-10 py-2 flex flex-col`}>
    <div className="flex gap-2 items-center">
      <ColorIcon color="FFBB64" fontSize="30px">
        {icon}
      </ColorIcon>
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
    <hr className="my-4 w-48" />
    <h2 className="text-xl font-bold text-nc-dark-orange">{subtitle}</h2>
  </div>
);
