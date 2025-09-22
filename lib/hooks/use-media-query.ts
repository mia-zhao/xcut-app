"use client";

import { useEffect, useState } from "react";

export default function useMediaQuery() {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setDevice("mobile");
      } else if (
        window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches
      ) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
  }, []);

  return {
    width: dimensions.width,
    height: dimensions.height,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
