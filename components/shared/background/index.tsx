import React from "react";
import styles from "./background.module.css";

type Props = {};

export default function Background({}: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.content}></div>
    </div>
  );
}
