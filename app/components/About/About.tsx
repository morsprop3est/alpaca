"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./About.module.scss";
import containerStyles from "../../styles/container.module.scss";
import Image from "next/image";
import Background from "../Background/Background";
import { animateFromLeft, animateFromRight } from "../../utils/scrollAnimations";

const cards = [
  {
    id: 1,
    title: "Живі альпаки поруч",
    text: "Познайомтесь із нашими дружніми альпаками — справжні улюбленці гостей! Ви можете годувати їх, фотографуватися або просто спостерігати за їхнім спокійним життям.",
    image: "/images/1.webp",
  },
  {
    id: 2,
    title: "Чан на дровах",
    text: "Після активного дня або прогулянки лісом — розслабтесь у теплому чані під відкритим небом. Особлива атмосфера, запах деревини, свіже повітря і зоряне небо — те, що потрібно для повного відновлення.",
    image: "/images/2.webp",
  },
  {
    id: 3,
    title: "Лісова тиша та комфорт",
    text: "Кожен будиночок розташований у мальовничій локації серед дерев, має все необхідне для комфортного проживання: зручні ліжка, кухня, камін, тераса, зона для барбекю.",
    image: "/images/3.webp",
  },
  {
    id: 4,
    title: "Ідеально для пар, сімей або компаній",
    text: "Відпочинок підходить як для романтичного вікенду, так і для сімейного дозвілля чи відпочинку з друзями. А ще це чудове місце для фотосесій або ретритів.",
    image: "/images/4.webp",
  },
];

interface AboutProps {
  id?: string;
}

export default function About({ id }: AboutProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !descriptionRef.current || !cardsRef.current) return;

    animateFromLeft(titleRef.current);
    animateFromLeft(descriptionRef.current);

    const cards = cardsRef.current.children;
    Array.from(cards).forEach((card, index) => {
      const isEven = index % 2 === 0;
      if (isEven) {
        animateFromLeft(card as HTMLElement);
      } else {
        animateFromRight(card as HTMLElement);
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id={id} className={styles.about}>
      <Background />
      <div className={containerStyles.container}>
        <div className={styles.content}>
          <h2 ref={titleRef} className={styles.title}>Alpaca House — місце, де природа обіймає</h2>
          <p ref={descriptionRef} className={styles.description}>
            У Alpaca House ми створили простір для справжнього відпочинку: затишні будиночки серед лісу, живі альпаки поруч, теплий чан під зорями та спокій, який так важко знайти у місті. Це ідеальне місце для перезавантаження, романтичних вікендів чи душевних зустрічей з близькими. Відчуйте, як звучить тиша — разом з Alpaca House
          </p>
          <div ref={cardsRef} className={styles.cards}>
            {cards.map((card, index) => (
              <div
                key={card.id}
                className={`${styles.card} ${index === 0 ? styles.firstCard : ""} ${card.id % 2 === 0 ? styles.even : styles.odd}`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={440}
                    height={240}
                    className={styles.image}
                  />
                </div>
                <div className={styles.textContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

