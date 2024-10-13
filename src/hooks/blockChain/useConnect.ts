import { ContractAddress } from "@/lib/config";
import { turnRandomNumberFromRange } from "@/lib/utils";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useState } from "react";
import { useAccount } from "wagmi";
import QUOTE_LIST from "../../../data/quote_ipfs_mapping.json";
import abi from "../../components/ABI/abi.json";

const defaultUrl =
  "https://ipfs.io/ipfs/QmPw1ogeGvyrXRQNK8WD4WNTxsuwjvVsaKkmHP6HWQzrZm";

const useConnectContract = () => {
  const [isMinting, setIsMinting] = useState<null | boolean>(null);

  const { isConnected } = useAccount();

  const { openConnectModal } = useConnectModal();

  const onMintNft = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        setIsMinting(true);
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const nftContract = new ethers.Contract(ContractAddress, abi, signer);

        let nftTx = await nftContract.mintNFT(
          "QmUN9EQoBhmB8h3Eso613CupwJ3fiVvEzqmHBLNQm4ZArM"
        );
        console.log("Mining....", nftTx.hash);

        let tx = await nftTx.wait();
        console.log("Mined!", tx);
        if (tx) {
          const randomIndex = turnRandomNumberFromRange(
            1,
            177
          ).toString() as keyof typeof QUOTE_LIST;
          const getIpfsUrl = QUOTE_LIST[randomIndex];
          return getQuoteContent(getIpfsUrl);
        }
      } else {
        console.log("Ethereum object doesn't exist!");
        return null;
      }
    } catch (error) {
      console.log("Error minting character", error);
      setIsMinting(false);
      return null;
    }
  };

  const getNFTbyOwner = async (address: string) => {
    try {
      if (!isConnected) {
        openConnectModal?.();
        return;
      }

      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const nftContract = new ethers.Contract(ContractAddress, abi, provider);
        const result = await nftContract.getNFTsByOwner(address);
        return bigIntToString(result);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMintedNFT = async (tokenId: string) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const nftContract = new ethers.Contract(ContractAddress, abi, signer);
        const tokenUri = await nftContract.tokenURI(tokenId);
        return getQuoteContent(tokenUri);
      } else {
        console.log("Ethereum object doesn't exist!");
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
      console.log("====================================");
      console.log({ meta });
      console.log("====================================");
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
