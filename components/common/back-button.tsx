"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface BackButtonProps {
  className?: string;
  label?: string;
}

export default function BackButton({
  className,
  label = "Go Back",
}: BackButtonProps) {
  const router = useRouter();

  return (
    <Button className={className} onClick={() => router.back()}>
      {label}
    </Button>
  );
}
