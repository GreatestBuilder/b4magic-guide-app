"use client";

import { ConnectBtn } from "@/components/Commons/Buttons/ConnectButton";
import { PureImage } from "@/components/Commons/Logos";
import { useConnectContract } from "@/hooks/blockChain/useConnect";
import { NftMetadata } from "@/lib/interface";
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import styles from "./Card.module.css";
import { ContractAddress } from "@/lib/config";
interface IMyPastUIProps {
  data: string[];
  total: number;
  current: number;
  pageSize?: number;
}

const DEFAULT_CURRENT = 1;
const DEFAULT_PAGE_SIZE = 8;

const MyPastUI = () => {
  const { address } = useAccount();
  const { getNFTbyOwner, getMintedNFT } = useConnectContract();

  const [nftInfos, setNftInfos] = useState<null | NftMetadata>(null);

  const nftsList = useRef<any>(null);

  const [myPassList, setMyPassList] = useState<IMyPastUIProps>({
    data: [],
    total: 0,
    current: DEFAULT_CURRENT,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  useEffect(() => {
    (async () => {
      if (ContractAddress) {
        const result = await getNFTbyOwner(ContractAddress);

        nftsList.current = result;
        setMyPassList((prev) => {
          return {
            ...prev,
            data: result?.slice(0, DEFAULT_PAGE_SIZE) ?? [],
            total: result?.length ?? 0,
          };
        });
      }
    })();
  }, [address]);

  const onReadNFTs = async (tokenId: string) => {
    if (nftInfos?.id === tokenId) {
      setNftInfos(null);
      return;
    }
    setNftInfos({ id: tokenId } as NftMetadata);
    // const result: NftMetadata = await new Promise((resolve) => {
    //   setTimeout(() => {
    //     return resolve(mockData);
    //   }, 3000);
    // });
    const result = await getMintedNFT(tokenId);

    setNftInfos((prev: any) => {
      return { ...prev, ...result };
    });
  };

  const handlePageChange = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    if (nftsList?.current?.length) {
      setMyPassList((prev: any) => {
        return {
          ...prev,
          current: page,
          data: nftsList.current?.slice((page - 1) * pageSize, page * pageSize),
        };
      });
    }
  };

  if (!address) {
    return (
      <div className="flex items-center justify-center">
        <ConnectBtn />
      </div>
    );
  }

  if (nftsList === null) {
    return (
      <div className="mt-24">
        <div className="text-xl text-center">loading ...</div>
      </div>
    );
  }
  if (!myPassList?.data?.length || nftsList?.current?.length === 0) {
    return (
      <div className="mt-24 flex items-center justify-center">
        <div className="text-3xl text-center">No NFTs found</div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="animated-bottom-to-top overflow-y-scroll h-[calc(100vh-235px)]">
        <div className="grid grid-cols-2 gap-0 md:grid-cols-4 md:gap-4">
          {myPassList?.data?.map((item) => {
            return (
              <button
                key={item}
                onClick={() => onReadNFTs(item)}
                className={styles.cardContainer}
              >
                <div
                  className={`${styles.card} ${
                    nftInfos?.name && nftInfos?.id === item
                      ? styles.flipped
                      : ""
                  }`}
                >
                  <PureImage url="/frame/MAGIC_FRAME.svg" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {(() => {
                      if (nftInfos?.id === item && !nftInfos?.name) {
                        return (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-3xl text-white">
                              Loading...
                            </div>
                          </div>
                        );
                      }
                      if (
                        nftInfos?.id === item &&
                        nftInfos?.id &&
                        nftInfos?.name
                      ) {
                        return (
                          <div>
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <div
                                className="text-3xl text-white"
                                style={{
                                  transform: "rotateY(180deg)",
                                }}
                              >
                                {nftInfos?.name}
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div>
                          <div className="text-5xl text-center">Up</div>
                          <div className="text-5xl text-center">trend</div>
                          <div
                            className="text-center"
                            style={{ fontSize: 10, marginTop: 24 }}
                          >
                            click to open
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {nftsList?.current?.length >= DEFAULT_PAGE_SIZE && (
        <div className="relative md:absolute md:right-[-80px] md:top-2 flex items-center justify-center">
          <div className="animated-right-to-left">
            <Pagination
              current={myPassList.current}
              total={myPassList.total}
              onPageChange={handlePageChange}
              pageSize={myPassList.pageSize ?? DEFAULT_PAGE_SIZE}
            />
          </div>
        </div>
      )}
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
    <div className="flex justify-center mt-4 md:mt-10">
      <div className="flex gap-4 flex-row md:flex-col items-center">
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
