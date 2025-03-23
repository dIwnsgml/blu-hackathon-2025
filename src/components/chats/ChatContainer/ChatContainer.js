import styles from "./ChatContainer.module.css";

function ChatContainer({ message }) {
  return (
    <li className={styles.ChatContainer}>
      <p>{message}</p>
      <div className={styles.info}>
        <p className={`overflowDot ${styles.name}`}>AI</p>
        {/* <p className={styles.time}>{time}</p> */}
      </div>
    </li>
  );
}

export default ChatContainer;
