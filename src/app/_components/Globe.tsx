"use client";

import { Skeleton } from "@/components/ui/skeleton";
import createGlobe from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const DARK = theme === "dark" ? 1 : 0;
  const [size, setSize] = useState(400);
  const [isLoading, setIsLoading] = useState(true);

  // Handle resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setSize(containerWidth);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!size) return;

    let phi = 0;
    const pixelRatio = window.devicePixelRatio || 1;

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: pixelRatio,
      width: size * pixelRatio,
      height: size * pixelRatio,
      phi: 0,
      theta: 0,
      dark: DARK,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.7, 0.7, 0.7],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [23.685, 90.3563], size: 0.05 }, // Bangladesh
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;
        if (isLoading) setIsLoading(false);
      },
    });

    return () => globe.destroy();
  }, [DARK, size, isLoading]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px]"
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-4/5 w-4/5 rounded-full" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 1.5s ease-in-out",
        }}
      />
    </div>
  );
}
