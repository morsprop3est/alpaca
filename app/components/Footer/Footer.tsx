"use client";

import { MouseEvent } from "react";
import styles from "./Footer.module.scss";
import containerStyles from "../../styles/container.module.scss";
import Icon from "../Icon/Icon";

const socialLinks = [
  { id: 1, icon: "/icons/instagram.svg", href: "https://instagram.com" },
  { id: 2, icon: "/icons/telegram.svg", href: "https://telegram.org" },
  { id: 3, icon: "/icons/tik_tok.svg", href: "https://tiktok.com" },
  { id: 4, icon: "/icons/youtube.svg", href: "https://youtube.com" },
];

export default function Footer() {
  const handleScrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("main");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={containerStyles.container}>
        <div className={styles.top}>
          <div className={styles.logoSection}>
            <a href="#main" className={styles.logoLink} onClick={handleScrollToTop}>
              <Icon src="/icons/header_logo.svg" height={60} color="#000" className={styles.logo} />
            </a>
            <div className={styles.social}>
              {socialLinks.map((social, index) => (
                <a
                  key={social.id}
                  href="#main"
                  onClick={handleScrollToTop}
                  className={`${styles.socialLink} ${index % 2 === 0 ? styles.black : styles.orange}`}
                >
                  <Icon src={social.icon} size={32} className={styles.socialIcon} />
                </a>
              ))}
            </div>
          </div>
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>Контакти</h3>
            <a href="tel:+380999999999" className={styles.contactLink}>+38(099) 999-99-99</a>
            <a href="mailto:alpaca_house@gmail.com" className={styles.contactLink}>alpaca_house@gmail.com</a>
          </div>
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>Контакти</h3>
            <a href="tel:+380999999999" className={styles.contactLink}>+38(099) 999-99-99</a>
            <a href="mailto:alpaca_house@gmail.com" className={styles.contactLink}>alpaca_house@gmail.com</a>
          </div>
          <div className={styles.contactSection}>
            <h3 className={styles.contactTitle}>Контакти</h3>
            <a href="tel:+380999999999" className={styles.contactLink}>+38(099) 999-99-99</a>
            <a href="mailto:alpaca_house@gmail.com" className={styles.contactLink}>alpaca_house@gmail.com</a>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            Copyright © 2025 ALPACA HOUSE
          </div>
          <div className={styles.created}>
            Created by Chumak Roma
          </div>
        </div>
      </div>
    </footer>
  );
}

