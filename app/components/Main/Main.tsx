"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Main.module.scss";
import containerStyles from "../../styles/container.module.scss";
import Input from "../Input/Input";
// import BookingModal from "../BookingModal/BookingModal";
import Icon from "../Icon/Icon";

interface MainProps {
  id?: string;
}

export default function Main({ id }: MainProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!leftRef.current || !rightRef.current || !buttonRef.current || !arrowRef.current) return;

    const tl = gsap.timeline({ delay: 2.5 });

    gsap.set([buttonRef.current, arrowRef.current], {
      opacity: 0,
    });

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
      )
      .to(buttonRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(arrowRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!arrowRef.current) return;

    const arrow = arrowRef.current;
    gsap.set(arrow, { rotation: 90, transformOrigin: 'center center' });
    
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tl.to(arrow, {
      rotation: 105,
      duration: 0.15,
      ease: 'power2.inOut',
    })
      .to(arrow, {
        rotation: 75,
        duration: 0.15,
        ease: 'power2.inOut',
      })
      .to(arrow, {
        rotation: 100,
        duration: 0.1,
        ease: 'power2.inOut',
      })
      .to(arrow, {
        rotation: 80,
        duration: 0.1,
        ease: 'power2.inOut',
      })
      .to(arrow, {
        rotation: 90,
        duration: 0.15,
        ease: 'power2.inOut',
      });

    return () => {
      tl.kill();
    };
  }, []);

  const handleBookingClick = () => {
    const element = document.getElementById('reservation-module');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
            <div className={styles.bookingWrapper}>
              <button ref={buttonRef} className={styles.submitBtn} onClick={handleBookingClick}>Забронювати</button>
              <div ref={arrowRef} className={styles.arrowDown}>
                <Icon src="/icons/arrow_right.svg" size={48} color="#fff" />
              </div>
            </div>
          </div>
          <div ref={rightRef} className={styles.right}>
            {/* <div className={styles.bookingHeader}>
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
            </div> */}
          </div>
        </div>
      </div>
      {/* <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </main>
  );
}


