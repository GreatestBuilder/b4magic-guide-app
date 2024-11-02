import { PureImage } from "@/components/Commons/Logos";
import React, { useEffect, useState } from "react";
import Results from "./Results";
import { NftMetadata } from "@/lib/interface";

interface IPopupModalProps {
  onUpdate: (value: NftMetadata | null) => void;
  mintInfos: NftMetadata | null;
}

const PopupModal = (props: IPopupModalProps) => {
  const { onUpdate, mintInfos } = props;
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSuccess(true);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onCreate = () => {
    onUpdate(null);
  };

  return (
    <div
      className={`flex items-center justify-center ${
        isSuccess ? "md:h-full" : "h-full"
      } `}
    >
      {isSuccess ? (
        <Results onChange={onCreate} mintInfos={mintInfos} />
      ) : (
        <div className="relative">
          <PureImage
            style={{
              maxWidth: 515,
              width: "100%",
              backgroundColor: "transparent",
              position: "relative",
              zIndex: 2,
            }}
            url="/btn/FRAME-POPUP.svg"
          />
          <div className="bg-popup-frame"></div>
          <div className="absolute inset-0 flex justify-center items-center z-10 p-4">
            <div className="text-center">
              <h1 className="text-3xl mb-2" style={{ color: "white" }}>
                {mintInfos?.name}
              </h1>
              <p style={{ color: "white" }}>{mintInfos?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupModal;
