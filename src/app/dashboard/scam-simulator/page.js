"use client"

import styles from "./page.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";

export default function ScamSimulator() {

  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);

  const sendMsg = useCallback(async () => {
    const userMsg = inputRef.current.value;
    inputRef.current.value = "";

    let chatLogs = [];
    for (let i = 0; i < chatHistory.length; i++) {
      chatLogs.push({role: chatHistory[i].ai ? "assistant:" : "user:", content: chatHistory[i].msg});
    }
    chatLogs.push({
      role: "user",
      content: userMsg,
    })

    let newChat = [...chatHistory, { msg: userMsg, ai: false }];

    setChatHistory(newChat);

    const res = await requestHandler(AxiosInstance.get(`/ai/chat`, {params: {chatHistory: chatLogs}}));
    const aiChat = res.data.response;

    newChat = [...newChat, { msg: aiChat, ai: true }];
    setChatHistory(newChat);
  }, [inputRef, chatHistory]);

  useEffect(() => {
    if (chatHistory.length < 1) {
      async function initialChat() {
        const res = await requestHandler(AxiosInstance.get(`/ai/chat`));
        console.log(res);
        const aiChat = res.data.response;
        setChatHistory([...chatHistory, { msg: aiChat, ai: true }]);
      }
      initialChat();
    }
  }, [chatHistory]);

  return (
    <div className={"page"}>
      <main className="main">
        <br />
        <label>
          <input ref={inputRef} type="text" placeholder="Send your message" />
        </label>
        <button onClick={() => { sendMsg() }}>Submit</button>
        <br /><br />
        {
          chatHistory.map((message, i) => (
            <p key={i}>
              {message.ai ? "AI" : "User"}: {message.msg}
            </p>
          ))
        }
      </main>
    </div>
  );
}
