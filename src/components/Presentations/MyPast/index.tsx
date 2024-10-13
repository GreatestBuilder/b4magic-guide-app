"use client";

import { ConnectBtn } from "@/components/Commons/Buttons/ConnectButton";
import { PureImage } from "@/components/Commons/Logos";
import { useConnectContract } from "@/hooks/blockChain/useConnect";
import { NftMetadata } from "@/lib/interface";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";

interface IMyPastUIProps {
  data: Array<{
    id: number;
    title: string;
  }>;
  total: number;
  current: number;
  pageSize?: number;
}

const DEFAULT_CURRENT = 1;
const DEFAULT_PAGE_SIZE = 8;
const DEFAULT_LENGTH = 17;

const MyPastUI = () => {
  const { address } = useAccount();
  const { getNFTbyOwner, getMintedNFT } = useConnectContract();
  const { openConnectModal } = useConnectModal();

  const [nftsList, setNftsList] = useState<null | string[]>(null);
  const [nftInfos, setNftInfos] = useState<null | NftMetadata>(null);

  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (address) {
        // const test = "0x73092Bf0134CC1a74a2d25DEAd432d2708cde8Da";
        const result = await getNFTbyOwner(address);
        setNftsList(result);
        console.log(result);
      }
    })();
  }, [address]);

  const mockArr = useMemo(() => {
    return Array.from({ length: DEFAULT_LENGTH }).map((_, index) => {
      return {
        id: index,
        title: "title",
      };
    });
  }, []);

  const [myPassList, setMyPassList] = useState<IMyPastUIProps>({
    data: [],
    total: 0,
    current: DEFAULT_CURRENT,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    setMyPassList((prev) => {
      return {
        ...prev,
        data: mockArr.slice(0, DEFAULT_PAGE_SIZE),
        total: mockArr.length,
      };
    });
  }, []);

  const onReadNFTs = async (tokenId: string) => {
    setActiveId(tokenId);
    const result = await getMintedNFT(tokenId);
    // const result = mockData;
    setNftInfos(result);
    console.log("====================================");
    console.log({ result });
    console.log("====================================");
  };

  const handlePageChange = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    setMyPassList((prev) => {
      return {
        ...prev,
        current: page,
        data: mockArr.slice((page - 1) * pageSize, page * pageSize),
      };
    });
  };
  if (!address) {
    openConnectModal?.();
    return null;
  }

  if (nftsList === null) {
    return (
      <div className="mt-24">
        <div className="text-xl text-center">loading ...</div>
      </div>
    );
  }
  if (nftsList?.length === 0) {
    return (
      <div className="mt-24">
        <div className="text-3xl text-center">No NFTs found</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div>
        <div className="animated-bottom-to-top">
          <div className="grid grid-cols-4 gap-4">
            {nftsList?.map((item, index) => {
              return (
                <button key={index} onClick={() => onReadNFTs(item)}>
                  <div className="relative">
                    <PureImage url="/frame/MAGIC_FRAME.svg" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {activeId === item ? (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <div className="text-3xl text-white">Loading...</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-6xl text-center">Up</div>
                          <div className="text-6xl text-center">trend</div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute right-[-80px] top-2 flex items-center justify-center">
          <div className="animated-right-to-left">
            <Pagination
              current={myPassList.current}
              total={myPassList.total}
              onPageChange={handlePageChange}
              pageSize={myPassList.pageSize ?? DEFAULT_PAGE_SIZE}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPastUI;

interface IPaginationProps {
  total: number;
  current: number;
  pageSize: number;
  onPageChange: ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => void;
}

const Pagination = (props: IPaginationProps) => {
  const { total, current, onPageChange, pageSize } = props;

  const handlePageChange = (page: number) => {
    onPageChange({ page, pageSize });
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex gap-4 flex-col items-center">
        <button
          className={`cursor-pointer ${
            current === 1 ? "text-primary-color" : "text-gray-400"
          }`}
          onClick={() => onPageChange({ page: 1, pageSize })}
        >
          Newest
        </button>
        <div>
          <PureImage url="/btn/PAGING-ICON.svg" />
        </div>
        {Array.from({
          length:
            Math.ceil(total / pageSize) > 5 ? 5 : Math.ceil(total / pageSize),
        }).map((_, index) => {
          return (
            <>
              <button
                key={index}
                className={`cursor-pointer ${
                  current === index + 1
                    ? "text-primary-color active-paging"
                    : "text-gray-400 default-paging"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
              <div className="dot-active" />
            </>
          );
        })}
        <div>
          <PureImage url="/btn/PAGING-ICON.svg" />
        </div>
        <button
          className="cursor-pointer"
          onClick={() =>
            onPageChange({
              page: Math.ceil(total / pageSize),
              pageSize,
            })
          }
        >
          Oldest
        </button>
      </div>
    </div>
  );
};

const mockData = {
  name: "God NFT - Secret Book",
  description: "Nothing is random, everything is for granted",
  image: "http://ipfs.io/ipfs/QmXMyx1hgyLHyQ2CpJ7kUrBAbGoMszV5gDAwNS2dmHX9ba",
  attributes: [
    {
      trait_type: "Quote",
      value: "Of course",
    },
  ],
};
