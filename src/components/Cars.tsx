"use client";
import { useState, useEffect, Suspense, lazy } from "react";
import { useSession } from "next-auth/react";
const Card = lazy(() => import("./Card"));
import Link from "next/link";
import noImage from "@/images/no-image.svg";
import LoadingDots from "./LoadingDots";

export type Car = {
  _id: string;
  car_model: string;
  make: string;
  price: number;
  img: string | "";
  desc: string | "";
  year: string;
  owner: string;
};

interface CarsProps {
  carsFromSearch: Car[]; // For the SearchBar
  selectedMake: string | null;
  selectedModel: string | null;
  selectedYear: string | null;
  selectedPrice: string | null;
}

export default function Cars({
  carsFromSearch,
  selectedMake,
  selectedModel,
  selectedYear,
  selectedPrice,
}: CarsProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const { status } = useSession();

  useEffect(() => {
    // If search results are available, use them instead of fetching new data
    if (carsFromSearch && carsFromSearch.length > 0) {
      setCars(carsFromSearch);
    } else {
      // Fetch cars based on filter criteria
      const fetchCars = async () => {
        const params = new URLSearchParams();
        if (selectedMake) params.append("make", selectedMake);
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
      fetchCars();
    }
  }, [carsFromSearch, selectedMake, selectedModel, selectedYear, selectedPrice]);

  return (
    <div className="m-2 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 grid-rows-[repeat(auto-fill,minmax(280px,280px))] items-center">
      {cars.map((car: Car) => (
        <Suspense key={car._id} fallback={<LoadingDots />}>
          <Card
            key={car._id}
            id={car._id}
            model={car.car_model}
            make={car.make}
            price={car.price}
            desc={car.desc}
            img={car?.img || noImage}
            alt={`${car.car_model} ${car.make}`}
            owner={car.owner}
          />
        </Suspense>
      ))}
      {status === "authenticated" ? (
        <div className="flex border-3 border-neutral-500 items-center hover:border-neutral-700 align-middle justify-center h-[280px] w-[300px] mx-auto">
          <Link href="car/" className="text-9xl text-neutral-500 hover:text-neutral-400">
            +
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
