"use client";

import LineInput from "@/components/inputs/LineInput/LineInput";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Vocab() {
  const [newGoal, setNewGoal] = useState({ name: "", type: "", budget: 0 });
  return (
    <div className={"page"}>
      <main className="main">
        <div className={styles.layer}>
          <div className="box">
            <div className="header">
              <h2>Add a new goal to save for</h2>
            </div>
            <LineInput
              label={"Name"}
              type={"name"}
              value={newGoal.name}
              setValue={(name) => setNewGoal((prev) => ({ ...prev, name }))}
              autoComplete="false"
            />
            <LineInput
              label={"Budget"}
              type={"budget"}
              value={newGoal.budget}
              setValue={(budget) => setNewGoal((prev) => ({ ...prev, budget }))}
              autoComplete="false"
              icon="$"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
