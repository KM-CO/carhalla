import Image from 'next/image';
import styles from './Card.module.css';
import CloseButton from "./CloseButton";
import View from "./View";

interface CardProps {
  id: string;
  model: string;
  make: string;
  price: number;
  img: string;
  alt: string;
  desc: string;
  isLoggedIn: boolean; 
}

export default function Card({ id, model, make, price, img, alt, desc, isLoggedIn }: CardProps) {
  const onDeleteClick = async () => {
    try {
      const response = await fetch(`/api/cars/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      document.getElementById(id)!.remove();
    } catch (error) {
      console.log(`Error deleting car ${id}:`, error);
    }
  };

  return (
    <div className={styles.card} id={id}>
      <div className={styles['card-price']}>${Intl.NumberFormat().format(price)}</div>
      {isLoggedIn && <CloseButton onClick={onDeleteClick} />} {/* Show delete button only if logged in */}
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
