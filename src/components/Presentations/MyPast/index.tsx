"use client";

import { PureImage } from "@/components/Commons/Logos";
import { useConnectContract } from "@/hooks/blockChain/useConnect";
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
  const { getNFTbyOwner } = useConnectContract();

  useEffect(() => {
    (async () => {
      if (address) {
        const res = await getNFTbyOwner(address);
        console.log(res);
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

  return (
    <div className="relative">
      <div>
        <div className="animated-bottom-to-top">
          <div className="grid grid-cols-4 gap-4">
            {myPassList?.data?.map((item, index) => {
              return (
                <div key={index}>
                  <div className="relative">
                    <PureImage url="/frame/MAGIC_FRAME.svg" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div>
                        <div className="text-6xl text-center">Up</div>
                        <div className="text-6xl text-center">
                          trend {item?.id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        <div
          className={`cursor-pointer ${
            current === 1 ? "text-primary-color" : "text-gray-400"
          }`}
          onClick={() => onPageChange({ page: 1, pageSize })}
        >
          Newest
        </div>
        <div>
          <PureImage url="/btn/PAGING-ICON.svg" />
        </div>
        {Array.from({
          length:
            Math.ceil(total / pageSize) > 5 ? 5 : Math.ceil(total / pageSize),
        }).map((_, index) => {
          return (
            <>
              <div
                key={index}
                className={`cursor-pointer ${
                  current === index + 1
                    ? "text-primary-color active-paging"
                    : "text-gray-400 default-paging"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </div>
              <div className="dot-active" />
            </>
          );
        })}
        <div>
          <PureImage url="/btn/PAGING-ICON.svg" />
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            onPageChange({
              page: Math.ceil(total / pageSize),
              pageSize,
            })
          }
        >
          Oldest
        </div>
      </div>
    </div>
  );
};
