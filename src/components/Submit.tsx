import Button from "./Button";
import styles from "./Submit.module.css";

export default function Submit() {
    return (
        <Button className={`${styles.submitButton}`}>
            Submit
        </Button>
    );
}