"use client";

import { http, createStorage, cookieStorage } from "wagmi";
import { sepolia, bscTestnet, blastSepolia } from "wagmi/chains";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { config as dotenvConfig } from "dotenv";

// Load environment variables from .env file
dotenvConfig();

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? ""; // Corrected to use process.env

const supportedChains: Chain[] = [sepolia, bscTestnet, blastSepolia];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
