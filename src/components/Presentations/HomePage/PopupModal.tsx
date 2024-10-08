import { PureImage } from "@/components/Commons/Logos";
import React, { useEffect, useState } from "react";
import Results from "./Results";

interface IPopupModalProps {
  onUpdate: (value: boolean) => void;
}

const PopupModal = (props: IPopupModalProps) => {
  const { onUpdate } = props;
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
    onUpdate(false);
  };

  return (
    <div className="flex items-center justify-center h-full">
      {isSuccess ? (
        <Results onChange={onCreate} />
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
              A Game. <br /> A prophecy. <br /> Or a message from the universe.{" "}
              <br /> Whatever you see in this book, you should believe before
              you ask. <br /> And you should only seek answers, if you truly
              believe or want to believe. If you are confused by the choices, if
              you are indecisive, if you do not know what to do next : ask a
              question. And let the gods decide for you.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupModal;
