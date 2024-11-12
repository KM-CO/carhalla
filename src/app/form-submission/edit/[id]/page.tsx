"use client";
import Button from "../../../components/Button";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Car } from "../../../components/Cars";

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

    const initialImg = (car || DEFAULT_CAR).img; // need to make Image component update based on current link; could be button?
    const [img, setImg] = useState((car || DEFAULT_CAR).img);
    const [make, setMake] = useState((car || DEFAULT_CAR).make);
    const [model, setModel] = useState((car || DEFAULT_CAR).car_model);
    const [price, setPrice] = useState((car || DEFAULT_CAR).price);
    const [desc, setDesc] = useState((car || DEFAULT_CAR).desc);

    useEffect(() => {
        const getCar = async () => {
            try {
                const response = await fetch(`/api/cars/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not okay');
                }
                const data = await response.json();
                const carData = data.car;
                setCar({
                    _id: carData._id || "",
                    car_model: carData.car_model || "",
                    make: carData.make || "",
                    price: carData.price || 0,
                    img: carData.img || "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
                    desc: carData.desc || "",
                });
            } catch (error) {
                console.log(`Error getting car ${id}:`, error);
            }
        }
        if (id) {
            getCar();
        }
    }, [id]);

    const addCarHandler = () => {
        console.log("Added ", model, make, price, "https://" + img, "", desc);
        setImg("");
        setMake("");
        setModel("");
        setPrice(0);
        setDesc("");
    }
    /** TO DO
     * Make components and stuff for the follow
     * CSS
     * fix appearance when resizing
     */
    return (
        <form className="grid grid-rows-[min-content] h-full">
            <div className="grid grid-cols-2 grid-rows-2">
                <Link href="/" className="absolute right-5 my-4"><div className="right-5 absolute h-[30px] w-[30px] after:content-[''] after:right-[14px] before:right-[14px] after:h-[30px] after:border-[1px] after:border-black after:bg-black before:bg-black after:rotate-45 after:absolute before:content-[''] before:h-[30px] before:border-[1px] before:border-black before:-rotate-45 before:absolute"></div></Link>
                <div className="flex flex-col items-center justify-evenly">
                    <Image height={200} width={250} src={initialImg || "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="} alt={"no image"} className="min-h-[200px] min-w-[250px] max-h-[200px] max-w-[250px] resize-none rounded-3xl border-gray-600 border-2" priority />
                    <div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <span>https://</span>
                        <input className="w-[100%] p-1" placeholder="Image link" value={img || ""} onChange={(e) => setImg(e.target.value)}/>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-evenly">
                    <div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <input className="w-[100%] p-1" placeholder="Model" value={model || ""} onChange={(e) => setModel(e.target.value)} />
                    </div><div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <input className="w-[100%] p-1" placeholder="Make" value={make || ""} onChange={(e) => setMake(e.target.value)} />
                    </div><div className="flex w-[300px] p-2 bg-slate-600 justify-center">
                        <input className="w-[100%] p-1" placeholder="Price" value={price || ""} onChange={(e) => setPrice(parseInt(e.target.value))} />
                    </div>
                </div>
                <div className="col-span-2 flex flex-col justify-center">
                    <textarea rows={8} className="mx-auto w-[90%] resize-none border-2 border-slate-400 p-2" value={desc || ""} onChange={(e) => setDesc(e.target.value)} />
                    <Link href="/" className="m-auto"><Button onClick={addCarHandler} onSubmit={(e) => e.preventDefault()}>Submit</Button></Link>
                </div>
            </div>
        </form>
    );
}
