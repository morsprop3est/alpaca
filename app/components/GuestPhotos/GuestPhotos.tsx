"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [wasGalleryOpen, setWasGalleryOpen] = useState(false);
  const galleryModalRef = useRef<HTMLDivElement>(null);
  const galleryContentRef = useRef<HTMLDivElement>(null);
  const fullscreenModalRef = useRef<HTMLDivElement>(null);
  const fullscreenImageWrapperRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!isFullscreenOpen) return;

    if (fullscreenImageWrapperRef.current) {
      gsap.fromTo(
        fullscreenImageWrapperRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreenOpen(false);
        if (wasGalleryOpen) {
          setIsGalleryOpen(true);
          setWasGalleryOpen(false);
        }
      } else if (e.key === 'ArrowLeft') {
        setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isFullscreenOpen, isGalleryOpen]);

  useEffect(() => {
    if (!isGalleryOpen) return;

    if (galleryContentRef.current) {
      gsap.fromTo(
        galleryContentRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsGalleryOpen(false);
        setWasGalleryOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isGalleryOpen]);

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
            <button ref={buttonRef} className={styles.viewAllButton} onClick={() => {
              setIsGalleryOpen(true);
              setWasGalleryOpen(false);
            }}>
              Переглянути всі
              <Icon src="/icons/arrow_right.svg" size={24} className={styles.arrowIcon} />
            </button>
          </div>
        </div>
        <div className={styles.photosGrid}>
          <div ref={mainPhotoRef} className={styles.mainPhoto} style={{ cursor: 'pointer' }} onClick={() => {
            setCurrentPhotoIndex(0);
            setWasGalleryOpen(false);
            setIsFullscreenOpen(true);
          }}>
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
            {rightPhotos.map((photo, index) => (
              <div key={photo.id} className={styles.photoWrapper} style={{ cursor: 'pointer' }} onClick={() => {
                setCurrentPhotoIndex(index + 1);
                setWasGalleryOpen(false);
                setIsFullscreenOpen(true);
              }}>
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

      {isGalleryOpen && (
        <div ref={galleryModalRef} className={styles.galleryModal} onClick={() => {
          setIsGalleryOpen(false);
          setWasGalleryOpen(false);
        }}>
          <div ref={galleryContentRef} className={styles.galleryContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.galleryHeader}>
              <button className={styles.closeBtn} onClick={() => {
                setIsGalleryOpen(false);
                setWasGalleryOpen(false);
              }}>×</button>
            </div>
            <div className={styles.galleryGrid}>
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={styles.galleryItem}
                  onClick={() => {
                    setCurrentPhotoIndex(index);
                    setWasGalleryOpen(true);
                    setIsFullscreenOpen(true);
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={300}
                    height={300}
                    className={styles.galleryPhoto}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isFullscreenOpen && (
        <div ref={fullscreenModalRef} className={styles.fullscreenModal} onClick={() => {
          setIsFullscreenOpen(false);
          if (wasGalleryOpen) {
            setIsGalleryOpen(true);
            setWasGalleryOpen(false);
          }
        }}>
          <div className={styles.fullscreenHeader}>
            <button className={styles.fullscreenCloseBtn} onClick={(e) => {
              e.stopPropagation();
              setIsFullscreenOpen(false);
              if (wasGalleryOpen) {
                setIsGalleryOpen(true);
                setWasGalleryOpen(false);
              }
            }}>×</button>
          </div>
          <button
            className={styles.fullscreenPrevBtn}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
            }}
          >
            <Icon src="/icons/arrow_right.svg" size={32} color="#fff" className={styles.arrowLeft} />
          </button>
          <div ref={fullscreenImageWrapperRef} className={styles.fullscreenImageWrapper} onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[currentPhotoIndex].src}
              alt={photos[currentPhotoIndex].alt}
              width={1200}
              height={800}
              className={styles.fullscreenImage}
            />
          </div>
          <button
            className={styles.fullscreenNextBtn}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
            }}
          >
            <Icon src="/icons/arrow_right.svg" size={32} color="#fff" />
          </button>
          <div className={styles.fullscreenCounter}>
            {currentPhotoIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}

