"use client";
import { useState } from "react";
import styles from "./Consultation.module.css";

export default function Consultation({ consultations = [] }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Consultations :</h2>

      <ul className={styles.list}>
        {consultations.map((c) => (
          <ConsultItem key={c.appointment_id} c={c} />
        ))}
      </ul>
    </div>
  );
}

function ConsultItem({ c }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={styles.item}>
      <div className={styles.row}>
        <span className={styles.date}>{c.appointment_date} :</span>
        <span className={styles.motif}>{c.appointment_reason}</span>
      </div>

      {open && (
        <div className={styles.details}>
          {/* <div>
            <strong>Diagnostic :</strong> {c.diagnostic}
          </div> */}

          {c.appointment_status && (
            <div className={styles.observation}>
              <strong>Statut :</strong> {c.appointment_status}
            </div>
          )}

          <div>
            <strong>Vétérinaire :</strong> {c.appointment_veterinarian.veterinarian_firstname} {c.appointment_veterinarian.veterinarian_lastname}
          </div>
        </div>
      )}

      <button className={styles.more} onClick={() => setOpen(!open)}>
        {open ? "Voir moins ▲" : "Voir plus ▼"}
      </button>
    </li>
  );
}
