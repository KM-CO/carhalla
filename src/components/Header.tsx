"use client";
import { useState } from 'react';
import styles from './Header.module.css';
import { useSession } from 'next-auth/react';
import Login from './Login';
import Signup from './Signup';
import Logout from './Logout';
import Title from './Title';
import { Car } from './Cars';

interface HeaderProps {
  onSearchResults: (cars: Car[]) => void; // Allow the header to pass search results
}

export default function Header({ onSearchResults }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { status } = useSession();

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
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
      <nav className={styles.nav}>
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
            placeholder="Search for a car (e.g., Tesla, Ferrari, etc.)..."
          />
          <button className={styles.searchButton} onClick={handleSearchSubmit}>
            Search
          </button>
        </div>
        <div id="buttons" className={`${styles.buttons}`}>
          {status === "authenticated" ? (
            <>
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
    </header>
  );
}
