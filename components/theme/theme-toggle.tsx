"use client";

import { LucideIcon, Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("modeToggle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="border rounded-lg p-1 bg-background/50 backdrop-blur-sm h-10 w-[120px]" />
    );
  }

  return (
    <ToggleGroup
      type="single"
      value={theme}
      onValueChange={(value: string) => {
        if (value) setTheme(value);
      }}
      className="border rounded-lg p-1 bg-background/50 backdrop-blur-sm"
    >
      <ThemeToggleItem value="system" icon={Monitor} label={t("system")} />
      <ThemeToggleItem value="light" icon={Sun} label={t("light")} />
      <ThemeToggleItem value="dark" icon={Moon} label={t("dark")} />
    </ToggleGroup>
  );
}

const ThemeToggleItem = ({
  value,
  icon: Icon,
  label,
}: {
  value: string;
  icon: LucideIcon;
  label: string;
}) => (
  <ToggleGroupItem
    value={value}
    aria-label={label}
    className="cursor-pointer h-8 w-8 p-0 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
  >
    <Icon className="h-4 w-4" />
  </ToggleGroupItem>
);
