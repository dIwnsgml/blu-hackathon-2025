"use client"

import styles from "./page.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import terms from '../../../terms.js'
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

export default function Vocab() {

  const inputRef = useRef(null);
  const [term, setTerm] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    setTerm(terms[Math.floor(Math.random() * terms.length)])
  }, []);

  const defineTerm = useCallback(async (term) => {
    const attempt = inputRef.current.value;
    inputRef.current.value = "";

    let newChat = [...chatHistory, {msg: attempt, ai: false}];

    setChatHistory(newChat);

    const res = await requestHandler(AxiosInstance.get(`/ai`, { params: { term: term, attempt } }));
    const aiChat = res.data.response;

    newChat = [...newChat, {msg: aiChat, ai: true}];
    setChatHistory(newChat);

    setTerm(terms[Math.floor(Math.random() * terms.length)])
  }, [inputRef, chatHistory]);

  useEffect(() => {
    if (!term) return;
    setChatHistory([...chatHistory, {msg: "What is " + term + "?", ai: true}]);
  }, [term])

  return (
    <div className={"page"}>
      <main className="main">
        <br />
        <h1 className={styles.termQuestion}>
          What is &lsquo;{term}&rsquo;?
        </h1>
        <label>
          <input ref={inputRef} type="text" placeholder={"Define: " + term} />
        </label>
        <button onClick={() => { defineTerm(term) }}>Submit</button>
        <br /><br />
        {
          chatHistory.map((message, i) => (
            <p key={i} className>
              {message.ai ? "AI" : "User"}: {message.msg}
            </p>
          ))
        }
      </main>
    </div>
  );
}
