"use client";
import { useState } from "react";
import Cars from "./components/Cars";
import Filter from "./components/Filter";
import Header from "./components/Header";

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const resetFilters = () => {
    setSelectedModel(null);
    setSelectedYear(null);
    setSelectedPrice(null);
  };

  return (
    <div className="grid grid-rows-[min-content] h-full">
      <Header />
      <div className="grid grid-cols-[min-content_auto]">
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
      </div>
    </div>
  );
}
