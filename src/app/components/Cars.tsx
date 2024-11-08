import Card from "./Card";
import fetch from 'node-fetch';

type Car = {
    _id: string;
    car_model: string;
    make: string;
    price: number;
    image: string | "";
    desc: string | "";
}

type Cars = {
    cars: Car[];
}

export default async function Cars() {
    const response = await fetch('http://localhost:3000/api/cars',
        {
            method: 'GET',
        });

    if (!response.ok) {
        throw new Error('Failed to fetch cars');
    }

    const { cars } = await response.json() as Cars;

    return (
        <div className="m-3 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3" >
            {cars.map((car: Car) => (
                <Card key={car._id} model={car.car_model} make={car.make} price={car.price} desc={car.desc} img={car.image} alt={car.car_model + " " + car.make} />
            ))}
        </div >
    );
}