// src/app/Header.tsx
import Link from 'next/link';
import styles from './Header.module.css';
import { Dispatch, SetStateAction, useContext } from 'react';
import { LoggedStatus } from './Contexts';
import Button from './Button';

interface HeaderProps {
  loggedInHandler: (
    loggedIn: boolean
  ) => void;
}

const Header = ({ loggedInHandler }: HeaderProps) => {
  const title = "Carhalla";
  const loggedInStatus = useContext(LoggedStatus);
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
        {/* TEMPORARY for the project; will create authentication later*/}
        {loggedInStatus ? <Link href="/"><Button onClick={() => loggedInHandler(false)}>Logout</Button></Link>
        : (/*<><Link href="/login">
          <button className={`${styles.button} ${styles.loginButton}`}>
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className={`${styles.button} ${styles.signupButton}`}>
            Sign Up
          </button>
        </Link></>)*/<Link href="/"><Button onClick={() => loggedInHandler(true)}>Login</Button></Link>)}
      </nav>
    </header>
  );
};
export default Header;
