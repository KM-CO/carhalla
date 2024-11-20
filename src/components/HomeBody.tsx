"use client";
import { useState } from "react";
import Cars from "../components/Cars";
import Filter from "../components/Filter";

export default function HomeBody() {

    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

    const resetFilters = () => {
        setSelectedModel(null);
        setSelectedYear(null);
        setSelectedPrice(null);
    };
    return (
        <>
            <Filter
                onModelFilterChange={setSelectedModel}
                onYearFilterChange={setSelectedYear}
                onPriceFilterChange={setSelectedPrice}
                onResetFilters={resetFilters}
            />
            <Cars
                selectedModel={selectedModel}
                selectedYear={selectedYear}
                selectedPrice={selectedPrice}
            />
        </>
    );
}