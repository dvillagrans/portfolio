"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

export const ModeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
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

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const currentTheme = theme || resolvedTheme || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    console.log("Toggle clicked - Current theme:", currentTheme, "New theme:", newTheme);

    // Forzar el cambio de tema
    setTheme(newTheme);

    // Como backup, también manipulamos el DOM directamente
    setTimeout(() => {
      const html = document.documentElement;
      if (newTheme === "dark") {
        html.classList.add("dark");
        html.style.colorScheme = "dark";
      } else {
        html.classList.remove("dark");
        html.style.colorScheme = "light";
      }
      localStorage.setItem("portfolio-theme", newTheme);
      console.log("Theme updated. HTML classes:", html.className);
    }, 0);
  };

  const currentTheme = theme || resolvedTheme || "dark";

  return (
    <Button
      ref={ref}
      variant="ghost"
      type="button"
      size="icon"
      className="px-2"
      onClick={toggleTheme}
      {...props}
    >
      {currentTheme === "dark" ? (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] text-foreground" />
      ) : (
        <SunIcon className="h-[1.2rem] w-[1.2rem] text-foreground" />
      )}
    </Button>
  );
});

ModeToggle.displayName = "ModeToggle";
