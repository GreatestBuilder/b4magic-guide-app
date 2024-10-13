"use client";

import { Basenames } from "@/components/Presentations/Web3/BaseName";
import { emojiAvatarForAddress } from "@/lib/emojiAvatarForAddress";
import { middleEllipsis } from "@/lib/utils";
import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import { PureImage } from "../Logos";

export const ConnectBtn = () => {
  const { isConnecting, address, isConnected, chain } = useAccount();
  const { color: backgroundColor, emoji } = emojiAvatarForAddress(
    address ?? ""
  );

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <button onClick={openConnectModal} disabled={isConnecting}>
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
        <Basenames address={address} />
      </div>
    </div>
  );
};
