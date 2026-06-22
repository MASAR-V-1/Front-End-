import React from "react";
import Image from "next/image";
const Logo = ({ width, height }) => {
  return (
    <Image
      style={{ cursor: "pointer", borderRadius: "40%" }}
      src="/logo.png"
      alt="شعار منصة مسار"
      width={width}
      height={height}
      priority
    />
  );
};

export default Logo;
