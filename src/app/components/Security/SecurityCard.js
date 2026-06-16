import styles from "./SecurityCard.module.css";
import React from "react";

const SecurityCard = ({ content: { icon: i, name: n, cont: c } }) => {
  return (
    <>
      <div className={styles.card}>
        <span className={styles.icon}>{i}</span>
        <h2>{n}</h2>
        <p>{c}</p>
      </div>
    </>
  );
};

export default SecurityCard;
