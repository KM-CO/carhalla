"use client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./Form.module.css";
import CloseButton from "@/components/CloseButton";
import noImage from "../images/no-image.svg"
import Submit from "./Submit";
import Delete from "./Delete";
import Cancel from "./Cancel";
import Button from "./Button";
import { useSession } from "next-auth/react";

export default function Form({ readOnly }: InputHTMLAttributes<HTMLInputElement>) {

    const params = useParams();
    const id = params?.id as string;

    const { data: session } = useSession();
    const [isOwner, setIsOwner] = useState(false);

    const router = useRouter();

    const [loading, setLoading] = useState(readOnly);

    const [img, setImg] = useState("");
    const [imgPreview, setImgPreview] = useState(noImage);
    const [make, setMake] = useState("");
    const [year, setYear] = useState("");
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
                setYear(carData.year || "");
                setPrice(carData.price || 0);
                setImg(carData.img || "");
                setDesc(carData.desc || "");
                setImgPreview(carData.img || noImage);
                setLoading(false);
                setIsOwner(session ? carData.owner === session?.user?.name : false);

            } catch (error) {
                console.log(`Error getting car ${id}:`, error);
            }
        }
        if (id) {
            getCar();
        }
    }, [id, session]);

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
        e.preventDefault();
        if (id) {
            try {
                const response = await fetch(`/api/cars/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ car_model, make, year, price, img, desc }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                setImg("");
                setMake("");
                setYear("");
                setCarModel("");
                setPrice(0);
                setDesc("");

                router.push('/');
            } catch (error) {
                console.error('Error in updating car', error)
            }
        } else {
            try {
                const response = await fetch(`/api/cars`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ car_model, make, year, price, img, desc, owner: session?.user?.name as string }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                setImg("");
                setMake("");
                setYear("");
                setCarModel("");
                setPrice(0);
                setDesc("");

                router.push('/');
            } catch (error) {
                console.error('Error in creating car', error);
            }
        }
    };

    function isValidURL(url: string) {
        try {
            const newUrl = new URL(url);
            return newUrl.protocol === 'http:' || newUrl.protocol === 'https:';
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    function validateURL(url: string) {
        let newUrl = url;
        if (!url.startsWith("http")) { newUrl = "https://" + url; }
        if (isValidURL(newUrl)) {
            setImg(url);
            setImgPreview(newUrl);
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
        <div className={`gradient`}>
            <form className={styles.formContainer} onSubmit={onSubmit}>
                <Link href="/"><CloseButton /></Link>
                <div className={styles.imageContainer}>
                    {/*FIGURE OUT URL VALIDATION*/}
                    <Image unoptimized fill onError={() => setImgPreview(noImage)} src={imgPreview != noImage ? imgPreview : noImage} alt={car_model + " " + make} className={`${styles.image}`} priority />
                </div>
                <div className={styles.formFieldsContainer}>
                    <div className={styles.inputFieldContainer}>
                        <input disabled={loading} readOnly={readOnly && !isOwner} className={styles.inputField} placeholder={loading ? "Loading..." : "Image link"} value={img || ""} onChange={(e) => validateURL(e.target.value)} />
                    </div>
                    <div className={`${styles.grouped}`}>
                        <div className={`${styles.inputFieldContainer} ${styles.flexGrow}`}>
                            <input disabled={loading} readOnly={readOnly && !isOwner} className={`${styles.inputField}`} placeholder={loading ? "Loading..." : "Model"} value={car_model || ""} onChange={(e) => setCarModel(e.target.value)} required />
                        </div>
                        <div className={`${styles.inputFieldContainer} ${styles.flexGrow}`}>
                            <input disabled={loading} readOnly={readOnly && !isOwner} className={`${styles.inputField}`} placeholder={loading ? "Loading..." : "Make"} value={make || ""} onChange={(e) => setMake(e.target.value)} required />
                        </div>
                        <div className={`${styles.inputFieldContainer} ${styles.flexShrink}`}>
                            <input disabled={loading} readOnly={readOnly && !isOwner} className={`${styles.inputField}`} placeholder={loading ? "Loading..." : "Year"} value={year || ""} onChange={(e) => setYear(e.target.value)} required />
                        </div>
                        <div className={`${styles.inputFieldContainer} ${styles.flexShrink}`}>
                            <input disabled={loading} readOnly={readOnly && !isOwner} className={`${styles.inputField}`} placeholder={loading ? "Loading..." : "Price"} value={price || ""} onChange={(e) => setPrice(parseInt(e.target.value))} required />
                        </div>
                    </div>
                    <div className={styles.inputFieldContainer}>
                        <textarea disabled={loading} readOnly={readOnly && !isOwner} rows={8} className={`${styles.inputField} ${styles.textareaField}`} value={desc || ""} onChange={(e) => setDesc(e.target.value)} placeholder={loading ? "Loading..." : "Description"} />
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    {loading ? <Button className={styles.loading} /> :
                        <>
                            {!readOnly || isOwner ?
                                <>
                                    <Submit />
                                    {id ?
                                        <Delete onClick={onDeleteClick} /> : <Cancel />
                                    }
                                </> :
                                <div>Contact/Buy button</div>
                            }
                        </>
                    }
                </div>
            </form>
        </div>
    );
}
