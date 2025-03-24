"use client";

import styles from "./page.module.css";
import { useState, useRef, useCallback, useEffect } from "react";
import AxiosInstance from "@/utils/axiosInstance";
import { requestHandler } from "@/utils/tools";
import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import ChatContainer from "@/components/chats/ChatContainer/ChatContainer";
import MyChatContainer from "@/components/chats/MyChatContainer/MyChatContainer";
import SendBtn from "@/components/buttons/SendBtn/SendBtn";

export default function ScamSimulator() {
  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [msgInput, setMsgInput] = useState("");

  const sendMsg = useCallback(async () => {
    if (!msgInput.trim()) return;

    const userMsg = msgInput;
    setMsgInput("");

    let newChat = [...chatHistory, { msg: userMsg, ai: false }];
    setChatHistory(newChat);

    let chatLogs = newChat.map((entry) => ({
      role: entry.ai ? "assistant" : "user",
      content: entry.msg,
    }));

    const res = await requestHandler(
      AxiosInstance.get(`/ai/chat`, { params: { chatHistory: chatLogs } })
    );
    const aiChat = res.data.response;

    newChat = [...newChat, { msg: aiChat, ai: true }];
    setChatHistory(newChat);
  }, [chatHistory, msgInput]);

  useEffect(() => {
    if (chatHistory.length < 1) {
      async function initialChat() {
        const res = await requestHandler(AxiosInstance.get(`/ai/chat`));
        const aiChat = res.data.response;
        setChatHistory([{ msg: aiChat, ai: true }]);
      }
      initialChat();
    }
  }, []);

  return (
    <div className={"page"}>
      <main className="main">
        <div className="box">
          <div className="header">
            <BlobBtn onClick={() => setChatHistory([])}>Reset Chat</BlobBtn>
          </div>
          <div className={styles.chatsContainer}>
            <ul className={styles.chats}>
              {chatHistory.map((message, i) =>
                message.ai ? (
                  <ChatContainer key={i} message={message.msg} />
                ) : (
                  <MyChatContainer key={i} message={message.msg} />
                )
              )}
            </ul>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={msgInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMsg();
                }}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Send your message"
              />
              <SendBtn onSubmit={sendMsg} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
