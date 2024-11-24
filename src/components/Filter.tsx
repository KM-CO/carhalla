"use client";
import { useState, useEffect } from "react";
import styles from "./Filter.module.css";

interface FilterProps {
  onMakeFilterChange: (make: string | null) => void;
  onModelFilterChange: (model: string | null) => void;
  onYearFilterChange: (year: string | null) => void;
  onPriceFilterChange: (priceRange: string | null) => void;
  onResetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
  onMakeFilterChange,
  onModelFilterChange,
  onYearFilterChange,
  onPriceFilterChange,
  onResetFilters,
}) => {
  const [makes, setMakes] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [isMakeDropdownOpen, setIsMakeDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  const [selectedMake, setSelectedMake] = useState<string>("Make");
  const [selectedModel, setSelectedModel] = useState<string>("Model");
  const [selectedYear, setSelectedYear] = useState<string>("Year");
  const [selectedPrice, setSelectedPrice] = useState<string>("Price");

  const carPrices = [
    "All Prices",
    "Under $30,000",
    "$30,000 - $50,000",
    "$50,000 - $70,000",
    "Above $70,000",
  ];

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

  const resetFilters = () => {
    setSelectedMake("Make");
    setSelectedModel("Model");
    setSelectedYear("Year");
    setSelectedPrice("Price");
    onResetFilters();
  };

  const adjustFontSize = (text: string) => {
    const maxChars = 15; // Adjust based on button width
    return text.length > maxChars ? "0.85rem" : "1.1rem";
  };

  return (
    <div className={styles.filterContainer}>
{/* Make Dropdown */}
<div className={styles.buttonDropdownContainer}>
  <button
    className={`${styles.filterButton} ${isMakeDropdownOpen ? styles.open : ""}`}
    style={{ fontSize: adjustFontSize(selectedMake) }}
    onClick={() => setIsMakeDropdownOpen((prev) => !prev)}
  >
    <span className={styles.filterButtonEllipsis}>{selectedMake}</span>
    <span className={styles.arrow}>{isMakeDropdownOpen ? "▲" : "▼"}</span>
  </button>
  {isMakeDropdownOpen && (
    <div className={styles.dropdownContainer}>
      {["All Makes", ...makes].map((make, index) => (
        <div
          key={index}
          className={styles.dropdownItem}
          onClick={() => {
            setSelectedMake(make === "All Makes" ? "Make" : make);
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
  <button
    className={`${styles.filterButton} ${isModelDropdownOpen ? styles.open : ""}`}
    style={{ fontSize: adjustFontSize(selectedModel) }}
    onClick={() => setIsModelDropdownOpen((prev) => !prev)}
  >
    <span className={styles.filterButtonEllipsis}>{selectedModel}</span>
    <span className={styles.arrow}>{isModelDropdownOpen ? "▲" : "▼"}</span>
  </button>
  {isModelDropdownOpen && (
    <div className={styles.dropdownContainer}>
      {["All Models", ...models].map((model, index) => (
        <div
          key={index}
          className={styles.dropdownItem}
          onClick={() => {
            setSelectedModel(model === "All Models" ? "Model" : model);
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
        <button
          className={`${styles.filterButton} ${isYearDropdownOpen ? styles.open : ""}`}
          onClick={() => setIsYearDropdownOpen((prev) => !prev)}
        >
          {selectedYear} <span className={styles.arrow}>{isYearDropdownOpen ? "▲" : "▼"}</span>
        </button>
        {isYearDropdownOpen && (
          <div className={styles.dropdownContainer}>
            {["All Years", ...years].map((year, index) => (
              <div
                key={index}
                className={styles.dropdownItem}
                onClick={() => {
                  setSelectedYear(year === "All Years" ? "Year" : year);
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
  <button
    className={`${styles.filterButton} ${isPriceDropdownOpen ? styles.open : ""}`}
    onClick={() => setIsPriceDropdownOpen((prev) => !prev)}
  >
    {selectedPrice} <span className={styles.arrow}>{isPriceDropdownOpen ? "▲" : "▼"}</span>
  </button>
  {isPriceDropdownOpen && (
    <div className={styles.dropdownContainer}>
      {carPrices.map((price, index) => (
        <div
          key={index}
          className={styles.dropdownItem}
          onClick={() => {
            setSelectedPrice(price === "All Prices" ? "Price" : price);
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
      <button className={styles.resetButton} onClick={resetFilters}>
        Reset&nbsp;
        <svg className={`${styles.resetIcon}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M48.5 224L40 224c-13.3 0-24-10.7-24-24L16 72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2L98.6 96.6c87.6-86.5 228.7-86.2 315.8 1c87.5 87.5 87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3c-62.2-62.2-162.7-62.5-225.3-1L185 183c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8L48.5 224z"/></svg>
      </button>
    </div>
  );
};

export default Filter;
