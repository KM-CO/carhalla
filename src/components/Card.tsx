"use client"
import Image from 'next/image';
import styles from './Card.module.css';
import CloseButton from "./CloseButton";
import View from "./View";

interface CardProps {
  id: string,
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
export default function Card({ id, model, make, price, img, alt, desc }: CardProps) {
  const onDeleteClick = async () => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      document.getElementById(id)!.innerHTML = "";
      document.getElementById(id)!.remove();
    } catch (error) {
      console.log(`Error deleting car ${id}:`, error);
    }
  };

  return (
    <div className={styles.card} id={id}>
      <div className={styles['card-price']}>${Intl.NumberFormat().format(price)}</div>
      <CloseButton onClick={onDeleteClick} />
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
        <View id={id} />
      </div>
    </div>
  );
}