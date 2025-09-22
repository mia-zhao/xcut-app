"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.scrollY > window.innerHeight);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => toggleVisibility();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        className="fixed bottom-32 right-8 md:right-16 lg:right-32 h-10 w-10 p-2 transition-opacity duration-300 ease-in-out"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </Button>
    )
  );
}
