"use client";
import Button from "../components/Button";
import Image from "next/image"
import Link from "next/link";
import { useSearchParams } from 'next/navigation'
import { useState } from "react";
import styles from './page.module.css';
export default function Page() {

    const searchParams = useSearchParams();
    const initialImg = "https://" + (searchParams.get('img') || "media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="); // need to make Image component update based on current link; could be button?
    const [img, setImg] = useState(searchParams.get('img'));
    const [make, setMake] = useState(searchParams.get('make'));
    const [model, setModel] = useState(searchParams.get('model'));
    const [price, setPrice] = useState(searchParams.get('price'));
    const [desc, setDesc] = useState(searchParams.get('desc'));
    const loggedInStatus = searchParams.get('loggedIn');

    const addCarHandler = () => {
        console.log("Added ", model, make, price, "https://" + img, "", desc);
        setImg("");
        setMake("");
        setModel("");
        setPrice("");
        setDesc("");
    }
    /** TO DO
     * Make components and stuff for the follow
     * CSS
     * fix appearance when resizing
     */
    return (
        <div className={styles.formContainer}>
            <Link href={{ pathname: "/", query: { loggedIn: loggedInStatus } }}>
                <div className={styles.linkIcon}></div>
            </Link>
            <div className={styles.imageContainer}>
                <Image
                    height={200}
                    width={250}
                    src={initialImg || "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="}
                    alt={"no image"}
                    className={styles.image}
                    priority
                />
                <div className={styles.inputFieldContainer}>
                    <span>https://</span>
                    <input
                        className={styles.inputField}
                        placeholder="Image link"
                        value={img || ""}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.formFieldsContainer}>
                <div className={styles.inputFieldContainer}>
                    <input
                        className={styles.inputField}
                        placeholder="Model"
                        value={model || ""}
                        onChange={(e) => setModel(e.target.value)}
                    />
                </div>
                <div className={styles.inputFieldContainer}>
                    <input
                        className={styles.inputField}
                        placeholder="Make"
                        value={make || ""}
                        onChange={(e) => setMake(e.target.value)}
                    />
                </div>
                <div className={styles.inputFieldContainer}>
                    <input
                        className={styles.inputField}
                        placeholder="Price"
                        value={price || ""}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </div>
            <div className={styles.textareaContainer}>
                <textarea
                    rows={8}
                    className={styles.textareaField}
                    placeholder="Description"
                    value={desc || ""}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            <div className={styles.buttonContainer}>
                <Button
                    onClick={addCarHandler}
                    onSubmit={(e) => e.preventDefault()}
                    //className={styles.button}
                >
                    Submit
                </Button>
            </div>
            {/* Close button to go back */}
            <button className={styles.closeButton} onClick={() => window.history.back()}>Back</button>
        </div>
    );
}