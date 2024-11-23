"use client";
import { useState, useEffect } from "react";
import styles from './Filter.module.css';

interface FilterProps {
  onMakeFilterChange: (make: string | null) => void;
  onModelFilterChange: (model: string | null) => void;
  onYearFilterChange: (year: string | null) => void;
  onPriceFilterChange: (priceRange: string | null) => void;
  onResetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({ onMakeFilterChange, onModelFilterChange, onYearFilterChange, onPriceFilterChange, onResetFilters }) => {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);

  const [isMakeDropdownOpen, setIsMakeDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  const carPrices = ["All Prices", "Under $30,000", "$30,000 - $50,000", "$50,000 - $70,000", "Above $70,000"];

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch("/api/cars?filterOptions=true");
        if (!response.ok) throw new Error("Failed to fetch filter options");
        const data = await response.json();
        setMakes(data.makes || []);
        setModels(data.models || []);
        setYears(data.years || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };
    fetchFilterOptions();
  }, []);

  const toggleMakeDropdown = () => {
    setIsMakeDropdownOpen(prev => !prev);
    setIsModelDropdownOpen(false);
    setIsYearDropdownOpen(false);
    setIsPriceDropdownOpen(false);
  };

  const toggleModelDropdown = () => {
    setIsModelDropdownOpen(prev => !prev);
    setIsMakeDropdownOpen(false);
    setIsYearDropdownOpen(false);
    setIsPriceDropdownOpen(false);
  };

  const toggleYearDropdown = () => {
    setIsYearDropdownOpen(prev => !prev);
    setIsMakeDropdownOpen(false);
    setIsModelDropdownOpen(false);
    setIsPriceDropdownOpen(false);
  };

  const togglePriceDropdown = () => {
    setIsPriceDropdownOpen(prev => !prev);
    setIsMakeDropdownOpen(false);
    setIsModelDropdownOpen(false);
    setIsYearDropdownOpen(false);
  };

  return (
    <div className={styles.filterContainer}>
      {/* Make Dropdown */}
      <div className={styles.buttonDropdownContainer}>
        <button className={styles.filterButton} onClick={toggleMakeDropdown}>Make</button>
        {isMakeDropdownOpen && (
          <div className={styles.dropdownContainer}>
            {["All Makes", ...makes].map((make, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => {
                  onMakeFilterChange(make === "All Makes" ? null : make);
                  setIsMakeDropdownOpen(false);
                }}
              >
                {make}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Model Dropdown */}
      <div className={styles.buttonDropdownContainer}>
        <button className={styles.filterButton} onClick={toggleModelDropdown}>Model</button>
        {isModelDropdownOpen && (
          <div className={styles.dropdownContainer}>
            {["All Models", ...models].map((model, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => {
                  onModelFilterChange(model === "All Models" ? null : model);
                  setIsModelDropdownOpen(false);
                }}
              >
                {model}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Year Dropdown */}
      <div className={styles.buttonDropdownContainer}>
        <button className={styles.filterButton} onClick={toggleYearDropdown}>Year</button>
        {isYearDropdownOpen && (
          <div className={styles.dropdownContainer}>
            {["All Years", ...years].map((year, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => {
                  onYearFilterChange(year === "All Years" ? null : year);
                  setIsYearDropdownOpen(false);
                }}
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Dropdown */}
      <div className={styles.buttonDropdownContainer}>
        <button className={styles.filterButton} onClick={togglePriceDropdown}>Price</button>
        {isPriceDropdownOpen && (
          <div className={styles.dropdownContainer}>
            {carPrices.map((price, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => {
                  onPriceFilterChange(price === "All Prices" ? null : price);
                  setIsPriceDropdownOpen(false);
                }}
              >
                {price}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reset Filters */}
      <button className={styles.resetButton} onClick={onResetFilters}>
        Reset&nbsp;
        <i className={`fas fa-undo ${styles.resetIcon}`}></i>
      </button>
    </div>
  );
};

export default Filter;
