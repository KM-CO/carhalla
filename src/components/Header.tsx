"use client";
import { useState } from 'react';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import Title from './Title';
import CloseButton from './CloseButton';
import Hamburger from './Hamburger';

const Header = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession()
  const loggedInUser = session?.user;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search query:", searchQuery);
  };

  const toggleMenu = () => {
    setOpen(!open);
  }

  return (
    <header className={styles.header}>
      {/* Logo Section */}
      <div className={styles.leftSection}>
        <Title />
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

      <div id="hamburger" className={styles.hamburger} onClick={toggleMenu}><Hamburger /></div>

      <nav className={styles.nav}>
        <div id="buttons" className={`${styles.buttons}`} style={{display: (open ? "" : "none")}}>
          {status === "authenticated" ? (
            <>
              <span className={styles.greeting}>Hello, {loggedInUser?.name}</span>
              <Logout />
            </>
          ) : (
            <>
              <Login />
              <Signup />
            </>
          )}
        </div>
      </nav>
    </header >
  );
};
export default Header;