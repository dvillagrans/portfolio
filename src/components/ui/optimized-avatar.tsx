"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";

const OptimizedAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
OptimizedAvatar.displayName = AvatarPrimitive.Root.displayName;

interface OptimizedAvatarImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: number;
  priority?: boolean;
  sizes?: string;
}

const OptimizedAvatarImage = React.forwardRef<
  HTMLDivElement,
  OptimizedAvatarImageProps
>(({ src, alt, className, size = 40, priority = false, sizes, ...props }, ref) => {
  // Generar srcSet para imágenes optimizadas si están disponibles
  const generateSrcSet = (originalSrc: string) => {
    const baseName = originalSrc.replace('/img/', '').replace('.webp', '');
    const optimizedPath = '/img/optimized';
    
    // Verificar si es una imagen que tenemos optimizada
    const optimizedImages = ['me', 'melari', 'batiz', 'escom'];
    if (optimizedImages.includes(baseName)) {
      return {
        src: `${optimizedPath}/${baseName}-${size}.webp`,
        srcSet: `
          ${optimizedPath}/${baseName}-48.webp 48w,
          ${optimizedPath}/${baseName}-64.webp 64w,
          ${optimizedPath}/${baseName}-96.webp 96w,
          ${optimizedPath}/${baseName}-128.webp 128w
        `.trim()
      };
    }
    return { src: originalSrc, srcSet: undefined };
  };
  
  const { src: optimizedSrc, srcSet } = generateSrcSet(src);
  
  return (
    <div
      ref={ref}
      className={cn("aspect-square h-full w-full relative", className)}
      {...props}
    >
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        className="object-cover"
        priority={priority}
        sizes={sizes || `${size}px`}
        quality={85}
        {...(srcSet && { 
          srcSet,
          onError: (e) => {
            // Fallback a imagen original si la optimizada falla
            e.currentTarget.src = src;
          }
        })}
      />
    </div>
  );
});
OptimizedAvatarImage.displayName = "OptimizedAvatarImage";

const OptimizedAvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
OptimizedAvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { OptimizedAvatar, OptimizedAvatarImage, OptimizedAvatarFallback }