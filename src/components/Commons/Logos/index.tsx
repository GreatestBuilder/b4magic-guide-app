import Image from "next/image";
import React from "react";

interface ILogoProps {
  url?: string;
  mode?: "contain" | "cover" | "fill" | "none" | "scale-down";
  className?: string;
  style?: React.CSSProperties;
}

const PureImage: React.FC<ILogoProps> = ({ url, mode, className, style }) => {
  return (
    <Image
      priority
      src={url ?? "/logo/LOGO.png"}
      width={0}
      height={0}
      sizes="100vw"
      quality={100}
      style={{
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        maxWidth: "100%",
        objectFit: mode ?? "contain",
        ...style,
      }}
      alt={`${url}`}
      className={className}
    />
  );
};

const EpicLogo = () => {
  return (
    <div className="flex gap-3 items-center	">
      <PureImage style={{ width: 85, height: "auto" }} />
      <div className="text-primary-color text-2xl">B4magic.guide</div>
    </div>
  );
};

export { PureImage, EpicLogo };
