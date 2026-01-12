"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./GuestPhotos.module.scss";
import containerStyles from "../../styles/container.module.scss";
import Icon from "../Icon/Icon";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { id: 1, src: "/images/Rectangle1.webp", alt: "Guest photo 1" },
  { id: 2, src: "/images/Rectangle2.webp", alt: "Guest photo 2" },
  { id: 3, src: "/images/Rectangle3.webp", alt: "Guest photo 3" },
  { id: 4, src: "/images/Rectangle4.webp", alt: "Guest photo 4" },
  { id: 5, src: "/images/Rectangle5.webp", alt: "Guest photo 5" },
  { id: 6, src: "/images/Rectangle6.webp", alt: "Guest photo 6" },
  { id: 7, src: "/images/Rectangle7.webp", alt: "Guest photo 7" },
  { id: 8, src: "/images/Rectangle8.webp", alt: "Guest photo 8" },
  { id: 9, src: "/images/Rectangle9.webp", alt: "Guest photo 9" },
  { id: 10, src: "/images/guest10.jpg", alt: "Guest photo 10" },
];

const totalPhotos = photos.length;

interface GuestPhotosProps {
  id?: string;
}

export default function GuestPhotos({ id }: GuestPhotosProps) {
  const mainPhoto = photos[0];
  const rightPhotos = photos.slice(1, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mainPhotoRef = useRef<HTMLDivElement>(null);
  const rightPhotosRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !mainPhotoRef.current || !rightPhotosRef.current || !footerRef.current) return;

    const photoWrappers = rightPhotosRef.current.children;

    gsap.set([titleRef.current, descriptionRef.current, buttonRef.current], {
      opacity: 0,
      y: 50,
    });

    gsap.set([mainPhotoRef.current, ...Array.from(photoWrappers)], {
      opacity: 0,
      y: 50,
    });

    gsap.set(footerRef.current, {
      opacity: 0,
      y: 50,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 30%",
      onEnter: () => {
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(descriptionRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              delay: 0.15,
              ease: "power3.out",
              onComplete: () => {
                gsap.to(buttonRef.current, {
                  opacity: 1,
                  y: 0,
                  duration: 0.4,
                  delay: 0.15,
                  ease: "power3.out",
                  onComplete: () => {
                    gsap.to(mainPhotoRef.current, {
                      opacity: 1,
                      y: 0,
                      duration: 0.4,
                      delay: 0.15,
                      ease: "power3.out",
                      onComplete: () => {
                        Array.from(photoWrappers).forEach((photo, index) => {
                          gsap.to(photo, {
                            opacity: 1,
                            y: 0,
                            duration: 0.4,
                            delay: index * 0.15,
                            ease: "power3.out",
                            onComplete: () => {
                              if (index === photoWrappers.length - 1) {
                                gsap.to(footerRef.current, {
                                  opacity: 1,
                                  y: 0,
                                  duration: 0.4,
                                  delay: 0.15,
                                  ease: "power3.out",
                                });
                              }
                            },
                          });
                        });
                      },
                    });
                  },
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
    <section id={id} ref={sectionRef} className={styles.guestPhotos}>
      <div className={containerStyles.container}>
        <div ref={headerRef} className={styles.header}>
          <div className={styles.left}>
            <h2 ref={titleRef} className={styles.title}>Фото від наших гостей</h2>
            <p ref={descriptionRef} className={styles.description}>
              Пориньте в атмосферу справжнього відпочинку очима наших гостей 🌿 У цьому розділі зібрані найщиріші миті — усмішки, теплі вечори біля чану, прогулянки з альпаками та неймовірні краєвиди лісу. Кожне фото передає частинку тієї гармонії й спокою, які панують у Alpaca House.
            </p>
          </div>
          <div className={styles.right}>
            <button ref={buttonRef} className={styles.viewAllButton}>
              Переглянути всі
              <Icon src="/icons/arrow_right.svg" size={24} className={styles.arrowIcon} />
            </button>
          </div>
        </div>
        <div className={styles.photosGrid}>
          <div ref={mainPhotoRef} className={styles.mainPhoto}>
            <Image
              src={mainPhoto.src}
              alt={mainPhoto.alt}
              width={400}
              height={400}
              className={styles.photo}
            />
            <div className={styles.overlay}></div>
            <div className={styles.photoCount}>{totalPhotos}+</div>
          </div>
          <div ref={rightPhotosRef} className={styles.rightPhotos}>
            {rightPhotos.map((photo) => (
              <div key={photo.id} className={styles.photoWrapper}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={200}
                  height={200}
                  className={styles.photo}
                />
              </div>
            ))}
          </div>
        </div>
        <div ref={footerRef} className={styles.footer}>
          <p className={styles.footerText}>
            📸 Поділіться і ви своїми спогадами — відзначайте нас у соцмережах, і ваше фото може з&apos;явитися тут! #AlpacaHouse #ВідпочинокСередПрироди #АльпакиІЧан
          </p>
        </div>
      </div>
    </section>
  );
}

