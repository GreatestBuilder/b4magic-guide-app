"use client";
import { ConnectBtn } from "@/components/Commons/Buttons/ConnectButton";
import { EpicLogo, PureImage } from "@/components/Commons/Logos";
import useLocalStorage from "@/hooks/common/useLocalStorage";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const Headers = () => {
  const router = usePathname();

  const [introStatus] = useLocalStorage("INTRO", "");

  const isActivePath = useMemo(() => {
    if (router === "/") {
      return "home";
    }
    if (router === "/mypast") {
      return "mypast";
    }
    return "home";
  }, [router]);

  return (
    <header className="animated-top-to-bottom z-20 relative">
      <nav className="container">
        <div className="flex gap-4 justify-between items-center  text-lg capitalize text-primary-color">
          <div style={{ flex: 1 }}>
            <EpicLogo />
          </div>
          <div style={{ flex: 2 }}>
            <div className="flex gap-20 justify-center items-center">
              <Link href="/">
                <div className="relative cursor-pointer header-item">
                  <PureImage
                    url="/btn/HIGHLIGHT.svg"
                    style={{
                      width: 120,
                      opacity: isActivePath === "home" ? 1 : 0,
                    }}
                  />
                  <div className="absolute flex items-center justify-center gap-2 inset-0">
                    question
                  </div>
                </div>
              </Link>
              <div>
                <PureImage url="/btn/RECTANGLE.svg" style={{ width: 15 }} />
              </div>
              <Link href="/mypast">
                <div className="relative cursor-pointer header-item">
                  <PureImage
                    url="/btn/HIGHLIGHT.svg"
                    style={{
                      width: 120,
                      opacity: isActivePath === "mypast" ? 1 : 0,
                    }}
                  />
                  <div className="absolute flex items-center justify-center gap-2 inset-0">
                    your past
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <ConnectBtn />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Headers;
