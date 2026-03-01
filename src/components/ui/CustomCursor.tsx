"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });

    const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3.out" });
    const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    window.addEventListener("mousemove", move);
    
    // Setup hover effects dynamically via MutationObserver to catch new elements
    const handleHover = () => {
      gsap.to(follower, { 
        scale: 2.5, 
        backgroundColor: "rgba(247, 246, 242, 0.1)", 
        backdropFilter: "blur(4px)",
        borderColor: "rgba(247, 246, 242, 0)",
        duration: 0.3 
      });
      gsap.to(cursor, { scale: 0, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: "transparent", 
        backdropFilter: "blur(0px)",
        borderColor: "rgba(247, 246, 242, 0.4)",
        duration: 0.3 
      });
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    const attachListeners = () => {
      document.querySelectorAll('a, button, input').forEach(el => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleLeave);
      });
    };

    attachListeners();

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll('a, button, input').forEach(el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-offwhite rounded-full z-[9999] pointer-events-none mix-blend-difference" 
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-offwhite/40 rounded-full z-[9998] pointer-events-none transition-colors" 
      />
      <style jsx global>{`
        @media (min-width: 768px) {
          body, a, button {
            cursor: none !important;
          }
        }
      `}</style>
    </div>
  );
}
