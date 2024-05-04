import { useMediaQuery } from "react-responsive";

const breakpoints = {
  mobile: "576px",
  tablet: "768px",
  laptop: "992px",
  desktop: "1200px",
};
const device = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  laptop: `(max-width: ${breakpoints.laptop})`,
  desktop: `(max-width: ${breakpoints.desktop})`,
};

const useResponsive = () => {
  const isMobile = useMediaQuery({ query: device.mobile });
  const isTablet = useMediaQuery({ query: device.desktop });
  const isLaptop = useMediaQuery({ query: device.laptop });
  const isDesktop = useMediaQuery({ query: device.desktop });

  return { isMobile, isTablet, isLaptop, isDesktop };
};

export default useResponsive;
