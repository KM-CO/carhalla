"use client"
import Link from "next/link";
import Button from "./Button"
import Image from 'next/image'
import { LoggedStatus } from "./Contexts";
import { useContext } from "react";
import styles from './Card.module.css';

interface CardProps {
  model: string,
  make: string,
  price: number,
  img: string,
  alt: string,
  desc: string,
}

/** TO DO
 * Add functionality to clicking card/image
 * Add functionality to clicking BUY button (should take to same page as clicking anywhere else)
 * Add fonts and more CSS
 * Change button stuff to EDIT when logged in (should be something about it on slides using ternary operators)
 */
export default function Card({ model, make, price, img, alt, desc }: CardProps, key: string) {
  const loggedInStatus = useContext(LoggedStatus);
  return (
    <div className={styles.card}>
      <div className={styles['card-price']}>${price}</div>
      <div className={styles['card-image-container']}>
        <Image
          height={200}
          width={250}
          src={img}
          alt={alt}
          className={styles['card-image']}
          priority
        />
        <div className={styles['card-info-overlay']}>
          <div className={styles['card-model-make']}>{model} <b>{make}</b></div>
          <div className={styles['card-desc']}>{desc}</div>
        </div>
      </div>
      <div className={styles['card-button-container']}>
        {loggedInStatus ? (
          <Link href={{ pathname: "form-submission", query: { model, make, price, img, alt, desc, loggedIn: loggedInStatus } }}>
            <Button onClick={() => {}}>Edit</Button>
          </Link>
        ) : (
          <Link href={{ pathname: "view", query: { model, make, price, img, alt, desc, loggedIn: loggedInStatus } }}>
            <Button onClick={() => {}}>Buy</Button>
          </Link>
        )}
      </div>
    </div>
  );
}