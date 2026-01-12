"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import styles from "./Background.module.scss";

export default function Background() {
  const leftAlpacaRef = useRef<HTMLDivElement>(null);
  const rightAlpacaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftAlpacaRef.current || !rightAlpacaRef.current) return;

    const randomTopLeft = Math.random() * 40;
    const randomTopRight = Math.random() * 40;

    gsap.set(leftAlpacaRef.current, {
      opacity: 0,
      scale: 0.8,
      top: `${randomTopLeft}%`,
    });

    gsap.set(rightAlpacaRef.current, {
      opacity: 0,
      scale: 0.8,
      top: `${randomTopRight}%`,
    });

    gsap.to([leftAlpacaRef.current, rightAlpacaRef.current], {
      opacity: 0.6,
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5,
    });
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;
    let leftVelocity = 0;
    let rightVelocity = 0;
    let leftPosition = 0;
    let rightPosition = 0;
    let scrollTimeout: NodeJS.Timeout;
    let isAnimating = false;

    const updatePosition = () => {
      leftVelocity *= 0.97;
      rightVelocity *= 0.97;

      leftPosition += leftVelocity;
      rightPosition += rightVelocity;

      if (leftAlpacaRef.current && rightAlpacaRef.current) {
        gsap.to(leftAlpacaRef.current, {
          y: leftPosition,
          duration: 0.1,
          ease: "none",
        });

        gsap.to(rightAlpacaRef.current, {
          y: rightPosition,
          duration: 0.1,
          ease: "none",
        });
      }

      if (Math.abs(leftVelocity) > 0.02 || Math.abs(rightVelocity) > 0.02) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        isAnimating = false;
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      if (leftAlpacaRef.current && rightAlpacaRef.current) {
        leftVelocity += scrollDelta * 0.001;
        rightVelocity += scrollDelta * 0.001;

        clearTimeout(scrollTimeout);

        if (!isAnimating) {
          isAnimating = true;
          updatePosition();
        }

        scrollTimeout = setTimeout(() => {
          if (!isAnimating) {
            isAnimating = true;
            updatePosition();
          }
        }, 50);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className={styles.background}>
      <div ref={leftAlpacaRef} className={styles.alpacaLeft}>
        <Image
          src="/icons/alpaca.svg"
          alt=""
          width={72}
          height={100}
          className={styles.alpacaIcon}
          unoptimized
        />
      </div>
      <div ref={rightAlpacaRef} className={styles.alpacaRight}>
        <Image
          src="/icons/alpaca.svg"
          alt=""
          width={72}
          height={100}
          className={styles.alpacaIcon}
          unoptimized
        />
      </div>
    </div>
  );
}

