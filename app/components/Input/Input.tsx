"use client";

import { useState, ReactNode } from "react";
import styles from "./Input.module.scss";
import Icon from "../Icon/Icon";

interface InputProps {
  type: "date" | "guests" | "tel";
  label: string;
  placeholder: string;
  icon?: string;
  iconComponent?: ReactNode;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({ type, label, placeholder, icon, iconComponent, value, onChange }: InputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.startsWith('38')) {
      const without38 = cleaned.slice(2);
      if (without38.length === 0) return '+38';
      if (without38.length <= 3) return `+38 (${without38}`;
      if (without38.length <= 6) return `+38 (${without38.slice(0, 3)}) ${without38.slice(3)}`;
      if (without38.length <= 8) return `+38 (${without38.slice(0, 3)}) ${without38.slice(3, 6)}-${without38.slice(6)}`;
      return `+38 (${without38.slice(0, 3)}) ${without38.slice(3, 6)}-${without38.slice(6, 8)}-${without38.slice(8, 10)}`;
    }
    if (cleaned.length <= 3) return `+38 (${cleaned}`;
    if (cleaned.length <= 6) return `+38 (${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    if (cleaned.length <= 8) return `+38 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    return `+38 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 8)}-${cleaned.slice(8, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cleaned = input.replace(/\D/g, '');
    if (cleaned.length <= 12) {
      onChange(formatPhoneNumber(cleaned));
    }
  };

  if (type === "tel") {
    return (
      <div className={styles.inputWrapper}>
        <div className={styles.label}>{label}</div>
        <div className={styles.telInputWrapper}>
          {iconComponent ? (
            <div className={styles.telIcon}>{iconComponent}</div>
          ) : icon ? (
            <Icon src={icon} size={24} className={styles.telIcon} />
          ) : null}
          <input
            type="tel"
            value={value}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            className={styles.telInput}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.input} onClick={handleClick}>
        <div className={styles.inputContent}>
          <div className={styles.label}>{label}</div>
          <div className={styles.placeholder}>{placeholder}</div>
        </div>
        <Icon src={icon} size={28} />
      </div>
      {isOpen && type === "date" && (
        <div className={styles.dropdown}>
          <input
            type="date"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setIsOpen(false);
            }}
            className={styles.dateInput}
          />
        </div>
      )}
      {isOpen && type === "guests" && (
        <div className={styles.dropdown}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div
              key={num}
              className={styles.option}
              onClick={() => {
                onChange(num.toString());
                setIsOpen(false);
              }}
            >
              {num} {num === 1 ? "людина" : "людей"}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

