"use client";

import { useEffect, useRef } from "react";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";
import { PureImage } from "../Logos";
import { middleEllipsis } from "@/lib/utils";

export const ConnectBtn = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(
    address ?? ""
  );

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <button
        onClick={async () => {
          // Disconnecting wallet first because sometimes when is connected but the user is not connected
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      >
        <div className="relative h-12 w-[200px] cursor-pointer">
          <PureImage
            style={{
              width: "100%",
              maxWidth: 200,
            }}
            url="/btn/BTN-FRAME.svg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {isConnecting ? (
              <div>Connecting...</div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="text-nowrap text-primary-color capitalize">
                  connect wallet
                </div>
                <PureImage
                  style={{
                    width: "100%",
                    maxWidth: 20,
                  }}
                  url="/btn/WALLET.png"
                />
              </div>
            )}
          </div>
        </div>
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button className="btn" onClick={openChainModal}>
        <div className="relative h-10 w-[200px] cursor-pointer">
          <PureImage
            style={{
              width: "100%",
              maxWidth: 200,
            }}
            url="/btn/BTN-FRAME.svg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            Wrong network
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div
        className="flex justify-center items-center py-2 px-4 border border-neutral-700 bg-neutral-800/30 rounded-xl  gap-x-2 cursor-pointer"
        onClick={async () => openAccountModal?.()}
      >
        <div
          tabIndex={1}
          className="h-4 w-4 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
          style={{
            backgroundColor,
            boxShadow: "0px 2px 2px 0px rgba(81, 98, 255, 0.20)",
          }}
        >
          {emoji}
        </div>
        <div>{middleEllipsis(address)}</div>
      </div>
      <button className="btn ml-2" onClick={openChainModal}>
        Switch Networks
      </button>
    </div>
  );
};
