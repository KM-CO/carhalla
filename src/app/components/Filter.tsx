import styles from './Filter.module.css';

export default function Filter() {
    return (
        <div className={styles.filterContainer}>
            <button className={styles.filterButton}>Model</button>
            <button className={styles.filterButton}>Year</button>
            <button className={styles.filterButton}>Price</button>
        </div>
    );
}