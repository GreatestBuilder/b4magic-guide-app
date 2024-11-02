"use client";

import {
  ConnectButton,
  useAccountModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { PureImage } from "../Logos";

export const MConnectBtn = () => {
  const { isConnecting, isConnected } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <button
        onClick={openConnectModal}
        disabled={isConnecting}
        className="flex"
      >
        <PureImage
          style={{
            width: "100%",
            maxWidth: 26,
          }}
          url="/btn/WALLET.svg"
        />
      </button>
    );
  }

  return (
    <div className="flex items-center justify-end gap-7">
      <button className="flex justify-center items-center py-1 px-4 border border-neutral-700 bg-neutral-800/30 rounded-xl  gap-x-2 cursor-pointer">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button onClick={openConnectModal} type="button">
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center" }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 20,
                              height: 20,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <PureImage
                                url={chain.iconUrl}
                                style={{ width: "100%", height: "100%" }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </button>
      <button onClick={async () => openAccountModal?.()}>
        <PureImage
          style={{
            width: "100%",
            maxWidth: 26,
          }}
          url="/btn/WALLET.svg"
        />
      </button>
    </div>
  );
};
