"use client";
import { useState } from "react";
import styles from './Filter.module.css';

interface FilterProps {
  onMakeFilterChange: (make: string | null) => void;
  onModelFilterChange: (model: string | null) => void;
  onYearFilterChange: (year: string | null) => void;
  onPriceFilterChange: (priceRange: string | null) => void;
  onResetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({ onMakeFilterChange, onModelFilterChange, onYearFilterChange, onPriceFilterChange, onResetFilters }) => {
  const [isMakeDropdownOpen, setIsMakeDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  const carMakes = ["All Makes", "Tesla", "BMW", "Toyota", "Audi", "Lexus", "Jaguar", "Ferrari", "Honda"];
  const carModels = ["All Models", "Cybertruck", "SF90 Stradale", "Model 3", "Camry"];
  const carYears = ["All Years", "2024", "2023", "2022", "2021", "2020", "2019", "2018"];
  const carPrices = ["All Prices", "Under $30,000", "$30,000 - $50,000", "$50,000 - $70,000", "Above $70,000"];

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
      <button className={styles.filterButton} onClick={toggleMakeDropdown}>Make</button>
      {isMakeDropdownOpen && (
        <div className={styles.dropdownContainer}>
          {carMakes.map((make, index) => (
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
        Reset&nbsp;
        <i className={`fas fa-undo ${styles.resetIcon}`}></i>
      </button>
    </div>
  );
};

export default Filter;
