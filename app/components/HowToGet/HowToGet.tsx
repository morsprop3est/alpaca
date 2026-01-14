"use client";

import { useEffect, useRef, MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HowToGet.module.scss";
import containerStyles from "../../styles/container.module.scss";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface HowToGetProps {
  id?: string;
}

export default function HowToGet({ id }: HowToGetProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const handleMapButtonClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('https://www.google.com/maps/search/Козлин,+Рівненська+область', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !leftRef.current || !rightRef.current) return;

    gsap.set(contentRef.current, {
      opacity: 0,
    });

    gsap.set([leftRef.current, rightRef.current], {
      opacity: 0,
      y: 50,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(contentRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(leftRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
              onComplete: () => {
                gsap.to(rightRef.current, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  ease: "power3.out",
                });
              },
            });
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id={id} ref={sectionRef} className={styles.howToGet}>
      <div className={containerStyles.container}>
        <div ref={contentRef} className={styles.content}>
          <div ref={leftRef} className={styles.left}>
            <h2 className={styles.title}>Як доїхати до Alpaca House</h2>
            <p className={styles.description}>
              Наші будиночки розташовані в тихому лісі всього за годину їзди від міста — достатньо близько, щоб швидко втекти від метушні, і водночас досить далеко, щоб зануритись у природу.
            </p>
            <a
              href="#main"
              className={styles.mapButton}
              onClick={handleMapButtonClick}
            >
              Показати на карті
            </a>
          </div>
          <div ref={rightRef} className={styles.right}>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.imageLink}
            >
              <Image
                src="/images/guide.webp"
                alt="Як доїхати"
                width={600}
                height={400}
                className={styles.image}
              />
              <div className={styles.playButton}>
                <div className={styles.playCircle}>
                  <div className={styles.playTriangle}></div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

