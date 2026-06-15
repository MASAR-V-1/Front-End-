import { styles } from "next/dist/client/components/styles/access-error-styles";
import React from "react";

const SecurityCard = ({ card: { icon: i, name: n, cont: c } }) => {
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

export default Security - card;
