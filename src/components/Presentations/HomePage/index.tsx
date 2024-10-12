import { useState } from "react";
import Instruction from "./Instructions";
import PopupModal from "./PopupModal";
import { NftMetadata } from "@/lib/interface";

const HomePage = () => {
  const [mintInfos, setMintInfos] = useState<null | NftMetadata>(null);

  return (
    <section style={{ position: "relative", zIndex: 2 }}>
      <div
        className="container overflow-auto"
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
