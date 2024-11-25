"use client";
import { useState } from 'react';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';

interface HeaderProps {
  onSearchResults: (cars: any[]) => void; // Allow the header to pass search results
}

const Header: React.FC<HeaderProps> = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const title = "Carhalla";
  const { data: session, status } = useSession();
  const loggedInUser = session?.user;

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = async () => {
    if (searchQuery.trim() === '') {
      return; // Exit if there's no search query
    }

    try {
      // Fetch search results from API
      const response = await fetch(`/api/cars?make=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      // Parse the response to JSON
      const data = await response.json();

      // Ensure data has cars and pass them to the onSearchResults function
      if (data?.cars && Array.isArray(data.cars)) {
        onSearchResults(data.cars);
      } else {
        console.error("Invalid response structure:", data);
      }
    } catch (error) {
      console.error("Error searching cars:", error);
    }
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
          placeholder="Search for a car (e.g., Tesla, Ferrari, etc.)...
"
        />
        <button className={styles.searchButton} onClick={handleSearchSubmit}>
          Search
        </button>
      </div>

      <nav className={styles.nav}>
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
      </nav>
    </header>
  );
};

export default Header;
