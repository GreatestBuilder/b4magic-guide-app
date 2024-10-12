import { ArrowLine } from "@/components/Commons";
import { PureImage } from "@/components/Commons/Logos";
import { NftMetadata } from "@/lib/interface";

interface IResultsProps {
  onChange: () => void;
  mintInfos: NftMetadata | null;
}

const Results = (props: IResultsProps) => {
  const { onChange, mintInfos } = props;
  return (
    <div>
      <div className="grid grid-cols-3 gap-10">
        <div className="flex justify-end ">
          <button
            className="relative h-12 w-[200px] cursor-pointer"
            onClick={onChange}
          >
            <PureImage
              style={{
                width: "100%",
                maxWidth: 200,
              }}
              url="/btn/BTN-FRAME.svg"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-3 ">
                <div className="text-nowrap text-primary-color">Create new</div>
                <PureImage
                  style={{
                    width: "100%",
                    maxWidth: 18,
                  }}
                  url="/btn/PLUS.png"
                />
              </div>
            </div>
          </button>
        </div>
        <div className="mt-[-30px]">
          <div className="relative">
            <PureImage url={mintInfos?.image} />
          </div>
        </div>
        <div>
          <div>
            <div className="pb-2 relative text-area-style">
              <div className="flex items-center gap-5 text-primary-color">
                <div className="text-nowrap">Share</div>
                <ArrowLine />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="btn-border">
                    <div className="flex items-center gap-2">
                      <PureImage
                        style={{
                          width: 20,
                          height: 20,
                        }}
                        url="/btn/X-ICO.svg"
                      />
                      <div className="text-primary-color">Twitter</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="btn-border">
                    <div className="flex items-center gap-2">
                      <PureImage
                        style={{
                          width: 20,
                          height: 20,
                        }}
                        url="/btn/FAR-ICO.svg"
                      />
                      <div className="text-primary-color">Farcaster</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="btn-border">
                    <div className="flex items-center gap-2">
                      <PureImage
                        style={{
                          width: 20,
                          height: 20,
                        }}
                        url="/btn/COPY-ICO.svg"
                      />
                      <div className="text-primary-color">Copy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 relative text-area-style">
              <div className="flex items-center gap-5 text-primary-color">
                <div className="text-nowrap">Note</div>
                <ArrowLine />
              </div>
            </div>
            <div style={{ color: "white" }}>
              The way you ask the question and the level of focus will determine
              the accuracy of the message. The question should be specific, in
              yes-no or multiple-choice format. If you want more guidance,
              rephrase the question and repeat the steps.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
