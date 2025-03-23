import Image from "next/image";

export default function ResponsiveImg({ src, alt, basedOnWidth = true }) {
  return (
    <Image
      src={src}
      alt={alt || "image"}
      width={0}
      height={0}
      sizes="100vw"
      style={
        basedOnWidth
          ? { width: "100%", height: "auto" }
          : { width: "auto", height: "100%" }
      }
    />
  );
}
