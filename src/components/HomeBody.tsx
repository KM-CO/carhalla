"use client";
import { useState } from "react";
import Cars from "./Cars";
import Filter from "./Filter";
import styles from "./HomeBody.module.css"

export default function HomeBody() {

    const [selectedMake, setSelectedMake] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

    const resetFilters = () => {
        setSelectedMake(null);
        setSelectedModel(null);
        setSelectedYear(null);
        setSelectedPrice(null);
    };

    return (
        <div className={`${styles.container} gradient`}>
            <Filter
                onMakeFilterChange={setSelectedMake}
                onModelFilterChange={setSelectedModel}
                onYearFilterChange={setSelectedYear}
                onPriceFilterChange={setSelectedPrice}
                onResetFilters={resetFilters}
            />
            <Cars
                selectedMake={selectedMake}
                selectedModel={selectedModel}
                selectedYear={selectedYear}
                selectedPrice={selectedPrice}
            />
        </div>
    );
}
