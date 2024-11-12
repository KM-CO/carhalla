"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import Button from "./Button";

export type Car = {
    _id: string;
    car_model: string;
    make: string;
    price: number;
    img: string | "";
    desc: string | "";
}

export default function Cars() {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        const getCars = async () => {
            try {
                const response = await fetch('/api/cars');
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data = await response.json();
                setCars(data.cars);
            } catch (error) {
                console.log(`Error getting cars:`, error);
            }
        }
        getCars();
    }, []);
    return (
        <div className="m-3 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3" >
            {cars.map((car: Car) => (
                <Card key={car._id} id={car._id} model={car.car_model} make={car.make} price={car.price} desc={car.desc} img={car.img} alt={car.car_model + " " + car.make} />
            ))}
            <Link href="form-submission/add"><Button>Add</Button></Link>
        </div >
    );
}