import { FC } from "react";
import styles from './ContactButton.module.css';

interface ContactButtonProps {
  owner: string;
  ownerEmail?: string; 
  isOwner: boolean;
}

const ContactButton: FC<ContactButtonProps> = ({ owner, ownerEmail, isOwner }) => {
  if (isOwner) {
    return <button className={styles['edit-button']}>Edit</button>;
  }

  return (
    <a
      href={ownerEmail ? `mailto:${ownerEmail}` : "#"}
      className={styles['contact-button']}
      onClick={(e) => {
        if (!ownerEmail) {
          e.preventDefault();
          alert("No email available for this owner.");
        }
      }}
    >
      Contact {owner}
    </a>
  );
};

export default ContactButton;
