"use client";

import createGlobe from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";

interface Marker {
  location: [number, number];
  size: number;
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const DARK = theme === "dark" ? 1 : 0;
  const [width, setWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Handle resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const size = Math.min(Math.max(containerWidth, 200), 600);
        setWidth(size);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (!width) return;

    let phi = 0;
    const pixelRatio = window.devicePixelRatio || 1;

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: pixelRatio,
      width: width * pixelRatio,
      height: width * pixelRatio,
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
      ] as Marker[],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.01;

        if (isLoading) {
          setIsLoading(false);
        }
      },
    });

    return () => {
      globe.destroy();
    };
  }, [DARK, width, isLoading]);

  return (
    <div ref={containerRef} className="w-full max-w-[600px] relative">
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-[55vh] md:h-[65vh] bg-transparent">
          <Skeleton className="rounded-full w-4/5 h-4/5" />
        </div>
      ) : null}
      <canvas
        ref={canvasRef}
        style={{
          width: width,
          height: width,
          maxWidth: "100%",
          aspectRatio: "1",
          opacity: isLoading ? 0 : 1, // Hide canvas while loading
          transition: "opacity 1.5s ease-in-out",
        }}
      />
    </div>
  );
}
