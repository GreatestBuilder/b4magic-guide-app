import React, { useState } from "react";
import { ArrowLine } from "@/components/Commons";
import { Button } from "@/components/Commons/Buttons";
import { PureImage } from "@/components/Commons/Logos";

interface IInstructionProps {
  onUpdate: (value: boolean) => void;
}

const Instruction = (props: IInstructionProps) => {
  const { onUpdate } = props;
  const [isCollapse, setIsCollapse] = useState(false);

  const onChange = () => {
    setIsCollapse((prev) => !prev);
  };

  const onGo = () => {
    onUpdate(true);
  };

  return (
    <div>
      <div className="text-center mt-10">
        <h1 className="text-6xl text-primary-color">How to use</h1>
      </div>
      <div className="mx-auto max-w-[768px]">
        <div className="text-center py-5">
          <Button
            onClick={onChange}
            text={
              <PureImage
                style={{
                  width: 30,
                  transform: isCollapse ? "rotate(-180deg)" : "rotate(0deg)",
                  transition: "all .3s ease",
                }}
                url="/btn/ARROW.svg"
              />
            }
          />
        </div>
        <div
          style={{
            height: isCollapse ? "0px" : "100%",
            transition: "all .1s ease",
            overflow: "hidden",
          }}
        >
          <p className="highlight-bg border-b border-b-primary-color mb-5">
            1. Type in your question.
          </p>
          <p className="highlight-bg border-b border-b-primary-color mb-5">
            2. Close your eyes, concentrate completely on what you want to ask.
          </p>
          <p className="highlight-bg border-b border-b-primary-color mb-5">
            {` 3. Hold down the GO button (don't let go), when your intuition
      tells you the right time,
      <br /> release the mouse and you will have the answer after
      confirming the transaction.`}
          </p>
          <p className="highlight-bg border-b border-b-primary-color mb-5">
            4. Repeat the process for other questions.
          </p>
        </div>
        <div className="mt-10">
          <div
            className="h-56 w-full"
            style={{
              border: "1px solid #f2da85",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <div className="pb-2 relative text-area-style">
              <div className="flex items-center gap-5 text-primary-color">
                <div className="text-nowrap">Type in your question</div>
                <ArrowLine />
              </div>
            </div>
            <textarea
              className="h-full w-full text-primary-color"
              style={{
                backgroundColor: "transparent",
                outline: "none",
                border: "none",
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-center">
          <Button
            onClick={onGo}
            text={<PureImage style={{ width: 200 }} url="/btn/GO.svg" />}
          />
        </div>
      </div>
      <div className="mt-10 mx-auto max-w-[525px]">
        <div>
          <div className="flex items-center gap-4">
            <div className="text-primary-color text-xl">Note</div>
            <ArrowLine style={{ height: "auto" }} />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <PureImage
              style={{
                width: 15,
              }}
              url="/btn/RECTANGLE.svg"
            />
            <div>
              Your question must be related to future results, not known
              results.
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <PureImage
              style={{
                width: 15,
              }}
              url="/btn/RECTANGLE.svg"
            />
            <div>
              Your question must be about yourself; don’t ask about others.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instruction;
