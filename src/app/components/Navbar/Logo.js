import React from "react";
import Image from "next/image";
const Logo = ({ width, height }) => {
  return (
    <Image
      style={{ cursor: "pointer" }}
      src="/logo.svg"
      alt="شعار منصة مسار"
      width={width}
      height={height}
      priority
    />
  );
};

export default Logo;
