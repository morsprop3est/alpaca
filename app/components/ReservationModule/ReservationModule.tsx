"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ReservationModule.module.scss";
import containerStyles from "../../styles/container.module.scss";

export default function ReservationModule() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(400);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('roomster.com.ua') && !event.origin.includes('easyms')) return;
      
      if (event.data && typeof event.data === 'object') {
        if (event.data.type === 'resize' && typeof event.data.height === 'number') {
          setIframeHeight(event.data.height);
        } else if (typeof event.data.height === 'number' && event.data.height > 0) {
          setIframeHeight(event.data.height);
        }
      } else if (typeof event.data === 'number' && event.data > 0) {
        setIframeHeight(event.data);
      }
    };

    window.addEventListener('message', handleMessage);

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', () => {
        setTimeout(() => {
          try {
            iframe.contentWindow?.postMessage({ type: 'getHeight' }, 'https://module.roomster.com.ua');
          } catch (e) {
          }
        }, 500);
      });
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <section id="reservation-module" className={styles.reservationModule}>
      <div className={containerStyles.container}>
        <div className={styles.content}>
          <iframe
            ref={iframeRef}
            src="https://module.roomster.com.ua/ua/859ff2a5-ca61-417e-a37e-a712700fe50a"
            className={styles.iframe}
            style={{ height: `${iframeHeight}px` }}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
