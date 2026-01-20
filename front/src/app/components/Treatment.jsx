"use client";
import { useState } from "react";
import styles from "./Treatment.module.css";

export default function Treatment({ traitements = [] }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Traitements :</h2>

      <ul className={styles.list}>
        {traitements.map((t) => (
          <TraitementItem key={t.treatment_id} t={t} />
        ))}
      </ul>
    </div>
  );
}

function TraitementItem({ t }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.item}>
      <div className={styles.row}>
        <span className={styles.date}>
          {t.treatment_date}
        </span>
        <br></br>
        <span className={styles.name}>{t.treatment_title}</span>
      </div>

      {open && (
        <div className={styles.details}>
          <div className={styles.poso}>
            • Categorie : <strong>{t.treatment_category}</strong>
          </div>

          {t.treatment_diagnostic && (
            <div className={styles.comment}>
              • Diagnostique : <strong>{t.treatment_diagnostic}</strong>
            </div>
          )}
          {t.treatment_description && (
            <div className={styles.poso}>
              • Commentaire : <strong>{t.treatment_description}</strong>
            </div>
          )}
        </div>
      )}

      <button className={styles.more} onClick={() => setOpen(!open)}>
        {open ? "Voir moins ▲" : "Voir plus ▼"}
      </button>
    </li>
  );
}
