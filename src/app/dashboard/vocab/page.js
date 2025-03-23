"use client"

import styles from "./page.module.css";
import { useState, useRef, useCallback } from "react";
import terms from '../../../terms.js'

export default function Vocab() {

  const inputRef = useRef(null);
  const [term, setTerm] = useState(terms[Math.floor(Math.random() * terms.length)]);

  const handleClick = () => {
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
            'content': "Please act as a financial scammer for me to practice conversing and avoiding scams, until I say stop. Don't reveal that you're a financial scammer, and make it like a realistic text conversation please. Please end with a complete sentence, and sometimes subtly give away signs that it's a scam (for example, have some spelling and capitalization and grammar errors). Be persistent and make it sound urgent too please."
          }
        ]
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data["choices"][0]["message"]['content'])
      });
  };

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
        console.log(data["choices"][0]["message"]['content'])
      });

    setTerm(terms[Math.floor(Math.random() * terms.length)])
  }, [inputRef]);

  return (
    <div className={"page"}>
      <main className="main">
        <button onClick={() => { handleClick() }}>Click me</button>
        <br />
        <h1 style={{ 'color': 'black' }}>
          What is {term}?
        </h1>
        <button onClick={() => { defineTerm(term) }}>Submit</button>
        <label>
          <input type="text" value="Define {term}" />
        </label>
      </main>
    </div>
  );
}
