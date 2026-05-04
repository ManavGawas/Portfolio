"use client";
import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    // This fires silently in the background when the site loads
    console.log(
      "%c[SYNCORA SYSTEMS] %cSecure connection established.\n%cLooking for raw system telemetry and ML specs?\n%cInitialize terminal with: Cmd+K (or Ctrl+K)", 
      "color: #22d3ee; font-weight: bold; font-size: 14px;", 
      "color: #a3a3a3; font-size: 12px;",
      "color: #ffffff; font-size: 12px; margin-top: 5px;",
      "color: #22d3ee; font-family: monospace; font-size: 14px; margin-top: 5px; border: 1px solid #22d3ee; padding: 4px;"
    );
  }, []);

  return null; // It renders nothing to the screen
}