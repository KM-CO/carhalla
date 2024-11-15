"use client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./Form.module.css";
import CloseButton from "@/app/components/CloseButton";
import noImage from "../images/no-image.svg"
import Submit from "./Submit";
import Delete from "./Delete";
import Cancel from "./Cancel";

export default function Form({ readOnly }: InputHTMLAttributes<HTMLInputElement>) {

    const params = useParams();
    const id = params?.id as string;

    const router = useRouter();

    const [img, setImg] = useState("");
    const [imgPreview, setImgPreview] = useState(noImage);
    const [make, setMake] = useState("");
    const [car_model, setCarModel] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");

    useEffect(() => {
        const getCar = async () => {
            try {
                const response = await fetch(`/api/cars/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not okay');
                }
                const data = await response.json();
                const carData = data.car;
                setCarModel(carData.car_model || "");
                setMake(carData.make || "");
                setPrice(carData.price || 0);
                setImg(carData.img || "");
                setDesc(carData.desc || "");
                setImgPreview(carData.img || "");
            } catch (error) {
                console.log(`Error getting car ${id}:`, error);
            }
        }
        if (id) {
            getCar();
        }
    }, [id]);

    const onDeleteClick = async () => {
        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not okay');
            }
            router.push('/');
        } catch (error) {
            console.log(`Error deleting car ${id}:`, error);
        }
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (id) {
            e.preventDefault();

            try {
                const response = await fetch(`/api/cars/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ car_model, make, price, img, desc }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                setImg("");
                setMake("");
                setCarModel("");
                setPrice(0);
                setDesc("");

                router.push('/');
            } catch (error) {
                console.error('Error in updating item', error)
            }
        } else {
            e.preventDefault();

            try {
                const response = await fetch(`/api/cars`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ car_model, make, price, img, desc }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                setImg("");
                setMake("");
                setCarModel("");
                setPrice(0);
                setDesc("");

                router.push('/');
            } catch (error) {
                console.error('Error in creating item', error);
            }
        }
    };

    function isValidURL(url: string) {
        try {
            const newUrl = new URL("https://" + url);
            return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    function validateURL(url: string) {
        if (isValidURL(url)) {
            setImg(url);
            setImgPreview(url);
        } else {
            setImg(url);
            setImgPreview(noImage);
        }
    }

    /** TO DO
     * Make components and stuff for the follow
     * CSS
     * fix appearance when resizing
     */
    return (
        <form className={styles.formContainer} onSubmit={onSubmit}>
            <Link href="/"><CloseButton /></Link>
            <div className={styles.imageContainer}>
                {/*FIGURE OUT URL VALIDATION*/}
                <Image unoptimized fill onError={() => setImgPreview(noImage)} src={imgPreview != noImage ? imgPreview : noImage} alt={car_model + " " + make} className={styles.image} priority />
            </div>
            <div className={styles.formFieldsContainer}>
                <div className={styles.inputFieldContainer}>
                    <input readOnly={readOnly} className={styles.inputField} placeholder="Image link" value={img || ""} onChange={(e) => validateURL(e.target.value)} />
                </div>
                <div className={styles.inputFieldContainer}>
                    <input readOnly={readOnly} className={styles.inputField} placeholder="Model" value={car_model || ""} onChange={(e) => setCarModel(e.target.value)} required />
                </div><div className={styles.inputFieldContainer}>
                    <input readOnly={readOnly} className={styles.inputField} placeholder="Make" value={make || ""} onChange={(e) => setMake(e.target.value)} required />
                </div><div className={styles.inputFieldContainer}>
                    <input readOnly={readOnly} className={styles.inputField} placeholder="Price" value={price || ""} onChange={(e) => setPrice(parseInt(e.target.value))} required />
                </div>
                <div className={styles.inputFieldContainer}>
                    <textarea readOnly={readOnly} rows={8} className={styles.inputField} value={desc || ""} onChange={(e) => setDesc(e.target.value)} />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Submit />
                {id ? <Delete onClick={onDeleteClick} /> : <Cancel />}
            </div>
        </form>
    );
}
