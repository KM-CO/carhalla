"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { Car } from "../../components/Cars";
import { useEffect, useState } from "react";
import styles from "./page.module.css"

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
        <div className={styles.formContainer}>
            <Link href="/"><div className={styles['link-icon']}></div></Link>
            <div className={styles.imageContainer}>
                <Image height={200} width={250} src={(car || DEFAULT_CAR).img} alt={(car || DEFAULT_CAR).car_model + " " + (car || DEFAULT_CAR).make} className={styles.image} priority />
            </div>
            <div className={styles.formFieldsContainer}>
                <div className={styles.inputFieldContainer}>
                    <p className={styles.inputField}>{(car || DEFAULT_CAR).car_model}</p>
                </div>
                <div className={styles.inputFieldContainer}>
                    <p className={styles.inputField}>{(car || DEFAULT_CAR).make}</p>
                </div>
                <div className={styles.inputFieldContainer}>
                    <p className={styles.inputField}>{(car || DEFAULT_CAR).price}</p>
                </div>
                <div className={styles.textareaContainer}>
                    <p className={styles.textareaField}>{(car || DEFAULT_CAR).desc}</p>
                </div>
            </div>
        </div>
    );
}
