"use client";
import { useState, useEffect } from "react";
import Card from "./Card"; // Ensure the file `Card.tsx` exists in the same directory
import Link from "next/link";
import Button from "./Button"; // Ensure the file `Button.tsx` exists in the same directory

export type Car = {
  _id: string;
  car_model: string;
  make: string;
  price: number;
  img: string | "";
  desc: string | "";
  year: string;
};

interface CarsProps {
  selectedModel: string | null;
  selectedYear: string | null;
  selectedPrice: string | null;
}

export default function Cars({ selectedModel, selectedYear, selectedPrice }: CarsProps) {
  const [cars, setCars] = useState<Car[]>([]);

  // Function to fetch cars with optional filters
  const fetchCars = async () => {
    const params = new URLSearchParams();
    if (selectedModel) params.append("model", selectedModel);
    if (selectedYear) params.append("year", selectedYear);
    if (selectedPrice) params.append("priceRange", selectedPrice);

    try {
      const response = await fetch(`/api/cars?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      setCars(data.cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  // Fetch cars initially and whenever filters change
  useEffect(() => {
    fetchCars();
  }, [selectedModel, selectedYear, selectedPrice]);

  return (
    <div className="m-3 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3">
      {cars.map((car: Car) => (
        <Card
          key={car._id}
          id={car._id}
          model={car.car_model}
          make={car.make}
          price={car.price}
          desc={car.desc}
          img={car.img}
          alt={`${car.car_model} ${car.make}`}
        />
      ))}
      <Link href="form-submission/add">
        <Button>Add</Button>
      </Link>
    </div>
  );
}
