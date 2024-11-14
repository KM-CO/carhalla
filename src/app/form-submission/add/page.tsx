"use client";
import Button from "../../components/Button";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../form-submission.module.css"

export default function Page() {

    const router = useRouter();

    const initialImg = "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="; // need to make Image component update based on current link; could be button?
    const [img, setImg] = useState("");
    const [make, setMake] = useState("");
    const [car_model, setCarModel] = useState("");
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState("");

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/cars`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ car_model, make, price, img: (img === "" ? initialImg : img), desc }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            setImg(initialImg);
            setMake("");
            setCarModel("");
            setPrice(0);
            setDesc("");

            router.push('/');
        } catch (error) {
            console.error('Error in creating item', error)
        }
    };

    /** TO DO
     * Make components and stuff for the follow
     * CSS
     * fix appearance when resizing
     */
    return (
        <form className={styles.formContainer} name="car-add" onSubmit={onSubmit}>
            <Link href="/" className={styles.closeButton}><div className={styles['link-icon']}></div></Link>
            <div className={styles.imageContainer}>
                <Image height={200} width={250} src={img === "" ? initialImg : img} alt={car_model + " " + make} className={styles.image} priority />
                <div className={styles.inputFieldContainer}>
                    <input className={styles.inputField} placeholder="Image link" value={img || ""} onChange={(e) => setImg(e.target.value)} />
                </div>
            </div>
            <div className={styles.formFieldsContainer}>
                <div className={styles.inputFieldContainer}>
                    <input className={styles.inputField} placeholder="Model" value={car_model || ""} onChange={(e) => setCarModel(e.target.value)} />
                </div><div className={styles.inputFieldContainer}>
                    <input className={styles.inputField} placeholder="Make" value={make || ""} onChange={(e) => setMake(e.target.value)} />
                </div><div className={styles.inputFieldContainer}>
                    <input className={styles.inputField} placeholder="Price" value={price || ""} onChange={(e) => setPrice(parseInt(e.target.value))} />
                </div>
                <div className={styles.textareaContainer}>
                    <textarea rows={8} className={styles.textareaField} value={desc || ""} onChange={(e) => setDesc(e.target.value)} />
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button>Submit</Button>
            </div>
        </form>
    );
}
