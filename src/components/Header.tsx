"use client";
import { useState } from 'react';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';


const Header = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const title = "Carhalla";
  const { data: session, status, update } = useSession()
  const loggedInUser = session?.user;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search query:", searchQuery);
  };

  return (
    <header className={styles.header}>
      {/* Logo Section */}
      <div className={styles.leftSection}>
        <h1 className={styles.title}>
          {title.split('').map((letter, index) => (
            <span key={index} className={styles.letter}>
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* Search Bar Section */}
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
      <nav className={styles.nav}>
        { status === "authenticated" ? <>Hello, {loggedInUser?.name} <Logout /></> :
          <><Login />
          <Signup /></>}
      </nav >
    </header >
  );
};

export default Header;
