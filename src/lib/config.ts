"use client";

import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { config as dotenvConfig } from "dotenv";
import { cookieStorage, createStorage, http } from "wagmi";

// Load environment variables from .env file
dotenvConfig();

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? ""; // Corrected to use process.env

const sepoliaChain = {
  id: 84532,
  name: "Base Sepolia Testnet",
  iconBackground: "#fff",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://sepolia.base.org"],
      // http: ["https://84532.rpc.thirdweb.com/d391b93f5f62d9c15f67142e43841acc"],
    },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://sepolia.etherscan.io" },
  },
  contracts: {
    multicall3: {
      address: "0x8FE1c1980F3DCDc905A102Dd90DeDB277BCE848D",
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;

const supportedChains: Chain[] = [sepoliaChain];

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

export const ContractAddress = process.env.NEXT_PUBLIC_SCA ?? "";
