// Filter.tsx
"use client";
import { useState } from "react";
import styles from './Filter.module.css';

interface FilterProps {
  onModelFilterChange: (model: string | null) => void;
  onYearFilterChange: (year: string | null) => void;
  onPriceFilterChange: (priceRange: string | null) => void;
  onResetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({ onModelFilterChange, onYearFilterChange, onPriceFilterChange, onResetFilters }) => {
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  const carModels = ["All Models", "Tesla", "BMW", "Mercedes", "Audi", "Lexus", "Jaguar", "Ferrari", "Honda"];
  const carYears = ["All Years", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];
  const carPrices = ["All Prices", "Under $30,000", "$30,000 - $50,000", "$50,000 - $70,000", "Above $70,000"];

  const toggleModelDropdown = () => {
    setIsModelDropdownOpen(prev => !prev);
    setIsYearDropdownOpen(false);
    setIsPriceDropdownOpen(false);
  };

  const toggleYearDropdown = () => {
    setIsYearDropdownOpen(prev => !prev);
    setIsModelDropdownOpen(false);
    setIsPriceDropdownOpen(false);
  };

  const togglePriceDropdown = () => {
    setIsPriceDropdownOpen(prev => !prev);
    setIsModelDropdownOpen(false);
    setIsYearDropdownOpen(false);
  };

  return (
    <div className={styles.filterContainer}>
      {/* Model Dropdown */}
      <button className={styles.filterButton} onClick={toggleModelDropdown}>Model</button>
      {isModelDropdownOpen && (
        <div className={styles.dropdownContainer}>
          {carModels.map((model, index) => (
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

      {/* Year Dropdown */}
      <button className={styles.filterButton} onClick={toggleYearDropdown}>Year</button>
      {isYearDropdownOpen && (
        <div className={styles.dropdownContainer}>
          {carYears.map((year, index) => (
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

      {/* Price Dropdown */}
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

      {/* Reset Filters */}
      <button className={styles.resetButton} onClick={onResetFilters}>
        <i className="fas fa-undo"></i>
        {/*Undo icon*/}
        </button>
      {/* Reset Filters w/ Font Awesome Icon*/}
      <button className={styles.resetButton} onClick={onResetFilters}>
      <i className="fas fa-undo"></i>
        {/* Undo icon */}
        </button>
    </div>
  );
};

export default Filter;