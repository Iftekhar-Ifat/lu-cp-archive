"use client";

import createGlobe from "cobe";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

interface Marker {
  location: [number, number];
  size: number;
}

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const DARK = theme === "dark" ? 1 : 0;

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current as HTMLCanvasElement, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
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
  }, [DARK]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}
