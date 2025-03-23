"use client"

import styles from "./page.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import terms from '../../../terms.js'

export default function Vocab() {

  const inputRef = useRef(null);
  const [term, setTerm] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    setTerm(terms[Math.floor(Math.random() * terms.length)])
  }, []);

  const defineTerm = useCallback((term) => {
    const attempt = inputRef.current.value;
    inputRef.current.value = "";
    fetch('https://localhost:4006/ai', {
      method: 'get',

    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        return;
        const res = data["choices"][0]["message"]['content'];
        setAiResponse(res);
        setChatHistory([...chatHistory, attempt, res]);
      });

    setTerm(terms[Math.floor(Math.random() * terms.length)])
  }, [inputRef]);

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
              {message}
            </p>
          ))
        }
        <h2>
          AI Response: {aiResponse}
        </h2>
      </main>
    </div>
  );
}
