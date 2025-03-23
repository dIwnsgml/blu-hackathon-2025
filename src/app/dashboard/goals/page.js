"use client";

import LineInput from "@/components/inputs/LineInput/LineInput";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Vocab() {
  return (
    <div className={"page"}>
      <main className="main">
        <div className={styles.layer}>
          <div className="box">
            <div className="header">
              <h2>Add a new goal to save for</h2>
            </div>
            <LineInput
              label={"Email"}
              type={"email"}
              value={signIn.email}
              setValue={(email) => setSignIn((prev) => ({ ...prev, email }))}
              autoComplete="email"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
