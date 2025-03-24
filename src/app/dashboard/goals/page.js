"use client";

import LineInput from "@/components/inputs/LineInput/LineInput";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DropDownButton from "@/components/buttons/DropDownButton/DropDownButton";
import RadialBarChart from "@/components/charts/ProgressChart";
import { PolarAngleAxis, RadialBar } from "recharts";
import ProgressChart from "@/components/charts/ProgressChart";
import FinanceModal from "@/components/modals/FinanceModal";
import { Button } from "@mui/material";
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

export default function Vocab() {
  const [newGoal, setNewGoal] = useState({
    name: "",
    type: "",
    budget: 0,
    repeat: "month",
  });

  const [open, setOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log("Submitted Data:", data);
    return requestHandler(AxiosInstance.put(`/account`));
    // Add API call logic here
  };
  const [finances, setFinances] = useState([
    {
      name: "Emergency Fund",
      balance: 8000,
      goal: 15000,
      saved: 8000,
      left_save: 7000,
      monthly_amount: 500,
      goal_date: "12/2025",
      month_left: 14,
    },
    {
      name: "Vacation Fund",
      balance: 2500,
      goal: 5000,
      saved: 2500,
      left_save: 2500,
      monthly_amount: 300,
      goal_date: "06/2024",
      month_left: 5,
    },
    {
      name: "Retirement Savings",
      balance: 35000,
      goal: 1000000,
      saved: 35000,
      left_save: 965000,
      monthly_amount: 1200,
      goal_date: "12/2050",
      month_left: 312,
    },
    {
      name: "Car Purchase",
      balance: 4000,
      goal: 25000,
      saved: 4000,
      left_save: 21000,
      monthly_amount: 800,
      goal_date: "10/2026",
      month_left: 30,
    },
    {
      name: "Home Down Payment",
      balance: 15000,
      goal: 80000,
      saved: 15000,
      left_save: 65000,
      monthly_amount: 1500,
      goal_date: "05/2030",
      month_left: 72,
    },
    {
      name: "Student Loan Payoff",
      balance: 10000,
      goal: 50000,
      saved: 10000,
      left_save: 40000,
      monthly_amount: 600,
      goal_date: "09/2032",
      month_left: 96,
    },
    {
      name: "Wedding Fund",
      balance: 5000,
      goal: 25000,
      saved: 5000,
      left_save: 20000,
      monthly_amount: 1000,
      goal_date: "06/2026",
      month_left: 27,
    },
    {
      name: "Education Fund (Kids)",
      balance: 20000,
      goal: 100000,
      saved: 20000,
      left_save: 80000,
      monthly_amount: 1500,
      goal_date: "09/2040",
      month_left: 192,
    },
  ]);

  return (
    <div className={"page"}>
      <main className="main">
        <div className={styles.layer}>
          <div className="box">
            {/* <div className="header">
              <h2>Add a new goal to save for</h2>
            </div> */}
            <FinanceModal />
            <Button onClick={() => setOpen(true)}>Add Finance</Button>
            <FinanceModal
              open={open}
              onClose={() => setOpen(false)}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="box" id={styles.categories}>
            {finances.map((finance, index) => (
              <div key={index} className={styles.category}>
                <div className={styles.header}>
                  <h2>{finance.name}</h2>
                </div>
                <div className={styles.layer}>
                  <p>Balance: ${finance.balance}</p>
                </div>
                <div className={styles.layer} id={styles.progressChart}>
                  <ProgressChart
                    name={finance.name}
                    value={Math.floor((finance.saved / finance.goal) * 100)}
                  />
                </div>
                <div className={styles.layer}>
                  <table>
                    <tbody>
                      <tr>
                        <th>Goal Amount</th>
                        <td>${finance.goal}</td>
                      </tr>
                      <tr>
                        <th>Start Amount</th>
                        <td>${finance.balance - finance.saved}</td>
                      </tr>
                      <tr>
                        <th>Saved</th>
                        <td>${finance.saved}</td>
                      </tr>
                      <tr>
                        <th>Left to Save</th>
                        <td>${finance.left_save}</td>
                      </tr>
                      <tr>
                        <th>Monthly Amount</th>
                        <td>${finance.monthly_amount}</td>
                      </tr>
                      <tr>
                        <th>Goal Date</th>
                        <td>{finance.goal_date}</td>
                      </tr>
                      <tr>
                        <th>Months Left</th>
                        <td>{finance.month_left}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
