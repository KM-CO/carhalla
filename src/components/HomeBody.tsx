"use client";
import { useState } from "react";
import Cars from "./Cars";
import Filter from "./Filter";
import Header from "./Header";
import styles from "./HomeBody.module.css";

export default function HomeBody() {
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const resetFilters = () => {
    setSelectedMake(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setSelectedPrice(null);
    setSearchResults([]); // Reset search results
  };

  // Handles the search results
  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <div className={`${styles.container} gradient`}>
      {/* Include Header here with search functionality */}
      <Header onSearchResults={handleSearchResults} />

      {/* Include Filter and Cars Components */}
      <Filter
        onMakeFilterChange={setSelectedMake}
        onModelFilterChange={setSelectedModel}
        onYearFilterChange={setSelectedYear}
        onPriceFilterChange={setSelectedPrice}
        onResetFilters={resetFilters}
      />
      <Cars
        carsFromSearch={searchResults}
        selectedMake={selectedMake}
        selectedModel={selectedModel}
        selectedYear={selectedYear}
        selectedPrice={selectedPrice}
      />
    </div>
  );
}
