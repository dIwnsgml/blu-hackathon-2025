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
    fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ef3fc1c0236ec575c3c6757b2fa940e982439c52cfb0236c95a024c26f0557ab',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'model': 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
        'messages': [
          {
            'role': 'system',
            'content': "You are a supportive mentor for teaching the meaning of financial key terrms. Your job is only to tell the user if they are right and to define the term."
          },
          {
            'role': 'assistant',
            'content': "What is the term " + term + " ?"
          },
          {
            'role': 'user',
            'content': attempt
          }
        ],
        "max_tokens": 1000,
      })
    })
      .then(response => response.json())
      .then(data => {
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
