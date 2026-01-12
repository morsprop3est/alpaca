"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import containerStyles from "../../styles/container.module.scss";
import Icon from "../Icon/Icon";

const navItems = [
  { href: "#main", label: "Головна" },
  { href: "#about", label: "Про Нас" },
  { href: "#rules", label: "Правила" },
  { href: "#howtoget", label: "Як доїхати" },
  { href: "#reviews", label: "Відгуки" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoHeight, setLogoHeight] = useState(60);
  const [activeSection, setActiveSection] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);

      if (currentScrollY < 5) {
        setIsVisible(true);
      } else {
        const scrollDelta = currentScrollY - lastScrollY.current;
        if (Math.abs(scrollDelta) >= 5) {
          if (scrollDelta > 0) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          lastScrollY.current = currentScrollY;
        }
      }

      const sections = navItems.map((item) => {
        const id = item.href.substring(1);
        const element = document.getElementById(id);
        return { id, element };
      });

      if (currentScrollY < 100) {
        setActiveSection("main");
        return;
      }

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          const offsetHeight = section.element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      setActiveSection("");
    };

    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setLogoHeight(40);
      } else if (window.innerWidth <= 1023) {
        setLogoHeight(50);
      } else {
        setLogoHeight(60);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const href = target.getAttribute("href");
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setIsMenuOpen(false);
          }
        }
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClick);
    handleResize();
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("main");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${!isVisible ? styles.hidden : ""}`}>
      <div className={containerStyles.container}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <a href="#main" className={styles.logoLink} onClick={handleLogoClick}>
              <Icon src="/icons/header_logo.svg" height={logoHeight} color={isScrolled ? "#000" : "#fff"} />
            </a>
          </div>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.link} ${activeSection === item.href.substring(1) ? styles.active : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayOpen : ""}`} onClick={toggleMenu}></div>
          <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.navOpen : ""}`}>
            <div className={styles.menuHeader}>
              <button className={styles.closeBtn} onClick={toggleMenu} aria-label="Close menu">
                <span></span>
                <span></span>
              </button>
            </div>
            <div className={styles.menuContent}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${styles.link} ${activeSection === item.href.substring(1) ? styles.active : ""}`}
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className={styles.menuFooter}>
              <div className={styles.menuPhone}>
                <Icon src="/icons/phone.svg" size={24} color="#000" />
                <span>+38(099) 999-99-99</span>
              </div>
              <a href="#main" className={styles.menuOrderBtn} onClick={toggleMenu}>Замовити</a>
            </div>
          </nav>
          <div className={styles.right}>
            <div className={styles.phone}>
              <Icon src="/icons/phone.svg" size={24} color={isScrolled ? "#000" : "#fff"} />
              <span>+38(099) 999-99-99</span>
            </div>
            <a href="#main" className={styles.orderBtn}>Замовити</a>
            <button
              className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
