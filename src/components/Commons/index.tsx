import { PureImage } from "./Logos";

const ArrowLine = (props?: { style?: React.CSSProperties }) => {
  return (
    <PureImage
      style={{ width: "100%", height: 10, objectFit: "cover", ...props?.style }}
      url="/btn/ARROW-FULL.svg"
    />
  );
};

export { ArrowLine };
