"use client";

import {
  Chain,
  connectorsForWallets,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { config as dotenvConfig } from "dotenv";
import { base, baseSepolia } from "viem/chains";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";

// Load environment variables from .env file
dotenvConfig();

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? ""; // Corrected to use process.env

const supportedChains: Chain[] = [base, baseSepolia];

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
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [coinbaseWallet],
    },
    {
      groupName: "Popular",
      wallets: [rainbowWallet, metaMaskWallet],
    },
    {
      groupName: "Wallet Connect",
      wallets: [walletConnectWallet],
    },
  ],
  {
    appName: "B4Magic guild App",
    projectId,
  }
);

export const defaultWagmiConfig = createConfig({
  connectors,
  chains: [base, baseSepolia],
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

export const ContractAddress = process.env.NEXT_PUBLIC_SCA ?? "";
