"use client";

import Link from "next/link";
import styles from "./MainHeader.module.css";

export default function MainHeader() {
  return (
    <header className={styles.MainHeader}>
      <div className={styles.left}>
        <h1>SafeCents</h1>
        <h9 style={{'font-size': '10px'}}>Empowering Communities with Financial Knowledge</h9>
      </div>
      <div className={styles.pages}>
        <div className={styles.page}>
          <Link href={"/#about"}>About</Link>
        </div>
        <div className={styles.page}>
          <Link href={"/#feature"}>Features</Link>
        </div>
        {/* <div className={styles.page}>
          <Link href={"/#pricing"}>Pricing</Link>
        </div> */}
        <div className={styles.page}>
          <Link href={"/#review"}>Review</Link>
        </div>
        <div className={styles.page}>
          <Link href={"/dashboard"}>Dashboard</Link>
        </div>
      </div>
      <div className={styles.right}></div>
    </header>
  );
}
