"use client";

import { useState } from "react";
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

  return (
    <main id={id} className={styles.main}>
      <div className={containerStyles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.location}>
              <span className={styles.dot}></span>
              <span>Козлин, Рівненська область.</span>
            </div>
            <h1 className={styles.title}>Тиша лісу, тепло чану, погляд альпаки</h1>
            <p className={styles.description}>
              Запрошуємо вас на незабутній відпочинок у затишних будиночках серед лісу! Це ідеальне місце для тих, хто мріє втекти від міського шуму, перезавантажитися і насолодитися спокоєм природи.
            </p>
          </div>
          <div className={styles.right}>
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


