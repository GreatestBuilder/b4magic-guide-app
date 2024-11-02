import { useState } from "react";
import Instruction from "./Instructions";
import PopupModal from "./PopupModal";
import { NftMetadata } from "@/lib/interface";

const HomePage = () => {
  const [mintInfos, setMintInfos] = useState<null | NftMetadata>(null);

  return (
    <section
      style={{ position: "relative", zIndex: 2 }}
      className="px-4 xl:px-0"
    >
      <div
        className="container overflow-y-auto overflow-x-hidden"
        style={{
          height: "calc(100vh - 85px)",
          paddingBottom: 80,
        }}
      >
        {mintInfos ? (
          <PopupModal onUpdate={setMintInfos} mintInfos={mintInfos} />
        ) : (
          <Instruction onUpdate={setMintInfos} />
        )}
      </div>
    </section>
  );
};

export default HomePage;
