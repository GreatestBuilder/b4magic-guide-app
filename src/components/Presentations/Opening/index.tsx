"use client";
import Intro from "./Intro";
import HomePage from "../HomePage";
import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "@/hooks/common/useLocalStorage";

const OpeningUI = () => {
  const [isItro, setIsItro] = useState(true);

  const [introStatus, setIntroStatus] = useLocalStorage("INTRO", "ACTIVE");

  const onIntroChange = () => {
    setIsItro(false);
    setIntroStatus("HIDE");
  };

  const mainClassName = useMemo(() => {
    return isItro ? "overlay-app overlay-intro" : "overlay-app overlay-default";
  }, [isItro]);

  useEffect(() => {
    if (introStatus === "HIDE") {
      setIsItro(false);
    }
  }, []);

  return (
    <>
      <div
        className="h-full inset-0 z-30 bg-app-intro"
        style={{
          position: "absolute",
          transform: isItro ? "translateX(0)" : "translateX(-100%)",
          transition: "all .5s ease",
        }}
      >
        <Intro onChange={onIntroChange} />
      </div>
      <div className={`h-full ${mainClassName}`}>
        <HomePage />
      </div>
    </>
  );
};

export default OpeningUI;
