"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Rules.module.scss";
import containerStyles from "../../styles/container.module.scss";
import Icon from "../Icon/Icon";
import { animateFromLeft, animateFromRight, animateFromTop } from "../../utils/scrollAnimations";

const rules = [
  {
    id: 1,
    title: "Чистота та порядок",
    icon: "/icons/bin.svg",
    benefits: [
      "Будь ласка, підтримуйте чистоту в будиночку та на території.",
      "Сміття просимо виносити у спеціально відведені контейнери.",
      "Посуд залишайте чистим після користування.",
    ],
  },
  {
    id: 2,
    title: "Час заїзду та виїзду",
    icon: "/icons/clock.svg",
    benefits: [
      "Час заїзду: з 14:00",
      "Час виїзду: до 11:00",
      "Можливість раннього заїзду або пізнього виїзду - за попередньою домовленістю",
    ],
  },
  {
    id: 3,
    title: "Чан та зона барбекю",
    icon: "/icons/fire.svg",
    benefits: [
      "Користування чаном дозволено лише згідно з інструкцією — для вашої безпеки.",
      "Не залишайте відкритий вогонь без нагляду.",
      "Заборонено самостійно розпалювати чан без супроводу адміністрації.",
    ],
  },
  {
    id: 4,
    title: "Тварини на території",
    icon: "/icons/animals.svg",
    benefits: [
      "Альпаки — доброзичливі, але просимо не турбувати їх, не годувати без дозволу й не заходити у загін самостійно.",
      "Якщо ви приїжджаєте зі своїми тваринами — узгодьте це заздалегідь.",
    ],
  },
  {
    id: 5,
    title: "Куріння",
    icon: "/icons/no_smoking.svg",
    benefits: [
      "Куріння дозволено лише на вулиці в спеціально відведених місцях.",
      "У приміщенні курити заборонено",
    ],
  },
  {
    id: 6,
    title: "Тиша на території",
    icon: "/icons/silence.svg",
    benefits: [
      "Просимо дотримуватись режиму тиші з 22:00 до 08:00.",
      "Враховуйте, що поряд можуть відпочивати інші гості.",
    ],
  },
  {
    id: 7,
    title: "Оплата та застави",
    icon: "/icons/google_pay.svg",
    benefits: [
      "Повна або часткова оплата може вимагатись наперед (залежно від умов бронювання).",
      "У разі пошкодження майна стягується компенсація згідно з вартістю ремонту або заміни.",
    ],
  },
];

interface RulesProps {
  id?: string;
}

export default function Rules({ id }: RulesProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!titleRef.current || !cardsRef.current || !footerTextRef.current) return;

    animateFromTop(titleRef.current);

    const cards = cardsRef.current.children;
    Array.from(cards).forEach((card, index) => {
      const isEven = index % 2 === 0;
      if (isEven) {
        animateFromLeft(card as HTMLElement);
      } else {
        animateFromRight(card as HTMLElement);
      }
    });

    animateFromTop(footerTextRef.current);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id={id} className={styles.rules}>
      <div className={containerStyles.container}>
        <div className={styles.content}>
          <h2 ref={titleRef} className={styles.title}>Правила проживання в Alpaca House</h2>
          <div ref={cardsRef} className={styles.cards}>
            {rules.map((rule) => (
              <div key={rule.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <Icon src={rule.icon} height={24} color="#F76F0B" />
                  <h3 className={styles.cardTitle}>{rule.title}</h3>
                </div>
                <div className={styles.cardContent}>
                  <ul className={styles.benefitsList}>
                    {rule.benefits.map((benefit, index) => (
                      <li key={index} className={styles.benefit}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p ref={footerTextRef} className={styles.footerText}>
            Дякуємо за розуміння! Ваш комфорт і гарні враження — наш пріоритет 💚
          </p>
        </div>
      </div>
    </section>
  );
}

