"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

export const ModeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        ref={ref}
        variant="ghost"
        type="button"
        size="icon"
        className="px-2"
        {...props}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] text-foreground" />
      </Button>
    );
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      {...props}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] text-foreground dark:hidden" />
      <MoonIcon className="hidden h-[1.2rem] w-[1.2rem] text-foreground dark:block" />
    </Button>
  );
});

ModeToggle.displayName = "ModeToggle";
