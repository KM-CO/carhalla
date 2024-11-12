"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { Car } from "../../components/Cars";
import { useEffect, useState } from "react";

const DEFAULT_CAR: Car = {
    _id: "",
    car_model: "",
    make: "",
    price: 0,
    img: "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
    desc: "",
}

export default function Page() {

    const [car, setCar] = useState<Car | null>(null);
    const params = useParams();
    const id = params?.id as string;

    useEffect(() => {
        const getCar = async () => {
            try {
                const response = await fetch(`/api/cars/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not okay');
                }
                const data = await response.json();
                setCar(data.car);
            } catch (error) {
                console.log(`Error getting car ${id}:`, error);
            }
        }
        if (id) {
            getCar();
        }
    }, [id]);

    /** TO DO
     * Make components and stuff for the follow
     * CSS
     * fix appearance when resizing
     */
    return (
        <div className="grid grid-rows-[min-content] h-full">
            <div className="grid grid-cols-2 grid-rows-2">
                <Link href="/" className="absolute right-5 my-4"><div className="right-5 absolute h-[30px] w-[30px] after:content-[''] after:right-[14px] before:right-[14px] after:h-[30px] after:border-[1px] after:border-black after:bg-black before:bg-black after:rotate-45 after:absolute before:content-[''] before:h-[30px] before:border-[1px] before:border-black before:-rotate-45 before:absolute"></div></Link>
                <div className="flex flex-col items-center justify-evenly">
                    <Image height={200} width={250} src={(car || DEFAULT_CAR).img} alt={"no image"} className="min-h-[200px] min-w-[250px] max-h-[200px] max-w-[250px] resize-none rounded-3xl border-gray-600 border-2" priority />
                    <div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <p className="w-[100%] p-1">{(car || DEFAULT_CAR).img}</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-evenly">
                    <div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <p className="w-[100%] p-1">{(car || DEFAULT_CAR).car_model}</p>
                    </div>
                    <div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <p className="w-[100%] p-1">{(car || DEFAULT_CAR).make}</p>
                    </div>
                    <div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <p className="w-[100%] p-1">{(car || DEFAULT_CAR).price}</p>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col justify-center">
                    <p className="mx-auto w-[90%] resize-none border-2 border-slate-400 p-2">{(car || DEFAULT_CAR).desc}</p>
                </div>
            </div>
        </div>
    );
}
