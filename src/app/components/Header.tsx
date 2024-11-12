// src/app/Header.tsx
"use client";
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';
import { Dispatch, SetStateAction, useContext } from 'react';
import { LoggedStatus } from './Contexts';
import Button from './Button';

interface HeaderProps {
  loggedInHandler: (loggedIn: boolean) => void;
}


const Header = ({ loggedInHandler }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const title = "Carhalla";
  const loggedInStatus = useContext(LoggedStatus);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search query:", searchQuery);
  };

  return (
    <header className={styles.header}>
      {/* Left Section: Logo and Search Bar */}
      <div className={styles.leftSection}>
        <h1 className={styles.title}>
          {title.split('').map((letter, index) => (
            <span key={index} className={styles.letter}>
              {letter}
            </span>
          ))}
        </h1>

        <div className={styles.searchContainer}>
          <input
            type="text"
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search cars..."
          />
          <button className={styles.searchButton} onClick={handleSearchSubmit}>
            Search
          </button>
        </div>
      </div>

      {/* Right Section: Navigation Links */}
      <nav className={styles.nav}>
        {/* TEMPORARY for the project; will create authentication later*/}
        {loggedInStatus ? 
        <Link href="/">
          <Button onClick={() => loggedInHandler(false)} className={`${styles.button} ${styles.loginButton}`}>
            Logout</Button>
            </Link>
          : (/*<><Link href="/login">
          <button className={`${styles.button} ${styles.loginButton}`}>
            Login
          </button>
        </Link>)*/
        <Link href="/">
          <Button onClick={() => loggedInHandler(true)} className={`${styles.button} ${styles.loginButton}`}>
            Login
            </Button>
            </Link>)}

        <Link href="/signup">
          <button className={`${styles.button} ${styles.signupButton}`}>
            Sign Up
          </button>
        </Link>
      </nav>
    </header >
  );
};

export default Header;
