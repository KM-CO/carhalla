"use client"
import { useState, useId } from "react";
import Cars from "./components/Cars";
import Filter from "./components/Filter";
import Header from "./components/Header"
import { LoggedStatus } from "./components/Contexts";
import { useSearchParams } from "next/navigation";

type Car = {
  _id: string;
  car_model: string;
  make: string;
  price: number;
  image: string | "";
  desc: string | "";
}

const DEFAULT_CARS: Car[] = [
    {
        _id: "1",
        car_model: "CRV",
        make: "Honda",
        price: 5000,
        desc: "This is cool car.",
        image: "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
    },
];

export default function Home() {
  const [cars, setCars] = useState(DEFAULT_CARS);
  const searchParams = useSearchParams();
  const image = searchParams.get('img') || "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=";
  const make = searchParams.get('make') || "";
  const car_model = searchParams.get('model') || "";
  const price = parseInt( searchParams.get('price') || "0" );
  const desc = searchParams.get('desc') || "";
  const _id = useId();
  const newCar = {_id, car_model, make, price, image, desc};

  const [loggedIn, setLoggedIn] = useState(searchParams.get('loggedIn') === 'true');
  return (
    <div className="grid grid-rows-[min-content] h-full">
      <LoggedStatus.Provider value={loggedIn}>
        <Header loggedInHandler={(b: boolean) => setLoggedIn(b)} />
      </LoggedStatus.Provider>
      <div className="grid grid-cols-[min-content_auto]">
        <Filter />
        <LoggedStatus.Provider value={loggedIn}>
          <Cars cars={searchParams.size <= 1 ? cars : [...cars, newCar]} />
        </LoggedStatus.Provider>
      </div>
    </div>
  );
}