"use client";

import { useState } from "react";
import styles from "./Input.module.scss";
import Icon from "../Icon/Icon";

interface InputProps {
  type: "date" | "guests";
  label: string;
  placeholder: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
}

export default function Input({ type, label, placeholder, icon, value, onChange }: InputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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

