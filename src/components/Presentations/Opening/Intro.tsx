import { Button } from "@/components/Commons/Buttons";
import { PureImage } from "@/components/Commons/Logos";
// import { useEffect } from "react";

interface IIntroProps {
  onChange: () => void;
}

const Intro = (props: IIntroProps) => {
  const { onChange } = props;

  // useEffect(() => {
  //   localStorage.setItem("INTRO", "HIDE");
  // }, []);

  return (
    <div className="container h-full relative">
      <div className="h-full flex flex-col justify-end">
        <div className="py-8">
          <div className="flex gap-16 items-end	flex-wrap  justify-center">
            <div className="text-intro text-center text-primary-color flex-[3]">
              <div className="typewriter">
                <div className="text-typing">Nothing is random,</div>
              </div>
              <div className="typewriter xl:text-right text-center">
                <div className="text-typing">everything is for granted.</div>
              </div>
            </div>
            <Button
              onClick={onChange}
              style={{ textAlign: "right" }}
              text={
                <PureImage style={{ width: 200 }} url="/btn/BTN-SKIP.svg" />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
