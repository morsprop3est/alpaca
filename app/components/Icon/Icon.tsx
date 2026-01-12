"use client";

import { ReactNode, useState, useEffect } from "react";
import styles from "./Icon.module.scss";

interface IconProps {
  src?: string;
  children?: ReactNode;
  color?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function Icon({ src, children, color, size, width, height, className }: IconProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      fetch(src)
        .then((res) => res.text())
        .then((text) => {
          let modifiedText = text;
          if (color) {
            modifiedText = modifiedText.replace(/fill="(?!none)[^"]*"/gi, 'fill="currentColor"');
            modifiedText = modifiedText.replace(/fill='(?!none)[^']*'/gi, "fill='currentColor'");
          }
          setSvgContent(modifiedText);
        })
        .catch(() => setSvgContent(null));
    }
  }, [src, color]);

  const getSize = (value?: number | string) => {
    if (!value) return undefined;
    return typeof value === "number" ? `${value}px` : value;
  };

  const style: React.CSSProperties = {
    ...(color && { color }),
  };

  if (size) {
    style.width = getSize(size);
    style.height = getSize(size);
  } else {
    if (width) style.width = getSize(width);
    if (height) style.height = getSize(height);
    if (width && !height) style.height = "auto";
    if (height && !width) style.width = "auto";
  }

  const content = src && svgContent ? (
    <span dangerouslySetInnerHTML={{ __html: svgContent }} />
  ) : (
    children
  );

  return (
    <span className={`${styles.icon} ${color ? styles.withColor : ""} ${className || ""}`} style={style}>
      {content}
    </span>
  );
}

