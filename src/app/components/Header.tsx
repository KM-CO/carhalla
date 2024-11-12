// src/app/Header.tsx
"use client";
import Link from 'next/link';
import { useState } from 'react';
import styles from './Header.module.css';
import Button from './Button';


const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const title = "Carhalla";

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
      <nav className={styles.nav}>
        <Link href="/login">
          <Button onClick={() => null}> {/* Make this a login/logout button component using Button component*/}
            Login
          </Button>
        </Link>

        <Link href="/signup">
          <button className={`${styles.button} ${styles.signupButton}`}> {/* Make this a signup button component using Button component */}
            Sign Up
          </button>
        </Link>
      </nav>
    </header >
  );
};

export default Header;
