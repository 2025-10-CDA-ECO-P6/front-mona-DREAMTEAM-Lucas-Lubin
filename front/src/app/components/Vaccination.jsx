"use client";
import { useState } from "react";
import styles from "./Vaccination.module.css";

export default function Vaccination({ vaccins = [] }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Vaccins :</h2>

      <ul className={styles.list}>
        {vaccins.map((v) => (
          <VaccinItem key={v.vaccin_id} v={v} />
        ))}
      </ul>
    </div>
  );
}

function VaccinItem({ v }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.item}>
      <div className={styles.row}>
        <span className={styles.date}>{v.vaccin_date_administered} :</span>
        <span className={styles.name}>{v.vaccin_name}</span>
      </div>

      {open && (
        <div className={styles.details}>
          
          {v.vaccin_status && (
            <div className={styles.rappel}>        
              • Statut : <strong>{v.vaccin_status}</strong>
            </div>
          )}
          {v.vaccin_expiration_date && (
            <div className={styles.rappel}>        
              • Rappel : <strong>{v.vaccin_expiration_date}</strong>
            </div>
          )}

          {/* {v.commentaire && (
            <div className={styles.comment}>{v.commentaire}</div>
          )} */}

        </div>
      )}

      <button className={styles.more} onClick={() => setOpen(!open)}>
        {open ? "Voir moins ▲" : "Voir plus ▼"}
      </button>
    </li>
  );
}
