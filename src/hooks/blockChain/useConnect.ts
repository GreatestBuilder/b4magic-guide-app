import { client, ContractAddress } from "@/lib/config";
import { ethers } from "ethers";
import { useState } from "react";
import { getContract } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";
import {
  useActiveAccount,
  useActiveWalletChain,
  useSwitchActiveWalletChain,
} from "thirdweb/react";
import { useWriteContract } from "wagmi";
import abi from "../../components/ABI/abi.json";

const defaultUrl =
  "https://ipfs.io/ipfs/QmPw1ogeGvyrXRQNK8WD4WNTxsuwjvVsaKkmHP6HWQzrZm";

const useConnectContract = () => {
  const isConnected = false;
  // const { isConnected } = useAccount();
  // const { openConnectModal } = useConnectModal();
  const [isMinting, setIsMinting] = useState<null | boolean>(null);

  const activeAccount = useActiveAccount();
  const { writeContractAsync } = useWriteContract();
  const walletChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();

  // const {} = useReadContract(abi, {
  //   contract,
  //   address: activeAccount?.address ?? "",
  // });

  const onMintNft = async () => {
    try {
      setIsMinting(true);
      if (walletChain?.id !== baseSepolia.id) await switchChain(baseSepolia);

      const thirdwebContract = getContract({
        address: ContractAddress,
        chain: baseSepolia,
        client: client,
      });

      console.log("====================================");
      console.log({ thirdwebContract });
      console.log("====================================");
      const hash = await writeContractAsync({
        abi,
        address: "0x8FE1c1980F3DCDc905A102Dd90DeDB277BCE848D",
        functionName: "mintNFT",
        args: ["QmUN9EQoBhmB8h3Eso613CupwJ3fiVvEzqmHBLNQm4ZArM"],
      });
      console.log({ hash });
      alert("Transaction submitted: " + hash);
    } catch (error) {
      console.log("Error minting character", error);
      setIsMinting(false);
      return null;
    }
  };
  // const onMintNft = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (ethereum) {
  //       setIsMinting(true);
  //       const provider = new ethers.BrowserProvider(ethereum);
  //       const signer = await provider.getSigner();
  //       const nftContract = new ethers.Contract(ContractAddress, abi, signer);

  //       let nftTx = await nftContract.mintNFT(
  //         "QmUN9EQoBhmB8h3Eso613CupwJ3fiVvEzqmHBLNQm4ZArM"
  //       );
  //       console.log("Mining....", nftTx.hash);

  //       let tx = await nftTx.wait();
  //       console.log("Mined!", tx);
  //       if (tx) {
  //         const randomIndex = turnRandomNumberFromRange(
  //           1,
  //           177
  //         ).toString() as keyof typeof QUOTE_LIST;
  //         const getIpfsUrl = QUOTE_LIST[randomIndex];
  //         return getQuoteContent(getIpfsUrl);
  //       }
  //     } else {
  //       console.log("Ethereum object doesn't exist!");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log("Error minting character", error);
  //     setIsMinting(false);
  //     return null;
  //   }
  // };

  const getNFTbyOwner = async (address: string) => {
    try {
      if (!isConnected) {
        // openConnectModal?.();
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
