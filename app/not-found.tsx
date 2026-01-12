import styles from "./not-found.module.scss";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Сторінку не знайдено</p>
      <Link href="/" className={styles.link}>
        Повернутися на головну
      </Link>
    </div>
  );
}

