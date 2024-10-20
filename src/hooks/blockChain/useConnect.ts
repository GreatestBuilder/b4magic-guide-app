import { ContractAddress, defaultWagmiConfig } from "@/lib/config";
import { turnRandomNumberFromRange } from "@/lib/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { readContract, writeContract } from "@wagmi/core";
import { useState } from "react";
import { baseSepolia } from "viem/chains";
import { useAccount, useSwitchChain } from "wagmi";
import QUOTE_LIST from "../../../data/quote_ipfs_mapping.json";
import abi from "../../components/ABI/abi.json";

const defaultUrl =
  "https://ipfs.io/ipfs/QmPw1ogeGvyrXRQNK8WD4WNTxsuwjvVsaKkmHP6HWQzrZm";

const useConnectContract = () => {
  const { isConnected, chain, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isMinting, setIsMinting] = useState<null | boolean>(null);

  const { switchChain } = useSwitchChain();

  const onMintNft = async () => {
    try {
      if (!isConnected) {
        openConnectModal?.();
        return;
      }
      if (baseSepolia.id !== chain?.id) {
        switchChain({
          chainId: baseSepolia.id,
        });
      }
      if (ContractAddress) {
        setIsMinting(true);
        const nftTx = await writeContract(defaultWagmiConfig, {
          abi,
          address: ContractAddress as any,
          functionName: "mintNFT",
          args: ["QmUN9EQoBhmB8h3Eso613CupwJ3fiVvEzqmHBLNQm4ZArM"],
        });

        if (nftTx) {
          const randomIndex = turnRandomNumberFromRange(
            1,
            177
          ).toString() as keyof typeof QUOTE_LIST;
          const getIpfsUrl = QUOTE_LIST[randomIndex];
          return getQuoteContent(getIpfsUrl);
        }
        return null;
      }
    } catch (error) {
      console.log("Error minting character", error);
      setIsMinting(false);
      return null;
    }
  };

  const getNFTbyOwner = async (_address: string) => {
    try {
      if (!isConnected) {
        openConnectModal?.();
        return;
      }
      if (_address) {
        const result = await readContract(defaultWagmiConfig, {
          abi,
          address: _address as any,
          functionName: "getNFTsByOwner",
          args: [address],
          account: address,
        });
        return bigIntToString(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMintedNFT = async (tokenId: string) => {
    try {
      const getMintedNFTResult = await readContract(defaultWagmiConfig, {
        abi,
        address: ContractAddress as any,
        functionName: "tokenURI",
        args: [tokenId],
      });
      if (getMintedNFTResult) {
        return getQuoteContent(getMintedNFTResult as string);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuoteContent = async (quoteUrl?: string) => {
    if (!quoteUrl) {
      return defaultUrl;
    }
    try {
      let response = await fetch(quoteUrl, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      let meta = response.json();
      setIsMinting(false);
      return meta;
    } catch (error) {
      setIsMinting(false);
      console.log(error);
      getQuoteContent(defaultUrl);
      return defaultUrl;
    }
  };

  return { onMintNft, isMinting, setIsMinting, getMintedNFT, getNFTbyOwner };
};

export { useConnectContract };

// Define a utility function to convert BigInt to string for JSON compatibility
const bigIntToString = (obj: any): any => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};
