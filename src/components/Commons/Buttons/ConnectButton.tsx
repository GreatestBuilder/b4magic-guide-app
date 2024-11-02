"use client";

import { Basenames } from "@/components/Presentations/Web3/BaseName";
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
      <button
        className="flex justify-center items-center py-2 px-4 border border-neutral-700 bg-neutral-800/30 rounded-xl  gap-x-2 cursor-pointer"
        onClick={async () => openAccountModal?.()}
      >
        <Basenames address={address} />
      </button>
    </div>
  );
};

// import { ConnectButton } from "@rainbow-me/rainbowkit";

// export const ConnectBtn = () => {
//   return (
//     <ConnectButton.Custom>
//       {({
//         account,
//         chain,
//         openAccountModal,
//         openChainModal,
//         openConnectModal,
//         authenticationStatus,
//         mounted,
//       }) => {
//         // Note: If your app doesn't use authentication, you
//         // can remove all 'authenticationStatus' checks
//         const ready = mounted && authenticationStatus !== "loading";
//         const connected =
//           ready &&
//           account &&
//           chain &&
//           (!authenticationStatus || authenticationStatus === "authenticated");
//         return (
//           <div
//             {...(!ready && {
//               "aria-hidden": true,
//               style: {
//                 opacity: 0,
//                 pointerEvents: "none",
//                 userSelect: "none",
//               },
//             })}
//           >
//             {(() => {
//               if (!connected) {
//                 return (
//                   <button onClick={openConnectModal} type="button">
//                     Connect Wallet
//                   </button>
//                 );
//               }
//               if (chain.unsupported) {
//                 return (
//                   <button onClick={openChainModal} type="button">
//                     Wrong network
//                   </button>
//                 );
//               }
//               return (
//                 <div style={{ display: "flex", gap: 12 }}>
//                   <button
//                     onClick={openChainModal}
//                     style={{ display: "flex", alignItems: "center" }}
//                     type="button"
//                   >
//                     {chain.hasIcon && (
//                       <div
//                         style={{
//                           background: chain.iconBackground,
//                           width: 12,
//                           height: 12,
//                           borderRadius: 999,
//                           overflow: "hidden",
//                           marginRight: 4,
//                         }}
//                       >
//                         {chain.iconUrl && (
//                           <img
//                             alt={chain.name ?? "Chain icon"}
//                             src={chain.iconUrl}
//                             style={{ width: 12, height: 12 }}
//                           />
//                         )}
//                       </div>
//                     )}
//                     {chain.name}
//                   </button>
//                   <button onClick={openAccountModal} type="button">
//                     {account.displayName}
//                     {account.displayBalance
//                       ? ` (${account.displayBalance})`
//                       : ""}
//                   </button>
//                 </div>
//               );
//             })()}
//           </div>
//         );
//       }}
//     </ConnectButton.Custom>
//   );
// };
