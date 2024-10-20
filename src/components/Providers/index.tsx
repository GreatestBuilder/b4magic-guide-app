"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { defaultWagmiConfig } from "@/lib/config";
import { coinbaseWallet } from "wagmi/connectors";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
  cookie?: string | null;
};

export default function Providers({ children, cookie }: Readonly<Props>) {
  const initialState = cookieToInitialState(defaultWagmiConfig, cookie);

  if (coinbaseWallet && "preference" in coinbaseWallet) {
    (coinbaseWallet as any).preference = "smartWalletOnly";
  }

  return (
    <WagmiProvider config={defaultWagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#0E76FD",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
