"use client";

import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Reviews.module.scss";
import containerStyles from "../../styles/container.module.scss";
import Icon from "../Icon/Icon";
import Image from "next/image";
import Background from "../Background/Background";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  { id: 1, name: "Олена", city: "Київ", rating: 5, text: "Чудове місце для відпочинку! Альпаки дуже дружні, будиночок затишний, а чан просто казка. Обов'язково повернемось!", avatar: "/images/user1.jpg" },
  { id: 2, name: "Максим", city: "Львів", rating: 5, text: "Ідеальне місце, щоб втекти від міста. Тиша, природа, гарна атмосфера. Рекомендую всім!", avatar: "/images/user2.jpg" },
  { id: 3, name: "Анна", city: "Одеса", rating: 4, text: "Дуже сподобалося! Будиночок чистий, все необхідне є. Альпаки - це щось особливе!", avatar: "/images/user3.jpg" },
  { id: 4, name: "Дмитро", city: "Харків", rating: 5, text: "Найкращий відпочинок за останні роки. Обов'язково приїдемо ще раз з друзями.", avatar: "/images/user4.jpg" },
  { id: 5, name: "Марія", city: "Дніпро", rating: 5, text: "Неймовірна атмосфера! Чан під зорями - це щось незабутнє. Дякуємо за чудові враження!", avatar: "/images/user5.jpg" },
  { id: 6, name: "Олександр", city: "Запоріжжя", rating: 4, text: "Гарне місце для сімейного відпочинку. Дітям дуже сподобалося з альпаками.", avatar: "/images/user6.jpg" },
  { id: 7, name: "Катерина", city: "Вінниця", rating: 5, text: "Романтичний вікенд вийшов ідеальним. Будиночок затишний, природа навколо - краса!", avatar: "/images/user7.jpg" },
  { id: 8, name: "Андрій", city: "Тернопіль", rating: 5, text: "Супер місце! Всі послуги на висоті, персонал привітний. Обов'язково повернемось.", avatar: "/images/user8.jpg" },
  { id: 9, name: "Наталія", city: "Чернівці", rating: 4, text: "Дуже затишно і спокійно. Ідеально для перезавантаження після роботи.", avatar: "/images/user9.jpg" },
  { id: 10, name: "Віктор", city: "Полтава", rating: 5, text: "Найкращий відпочинок! Альпаки, чан, природа - все на вищому рівні. Рекомендую!", avatar: "/images/user10.jpg" },
  { id: 11, name: "Ірина", city: "Суми", rating: 5, text: "Неймовірні враження! Будиночок з усіма зручностями, природа навколо - ідеально.", avatar: "/images/user11.jpg" },
  { id: 12, name: "Сергій", city: "Миколаїв", rating: 4, text: "Гарне місце для відпочинку з друзями. Чан і барбекю - те, що треба!", avatar: "/images/user12.jpg" },
];

const ITEMS_PER_PAGE = 6;

interface ReviewsProps {
  id?: string;
}

export default function Reviews({ id }: ReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentReviews = reviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    gsap.set(contentRef.current, {
      opacity: 0,
      y: 50,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      onEnter: () => {
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useLayoutEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.children;
    if (cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 20 });
    
    Array.from(cards).forEach((card) => {
      const nameCity = card.querySelector(`.${styles.nameCity}`);
      const stars = card.querySelector(`.${styles.stars}`);
      const reviewText = card.querySelector(`.${styles.reviewText}`);
      
      if (nameCity) gsap.set(nameCity, { opacity: 0, y: 10 });
      if (stars) gsap.set(stars, { opacity: 0, y: 10 });
      if (reviewText) gsap.set(reviewText, { opacity: 0, y: 10 });
    });

    requestAnimationFrame(() => {
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: () => {
          Array.from(cards).forEach((card, index) => {
            const nameCity = card.querySelector(`.${styles.nameCity}`);
            const stars = card.querySelector(`.${styles.stars}`);
            const reviewText = card.querySelector(`.${styles.reviewText}`);
            
            const delay = index * 0.05;
            
            if (nameCity) {
              gsap.to(nameCity, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                delay: delay + 0.1,
                ease: "power2.out",
              });
            }
            
            if (stars) {
              gsap.to(stars, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                delay: delay + 0.15,
                ease: "power2.out",
              });
            }
            
            if (reviewText) {
              gsap.to(reviewText, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                delay: delay + 0.2,
                ease: "power2.out",
              });
            }
          });
        },
      });
    });
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1 && !isAnimating) {
      setIsAnimating(true);
      const cards = cardsRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.to(cards, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            setCurrentPage(currentPage - 1);
            setIsAnimating(false);
          },
        });
      } else {
        setCurrentPage(currentPage - 1);
        setIsAnimating(false);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages && !isAnimating) {
      setIsAnimating(true);
      const cards = cardsRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.to(cards, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.in",
          onComplete: () => {
            setCurrentPage(currentPage + 1);
            setIsAnimating(false);
          },
        });
      } else {
        setCurrentPage(currentPage + 1);
        setIsAnimating(false);
      }
    }
  };

  return (
    <section id={id} ref={sectionRef} className={styles.reviews}>
      <Background />
      <div className={containerStyles.container}>
        <div ref={contentRef}>
        <div className={styles.header}>
          <h2 className={styles.title}>Відгуки</h2>
          <div className={styles.arrows}>
            <button
              className={`${styles.arrow} ${styles.arrowLeft} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={handlePrev}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <Icon src="/icons/arrow_right.svg" size={24} color="#000" className={styles.arrowIcon} />
            </button>
            <button
              className={`${styles.arrow} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <Icon src="/icons/arrow_right.svg" size={24} color="#000" className={styles.arrowIcon} />
            </button>
          </div>
        </div>
        <div className={styles.cards} ref={cardsRef}>
          {currentReviews.map((review) => (
            <div key={review.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.avatarWrapper}>
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={100}
                    height={100}
                    className={styles.avatar}
                  />
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.nameCity}>
                    {review.name}, {review.city}
                  </div>
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        src="/icons/star.svg"
                        size={20}
                        color={i < review.rating ? "#F76F0B" : "#D9D9D9"}
                        className={styles.star}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.cardBottom}>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <button className={styles.submitButton}>Залишити відгук</button>
        </div>
        </div>
      </div>
    </section>
  );
}

