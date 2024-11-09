"use client";
import { useState } from "react";
import styles from './Filter.module.css';

export default function Filter() {
    const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
    const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

    // Sample car models, years, and price ranges
    const carModels = ["Tesla", "BMW", "Mercedes", "Audi", "Lexus", "Jaguar"];
    const carYears = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
    const carPrices = ["Under $30,000", "$30,000 - $50,000", "$50,000 - $70,000", "Above $70,000"];

    // Toggle dropdown visibility
    const toggleModelDropdown = () => {
        setIsModelDropdownOpen((prev) => !prev);
        setIsYearDropdownOpen(false); // Close other dropdowns
        setIsPriceDropdownOpen(false);
    };

    const toggleYearDropdown = () => {
        setIsYearDropdownOpen((prev) => !prev);
        setIsModelDropdownOpen(false); // Close other dropdowns
        setIsPriceDropdownOpen(false);
    };

    const togglePriceDropdown = () => {
        setIsPriceDropdownOpen((prev) => !prev);
        setIsModelDropdownOpen(false); // Close other dropdowns
        setIsYearDropdownOpen(false);
    };

    return (
        <div className={styles.filterContainer}>
            {/* Model Button */}
            <button className={styles.filterButton} onClick={toggleModelDropdown}>Model</button>

            {/* Model Dropdown */}
            {isModelDropdownOpen && (
                <div className={styles.dropdownContainer}>
                    {carModels.map((model, index) => (
                        <div key={index}className={styles.dropdownItem}
                            onClick={() => {
                                console.log(`Selected model: ${model}`);
                                setIsModelDropdownOpen(false); // Close dropdown after selection
                            }}>{model}</div>))}</div>)}

            {/* Year Button */}
            <button className={styles.filterButton} onClick={toggleYearDropdown}>Year</button>

            {/* Year Dropdown */}
            {isYearDropdownOpen && (
                <div className={styles.dropdownContainer}>
                    {carYears.map((year, index) => (
                        <div key={index}className={styles.dropdownItem}
                            onClick={() => {
                                console.log(`Selected year: ${year}`);
                                setIsYearDropdownOpen(false); // Close dropdown after selection
                            }}>{year}</div>))}</div>)}

            {/* Price Button */}
            <button className={styles.filterButton} onClick={togglePriceDropdown}>Price</button>

            {/* Price Dropdown */}
            {isPriceDropdownOpen && (
                <div className={styles.dropdownContainer}>
                    {carPrices.map((price, index) => (
                        <div key={index}className={styles.dropdownItem}
                            onClick={() => {
                                console.log(`Selected price range: ${price}`);
                                setIsPriceDropdownOpen(false); // Close dropdown after selection
                            }}>{price}</div>))}</div>)}
        </div>
    );
}