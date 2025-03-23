import styles from "./MyChatContainer.module.css";

function MyChatContainer({ message }) {
  return (
    <li className={styles.MyChatContainer}>
      {/* <p className={styles.time}>{time}</p> */}
      <p>{message}</p>
    </li>
  );
}

export default MyChatContainer;
