"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/*
 * View Transition Director
 * Detecta la dirección de navegación (forward / back / same-level)
 * y aplica clases al <html> para que CSS ejecute animaciones
 * cinematográficas específicas por tipo de transición.
 */

function getRouteDepth(path: string): number {
  // / = 0, /about = 1, /projects = 1, /projects/timeup = 2
  const segs = path.split("/").filter(Boolean);
  return segs.length;
}

function getRouteCategory(path: string): "home" | "about" | "projects" | "case-study" {
  if (path === "/") return "home";
  if (path === "/about") return "about";
  if (path === "/projects") return "projects";
  if (path.startsWith("/projects/")) return "case-study";
  return "home";
}

export function ViewTransitionDirector() {
  const pathname = usePathname();
  const prevPathRef = useRef<string>(pathname);

  useEffect(() => {
    const prev = prevPathRef.current;
    const next = pathname;
    const html = document.documentElement;

    // Clean previous directional classes
    html.classList.remove(
      "vt-forward",
      "vt-back",
      "vt-same-level",
      "vt-to-home",
      "vt-to-about",
      "vt-to-projects",
      "vt-to-case-study",
      "vt-from-home",
      "vt-from-about",
      "vt-from-projects",
      "vt-from-case-study"
    );

    if (prev === next) {
      prevPathRef.current = next;
      return;
    }

    const prevDepth = getRouteDepth(prev);
    const nextDepth = getRouteDepth(next);
    const prevCat = getRouteCategory(prev);
    const nextCat = getRouteCategory(next);

    // Direction
    if (nextDepth > prevDepth) {
      html.classList.add("vt-forward");
    } else if (nextDepth < prevDepth) {
      html.classList.add("vt-back");
    } else {
      html.classList.add("vt-same-level");
    }

    // From / To categories
    html.classList.add(`vt-from-${prevCat}`);
    html.classList.add(`vt-to-${nextCat}`);

    // Remove classes after transition completes (max 1.5s)
    const timer = setTimeout(() => {
      html.classList.remove(
        "vt-forward",
        "vt-back",
        "vt-same-level",
        "vt-to-home",
        "vt-to-about",
        "vt-to-projects",
        "vt-to-case-study",
        "vt-from-home",
        "vt-from-about",
        "vt-from-projects",
        "vt-from-case-study"
      );
    }, 1500);

    prevPathRef.current = next;
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
