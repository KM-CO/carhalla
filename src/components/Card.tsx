"use client";
import Image from "next/image";
import styles from "./Card.module.css";
import CloseButton from "./CloseButton";
import ViewEdit from "./ViewEdit";
import noImage from "@/images/no-image.svg";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface CardProps {
  id: string;
  model: string;
  make: string;
  price: number;
  img: string;
  alt: string;
  desc: string;
  owner: string;
}

export default function Card({ id, model, make, price, img, alt, desc, owner }: CardProps) {
  const { data: session } = useSession();
  const isOwner = session ?  session.user?.name === owner : false; 

  const onDeleteClick = async () => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      document.getElementById(id)!.remove();
    } catch (error) {
      console.log(`Error deleting car ${id}:`, error);
    }
  };

  return (
    <Link href={(isOwner ? `car` : `view`) + `/${id}`} className={styles.card} id={id}>
      <div className={styles["card-price"]}>
        ${Intl.NumberFormat().format(price)}
      </div>
      {isOwner && <CloseButton onClick={onDeleteClick} />} 
      <div className={styles["card-image-container"]}>
        <Image
          height={200}
          width={250}
          src={img || noImage}
          alt={alt}
          className={styles["card-image"]}
          priority
        />
        <div className={styles["card-info-overlay"]}>
          <div className={styles["card-model-make"]}>
            {model} <b>{make}</b>
          </div>
          <div className={styles["card-desc"]}>{desc}</div>
        </div>
      </div>
      <div className={styles["card-button-container"]}>
        <ViewEdit owner={owner} />
      </div>
    </Link>
  );
}
