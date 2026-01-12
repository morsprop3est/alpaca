import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const animateFromLeft = (element: HTMLElement) => {
  gsap.set(element, {
    opacity: 0,
    x: -100,
  });

  ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    },
  });
};

export const animateFromRight = (element: HTMLElement) => {
  gsap.set(element, {
    opacity: 0,
    x: 100,
  });

  ScrollTrigger.create({
    trigger: element,
    start: "top 60%",
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    },
  });
};

export const animateFromTop = (element: HTMLElement) => {
  gsap.set(element, {
    opacity: 0,
    y: -50,
  });

  ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
      });
    },
  });
};

export const animateFromBottom = (element: HTMLElement, delay: number = 0) => {
  gsap.set(element, {
    opacity: 0,
    y: 50,
  });

  ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    onEnter: () => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
      });
    },
  });
};

