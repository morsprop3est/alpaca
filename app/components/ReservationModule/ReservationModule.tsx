"use client";

import styles from "./ReservationModule.module.scss";
import containerStyles from "../../styles/container.module.scss";

export default function ReservationModule() {
  return (
    <section className={styles.reservationModule}>
      <div className={containerStyles.container}>
        <div className={styles.content}>
          <iframe
            src="https://module.roomster.com.ua/ua/859ff2a5-ca61-417e-a37e-a712700fe50a"
            className={styles.iframe}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
