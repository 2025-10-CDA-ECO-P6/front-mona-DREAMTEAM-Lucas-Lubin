'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBirthdayCake,
  faWeightScale,
  faRuler,
  faPaw,
} from '@fortawesome/free-solid-svg-icons';

import Vaccination from '@/app/components/Vaccination';
import Treatment from '@/app/components/Treatment';
import Consultation from '@/app/components/Consultation';
import { apiFetch } from '@/lib/apiFetch';

export default function AnimalPage() {
  const { id } = useParams(); // ✅ ICI

  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAnimal = async () => {
      try {
        const response = await apiFetch(`/animals/${id}?populate=*`);
        setAnimal(response.data);
      } catch (error) {
        console.error('Failed to fetch animal:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [id]);

  if (!id || loading) return <p>Chargement...</p>;
  if (!animal) return <p>Animal introuvable</p>;

    return (
    <>
      <div className={styles.animal}>
        <div className={styles.animalCard}>
          <div className={styles.left}>
            <p className={styles.info}>
              <span className={styles.name}>{animal.name}</span>
              <span className={styles.dot}> • </span>
              <span className={styles.species}>{animal.animal_type}</span>
              {/* <span className={styles.dot}> • </span>
              <span className={styles.breed}>{animal.race}</span> */}
            </p>
            <br></br>
            <div className={styles.carac}>
              {/* <div className={styles.row}>
                <FontAwesomeIcon
                  icon={faBirthdayCake}
                  className={styles.icon}
                />
                <span>
                  {animal.date_naissance} - {animal.age} ans
                </span>
              </div>

              <div className={styles.row}>
                <FontAwesomeIcon icon={faWeightScale} className={styles.icon} />
                <span>{animal.poids} kg</span>
              </div>

              <div className={styles.row}>
                <FontAwesomeIcon icon={faRuler} className={styles.icon} />
                <span>{animal.taille} cm</span>
              </div> */}

              <div className={styles.proprio}>
                <span className={styles.label}>Propriétaire : </span>
                <span className={styles.value}>{animal.owner.owner_firstname} {animal.owner.owner_lastname}</span>
              </div>
{/* 
              <div className={styles.row}>
                <FontAwesomeIcon icon={faPaw} className={styles.icon} />
                <span>
                  <span className={styles.label}>N° ICAD :</span>
                  <span className={styles.value}> {animal.num_puce}</span>
                </span>
              </div> */}
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.bubble}>
              <img
                src={`http://localhost:1337${animal.image}`}
                alt={animal.name}
                className={styles.photo}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detailsSection}>
        <Vaccination vaccins={animal.vaccinations} />
        <Treatment traitements={animal.treatments} />
        <Consultation consultations={animal.appointments} />
      </div>
    </>
  );
}
