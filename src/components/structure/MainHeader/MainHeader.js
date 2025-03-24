"use client";

import Link from "next/link";
import styles from "./MainHeader.module.css";
import ResponsiveImg from "@/components/others/ResponsiveImg/ResponsiveImg";

export default function MainHeader() {
  return (
    <header className={styles.MainHeader}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <ResponsiveImg src={"/images/logo.png"} basedOnWidth={false} />
        </div>
        <div>
          <h1>SafeCents</h1>
          <p>Empowering Communities with Financial Knowledge</p>
        </div>
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
        </div>
        <div className={styles.page}>
          <Link href={"/#review"}>Review</Link>
        </div> */}
        <div className={styles.page}>
          <Link href={"/dashboard/vocab"}>Dashboard</Link>
        </div>
      </div>
      <div className={styles.right}></div>
    </header>
  );
}
