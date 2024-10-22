"use client";

import createGlobe from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

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

  // Handle resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        // Calculate the size (max 600px, min 200px)
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
      height: width * pixelRatio, // Keep aspect ratio 1:1
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
      },
    });

    return () => {
      globe.destroy();
    };
  }, [DARK, width]);

  return (
    <div ref={containerRef} className="w-full max-w-[600px]">
      <canvas
        ref={canvasRef}
        style={{
          width: width,
          height: width,
          maxWidth: "100%",
          aspectRatio: "1",
        }}
      />
    </div>
  );
}
