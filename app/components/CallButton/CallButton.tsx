'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import styles from './CallButton.module.scss';

export default function CallButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText('+380999999999');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  const iconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isModalOpen) return;

    if (modalContentRef.current) {
      gsap.fromTo(
        modalContentRef.current,
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
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (!iconRef.current) return;

    const icon = iconRef.current;
    gsap.set(icon, { rotation: 0, transformOrigin: 'center center' });
    
    const animate = () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      tl.to(icon, {
        rotation: 15,
        duration: 0.15,
        ease: 'power2.inOut',
      })
        .to(icon, {
          rotation: -15,
          duration: 0.15,
          ease: 'power2.inOut',
        })
        .to(icon, {
          rotation: 10,
          duration: 0.1,
          ease: 'power2.inOut',
        })
        .to(icon, {
          rotation: -10,
          duration: 0.1,
          ease: 'power2.inOut',
        })
        .to(icon, {
          rotation: 0,
          duration: 0.15,
          ease: 'power2.inOut',
        });
    };

    const timer = setTimeout(animate, 100);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf(icon);
    };
  }, []);

  return (
    <>
      <button className={styles.callButton} onClick={() => setIsModalOpen(true)}>
        <div ref={iconRef} className={styles.iconWrapper}>
          <Icon src="/icons/phone.svg" size={40} color="#fff" />
        </div>
      </button>

      {isModalOpen && (
        <div ref={modalRef} className={styles.modal} onClick={() => setIsModalOpen(false)}>
          <div ref={modalContentRef} className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Зв'яжіться з нами</h2>
              <p className={styles.modalText}>
                Залиште свій номер телефону, і ми зв'яжемося з вами найближчим часом
              </p>
            </div>
            <div className={styles.phoneInfo} onClick={handleCopyPhone}>
              <Icon src="/icons/phone.svg" size={24} color="#F76F0B" />
              <span className={styles.phoneLink}>{copied ? 'Скопійовано!' : '+38(099) 999-99-99'}</span>
            </div>
            <div className={styles.form}>
              <Input
                type="tel"
                label="Ваш номер телефону"
                placeholder="+38 (0XX) XXX-XX-XX"
                iconComponent={<Icon src="/icons/phone.svg" size={24} color="#000" />}
                value={phone}
                onChange={setPhone}
              />
              <button 
                className={styles.submitBtn} 
                onClick={() => {
                  const cleanedPhone = phone.replace(/\D/g, '');
                  let phoneNumber = cleanedPhone;
                  if (cleanedPhone.startsWith('38')) {
                    phoneNumber = cleanedPhone;
                  } else {
                    phoneNumber = '38' + cleanedPhone;
                  }
                  
                  if (phoneNumber.length === 12) {
                    const phoneData = {
                      phone: phoneNumber,
                      formatted: phone,
                      timestamp: new Date().toISOString(),
                    };
                    console.log('Phone submitted:', phoneData);

                    setIsModalOpen(false);
                    setPhone('');
                  } else {
                    alert('Будь ласка, введіть правильний номер телефону');
                  }
                }}
                disabled={!phone || phone.replace(/\D/g, '').length < 10}
              >
                Відправити
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
