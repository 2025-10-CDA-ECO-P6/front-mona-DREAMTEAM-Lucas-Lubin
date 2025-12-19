'use client';
import Card from '../components/Card';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/apiFetch';

export default function AnimauxPage() {
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const fetchAnimals = async () => {
        try {
            const animals = await apiFetch('/animals');
            setFilteredAnimals(animals.data);
        } catch (error) {
            console.error('Failed to fetch animals:', error);
        }
    };

    useEffect(() => {
        fetchAnimals();
    }, []);

    function nextConsult() {
        const now = new Date();

        // Les consultations, avec l'animal attaché dedans
        const all = data.flatMap((animal) => animal.consultations.map((consult) => ({ consult, animal })));

        // Filtrer dates du futur
        const future = all.filter((c) => new Date(c.consult.date_visite) > now);

        // Trier date la plus proche
        future.sort((a, b) => new Date(a.consult.date_visite) - new Date(b.consult.date_visite));

        // Garder les animaux SANS doublons
        const result = [];

        future.forEach((item) => {
            const animal = item.animal;

            // Si animal n'est pas déjà dans result, on l'ajoute
            if (!result.some((a) => a.id === animal.id)) {
                result.push(animal);
            }
        });

        // 5. Retourner TOUS les animaux
        return result;
    }

    function alphabetanimal(data) {
        return data.sort((a, b) => a.nom.localeCompare(b.nom));
    }

    return (
        <>
            <div className={styles.welcome}>
                <div className={styles.welcomeCard}>
                    <div className={styles.left}>
                        <h1 className={styles.title}>Bienvenue dans le Carnet de Santé</h1>
                        <p className={styles.subtitle}>
                            Retrouvez ici tous les dossiers complets et mis à jour de vos animaux.
                        </p>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.bubble}>
                            <FontAwesomeIcon icon={faPaw} className={styles.bubbleIcon} />
                        </div>
                    </div>
                </div>
            </div>
            <SearchBar />

            <Filter
                filters={['Liste', 'Prochaine consultation']}
                onFilter={(filterName) => {
                    if (filterName === 'Liste') {
                        const sorted = alphabetanimal(data);
                        setFilteredAnimals(sorted);
                    }
                    if (filterName === 'Prochaine consultation') {
                        const animals = nextConsult();
                        setFilteredAnimals(animals);
                    }
                }}
            />

            {/* affichage json en brut DEBUUG */}
            {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
            <div className={styles.container}>
                <div className={styles.grid}>
                    {filteredAnimals.map((animal) => (
                        <Card key={animal.id} animal={animal} />
                    ))}
                </div>
            </div>
        </>
    );
}
