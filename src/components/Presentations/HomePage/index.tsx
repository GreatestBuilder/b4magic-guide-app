import { useState } from "react";
import Instruction from "./Instructions";
import PopupModal from "./PopupModal";

const HomePage = () => {
  const [isSwitchModal, setIsSwitchModal] = useState(false);

  return (
    <section style={{ position: "relative", zIndex: 2 }}>
      <div
        className="container overflow-auto"
        style={{
          height: "calc(100vh - 85px)",
          paddingBottom: 80,
        }}
      >
        {isSwitchModal ? (
          <PopupModal onUpdate={setIsSwitchModal} />
        ) : (
          <Instruction onUpdate={setIsSwitchModal} />
        )}
      </div>
    </section>
  );
};

export default HomePage;
