"use client";
import { ConnectBtn } from "@/components/Commons/Buttons/ConnectButton";
import { MConnectBtn } from "@/components/Commons/Buttons/MConnectButton";
import { EpicLogo, PureImage } from "@/components/Commons/Logos";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const Headers = () => {
  const router = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const isActivePath = useMemo(() => {
    if (router === "/") {
      return "home";
    }
    if (router === "/mypast") {
      return "mypast";
    }
    return "home";
  }, [router]);

  const onCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="animated-top-to-bottom z-20 relative">
      <nav className="container">
        <div className="flex gap-4 justify-between items-center  text-lg capitalize text-primary-color py-3 md:py-0 px-3 md:px-0">
          <div className="flex-[5] md:flex-1">
            <EpicLogo />
          </div>
          <div className="hidden md:block md:flex-[2]">
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
          <div className="flex md:flex-1">
            <div className="hidden md:block">
              <ConnectBtn />
            </div>
            <div className="block md:hidden">
              <MConnectBtn />
            </div>
          </div>
          <div className="flex flex-1 md:hidden justify-end ">
            <button onClick={onCollapse}>
              <PureImage url="/btn/HAMBURGER.svg" style={{ width: 26 }} />
            </button>
          </div>
        </div>
      </nav>
      <div
        className={`fixed top-0 z-[1000] w-full h-full transition-all duration-300 ease-in-out ${
          isOpen ? "left-0" : "left-[-100%]"
        }`}
        style={{
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(3px)",
        }}
      >
        <div className="p-5 text-white h-full">
          <div className="flex justify-between items-center">
            <button onClick={onCollapse}>
              <Link href="/">
                <PureImage url="/btn/LOGO.svg" style={{ width: 65 }} />
              </Link>
            </button>
            <button onClick={onCollapse} className="">
              <PureImage
                url="/btn/PLUS.svg"
                style={{ width: 26, transform: "rotate(45deg)" }}
              />
            </button>
          </div>
          <div className="flex items-center justify-center h-[calc(100vh-200px)] text-3xl flex-col">
            <div>
              <div className="py-3">
                <button onClick={onCollapse}>
                  <Link href="/">
                    <div
                      className={`cursor-pointer py-3 capitalize ${
                        isActivePath === "home"
                          ? "text-primary-color underline-custom"
                          : ""
                      }`}
                    >
                      question
                    </div>
                  </Link>
                </button>
              </div>
              <div>
                <button onClick={onCollapse}>
                  <Link href="/mypast">
                    <div
                      className={`cursor-pointer py-3 capitalize ${
                        isActivePath === "mypast"
                          ? "text-primary-color underline-custom"
                          : ""
                      }`}
                    >
                      your past
                    </div>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Headers;
