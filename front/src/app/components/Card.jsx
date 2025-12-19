import styles from './Card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake, faWeightScale, faRuler, faPaw } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Card({ animal }) {
    return (
        <Link href={`/animaux/${animal.id}`} className={styles.card}>
            <img src={`http://localhost:1337/${animal.image}`} alt={animal.name} className={styles.photo} />

            <div className={styles.info}>
                <h3 className={styles.nom}>{animal.name}</h3>
                <p className={styles.meta}>
                    {animal.gender} • {animal.animal_type}
                </p>
                <div className={styles.row}>
                    <FontAwesomeIcon icon={faBirthdayCake} className={styles.icon} />
                    <span>
                        Propriétaire : {animal.owner.owner_firstname} {animal.owner.owner_lastname}
                    </span>
                </div>

                <div className={styles.row}>
                    <FontAwesomeIcon icon={faWeightScale} className={styles.icon} />
                    <span>{animal.owner.owner_adress}</span>
                </div>

                <div className={styles.row}>
                    <FontAwesomeIcon icon={faRuler} className={styles.icon} />
                    <span>{animal.owner.owner_mail}</span>
                </div>

                <div className={styles.row}>
                    <FontAwesomeIcon icon={faPaw} className={styles.icon} />
                    <span>{animal.owner.owner_phone}</span>
                </div>

                <button className={styles.btn}>Voir la fiche</button>
            </div>
        </Link>
    );
}
