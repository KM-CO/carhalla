// src/app/Header.tsx
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const title = "Carhalla";
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {title.split('').map((letter, index) => (
          <span key={index} className={styles.letter}>
            {letter}
          </span>
          ))}
      </h1>
      <nav className={styles.nav}>
        <Link href="/login">
          <button className={`${styles.button} ${styles.loginButton}`}>
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className={`${styles.button} ${styles.signupButton}`}>
            Sign Up
          </button>
        </Link>
      </nav>
    </header>
  );
};
export default Header;
