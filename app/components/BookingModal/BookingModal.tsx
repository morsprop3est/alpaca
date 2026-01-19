"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./BookingModal.module.scss";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(2000);

  useEffect(() => {
    if (!isOpen) return;

    if (!modalContentRef.current) return;

    const content = modalContentRef.current;
    content.scrollTop = 0;

    gsap.fromTo(
      content,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      }
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('roomster.com.ua') && !event.origin.includes('easyms')) return;
      
      if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'resize' && typeof event.data.height === 'number') {
          setIframeHeight(Math.max(event.data.height, 1000));
        } else if (typeof event.data.height === 'number' && event.data.height > 0) {
          setIframeHeight(Math.max(event.data.height, 1000));
        }
      } else if (typeof event.data === 'number' && event.data > 0) {
        setIframeHeight(Math.max(event.data, 1000));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('message', handleMessage);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('message', handleMessage);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    if (!modalContentRef.current) {
      onClose();
      return;
    }

    const content = modalContentRef.current;
    gsap.to(content, {
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div ref={modalContentRef} className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose}>×</button>
        <iframe
          ref={iframeRef}
          src="https://module.roomster.com.ua/ua/859ff2a5-ca61-417e-a37e-a712700fe50a"
          className={styles.iframe}
          style={{ height: `${iframeHeight}px` }}
        />
      </div>
    </div>
  );
}
