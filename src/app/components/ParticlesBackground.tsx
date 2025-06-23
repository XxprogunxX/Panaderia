"use client";
import { Particles } from "@tsparticles/react";

const particlesOptions = {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  particles: {
    number: { value: 40, density: { enable: true, value_area: 800 } },
    color: { value: ["#f7971e", "#a1887f", "#fff7e6", "#4b3a2f"] },
    shape: { type: "circle" },
    opacity: { value: 0.4, random: true },
    size: { value: 6, random: { enable: true, minimumValue: 2 } },
    move: {
      enable: true,
      speed: 1.2,
      direction: "none" as const,
      random: true,
      straight: false,
      outModes: { default: "out" as const },
    },
    links: {
      enable: true,
      distance: 120,
      color: "#e0c097",
      opacity: 0.25,
      width: 1.2,
    },
  },
  detectRetina: true,
};

export default function ParticlesBackground() {
  return (
    <Particles
      id="tsparticles-hero"
      options={particlesOptions}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
} 