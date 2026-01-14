'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Icon from '../Icon/Icon';
import styles from './SplashScreen.module.scss';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const splashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!splashRef.current || !logoRef.current) return;

    const logo = logoRef.current;
    const splash = splashRef.current;

    const tl = gsap.timeline();

    tl.fromTo(
      logo,
      {
        y: -50,
        scale: 1,
        rotationX: 90,
        opacity: 0,
      },
      {
        y: 0,
        scale: 1,
        rotationX: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      }
    )
      .to(logo, {
        y: 50,
        scale: 1,
        rotationX: -90,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      }, '+=0.5')
      .to(splash, {
        scaleY: 0,
        duration: 0.6,
        delay: 0.5,
        ease: 'power2.out',
        transformOrigin: 'bottom',
      }, '-=0.1')
      .call(() => {
        setIsVisible(false);
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div ref={splashRef} className={styles.splashScreen}>
      <div ref={logoRef} className={styles.logoContainer}>
        <Icon src="/icons/header_logo.svg" size={200} color="#F76F0B" className={styles.logo} />
      </div>
    </div>
  );
}
