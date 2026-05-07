"use client";
import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    // Intentionally silent in production. Remove verbose console output.
  }, []);

  return null; // It renders nothing to the screen
}