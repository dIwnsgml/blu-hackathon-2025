"use client";

import styles from "./page.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import terms from "../../../terms.js";
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import ChatContainer from "@/components/chats/ChatContainer/ChatContainer";
import MyChatContainer from "@/components/chats/MyChatContainer/MyChatContainer";
import SendBtn from "@/components/buttons/SendBtn/SendBtn";

export default function Vocab() {
  const inputRef = useRef(null);
  const [term, setTerm] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const [msgInput, setMsgInput] = useState("");

  const defineTerm = useCallback(
    async (term) => {
      setMsgInput("");

      let newChat = [...chatHistory, { msg: msgInput, ai: false }];

      setChatHistory(newChat);

      const res = await requestHandler(
        AxiosInstance.get(`/ai`, { params: { term: term, attempt: msgInput } })
      );
      const aiChat = res.data.response;

      newChat = [...newChat, { msg: aiChat, ai: true }];
      setChatHistory(newChat);

      setTerm(terms[Math.floor(Math.random() * terms.length)]);
    },
    [inputRef, chatHistory, msgInput]
  );

  useEffect(() => {
    if (!term) return;
    setChatHistory([
      ...chatHistory,
      { msg: "What is " + term + "?", ai: true },
    ]);
  }, [term]);

  return (
    <div className={"page"}>
      <main className="main">
        <div className="box">
          <div className="header">
            <BlobBtn
              onClick={() => {
                setTerm(terms[Math.floor(Math.random() * terms.length)]);
              }}
            >
              Start learning a new vocab!
            </BlobBtn>
          </div>
          <div className={styles.chatsContainer}>
            <ul className={styles.chats}>
              {chatHistory.map((message, i) => {
                if (message.ai) {
                  return <ChatContainer key={i} message={message.msg} />;
                } else {
                  return <MyChatContainer key={i} message={message.msg} />;
                }
              })}
            </ul>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={msgInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    defineTerm(term);
                  }
                }}
                onChange={(e) => setMsgInput(e.target.value)}
              />
              <SendBtn
                onSubmit={() => {
                  defineTerm(term);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
