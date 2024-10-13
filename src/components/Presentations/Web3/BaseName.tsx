import React from "react";
import { Avatar, Identity, Name, Address } from "@coinbase/onchainkit/identity";
import { base } from "viem/chains";

interface DisplayBasenameProps {
  address: `0x${string}` | undefined;
}

export function Basenames({ address }: DisplayBasenameProps) {
  return (
    <Identity className="wallet-btn" address={address} chain={base}>
      <Avatar
        style={{ width: 30, height: 30 }}
        address={address}
        chain={base}
      />
      <Name address={address} chain={base} />
      <Address />
    </Identity>
  );
}
