"use client";
import { useState } from "react";
import Cars, { Car } from "./Cars";
import Filter from "./Filter";
import Header from "./Header";
import styles from "./HomeBody.module.css";

export default function HomeBody() {
    const [selectedMake, setSelectedMake] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<Car[]>([]);

    const resetFilters = () => {
        setSelectedMake(null);
        setSelectedModel(null);
        setSelectedYear(null);
        setSelectedPrice(null);
        setSearchResults([]); // Reset search results
    };

    // Handles the search results
    const handleSearchResults = (results: Car[]) => {
        setSearchResults(results);
    };

    return (
        <>
            {/* Include Header here with search functionality */}
            <Header onSearchResults={handleSearchResults} />
            {/* Include Filter and Cars Components */}

            <div className={`${styles.container} gradient`}>
                <div className={styles.filter}>
                    <Filter
                        onMakeFilterChange={setSelectedMake}
                        onModelFilterChange={setSelectedModel}
                        onYearFilterChange={setSelectedYear}
                        onPriceFilterChange={setSelectedPrice}
                        onResetFilters={resetFilters}
                    />
                </div>
                <div className={styles.cars}>
                    <Cars
                        carsFromSearch={searchResults}
                        selectedMake={selectedMake}
                        selectedModel={selectedModel}
                        selectedYear={selectedYear}
                        selectedPrice={selectedPrice}
                    />
                </div>
            </div>
        </>
    );
}
