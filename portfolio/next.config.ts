import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // as per the console error message:
  allowedDevOrigins: ["192.168.1.104", "localhost", "192.168.1.104:3000"],
  // silence turbopack root warning:
  turbopack: {
    root: "C:\\Users\\manav\\Manav\\Projects\\Portfolio\\portfolio",
  },
} as any;

export default nextConfig;
