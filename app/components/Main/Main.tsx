"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Main.module.scss";
import containerStyles from "../../styles/container.module.scss";
import Input from "../Input/Input";
import Booking from "../Booking/Booking";

interface MainProps {
  id?: string;
}

export default function Main({ id }: MainProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;

    const tl = gsap.timeline({ delay: 2.5 });

    tl.fromTo(
      leftRef.current,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }
    )
      .fromTo(
        rightRef.current,
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <main id={id} className={styles.main}>
      <div className={containerStyles.container}>
        <div className={styles.content}>
          <div ref={leftRef} className={styles.left}>
            <div className={styles.location}>
              <a 
                href="https://www.google.com/maps/search/Козлин,+Рівненська+область" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.locationLink}
              >
                <span className={styles.dot}></span>
                <span>Козлин, Рівненська область.</span>
              </a>
            </div>
            <h1 className={styles.title}>Тиша лісу, тепло чану, погляд альпаки</h1>
            <p className={styles.description}>
              Запрошуємо вас на незабутній відпочинок у затишних будиночках серед лісу! Це ідеальне місце для тих, хто мріє втекти від міського шуму, перезавантажитися і насолодитися спокоєм природи.
            </p>
          </div>
          <div ref={rightRef} className={styles.right}>
            <div className={styles.bookingHeader}>
              <div className={styles.bookingTitle}>Виберіть дати</div>
              <div className={styles.bookingSubtitle}>Дата заїзду та дата виїзду</div>
            </div>
            <div className={styles.bookingForm}>
              <div className={styles.datesRow}>
                <Input
                  type="date"
                  label="Заїзд"
                  placeholder="Замовити"
                  icon="/icons/calendar.svg"
                  value={checkIn}
                  onChange={setCheckIn}
                />
                <Input
                  type="date"
                  label="Виїзд"
                  placeholder="Замовити"
                  icon="/icons/calendar.svg"
                  value={checkOut}
                  onChange={setCheckOut}
                />
              </div>
              <Input
                type="guests"
                label="Кількість людей"
                placeholder="Оберіть кількість"
                icon="/icons/users.svg"
                value={guests}
                onChange={setGuests}
              />
              <button className={styles.submitBtn} onClick={() => setIsModalOpen(true)}>Замовити</button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
            <Booking />
          </div>
        </div>
      )}
    </main>
  );
}


