"use client";

import BlobBtn from "@/components/buttons/BlobBtn/BlobBtn";
import styles from "./page.module.css";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ThpaceGL } from "thpace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBrain,
  faBullseye,
  faFileInvoice,
  faShieldAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import ResponsiveImg from "@/components/others/ResponsiveImg/ResponsiveImg";

const variants = {
  hidden: { opacity: 0, x: -500 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, type: "spring" },
  },
};

const settings = {
  colors: ["#4CB1EF", "#424959", "#FF4B44"],
  triangleSize: 100,
  bleed: 500,
  automaticResize: false,
  pointAnimationSpeed: 10000,
  noise: 50,
  particleSettings: {
    color: "white",
    count: [2, 3],
    radius: [0.5, 2],
  },
};

function Box({ children, title, description }) {
  return (
    <div className={styles.Box}>
      <div className={styles.icon}>{children}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}

export default function Home() {
  const router = useRouter();

  const canvasRef = useRef(null);

  useEffect(() => {
    ThpaceGL.create(canvasRef.current, settings);
  }, [canvasRef]);
  return (
    <div className={styles.page}>
      <canvas ref={canvasRef} className={styles.background} />
      <main>
        <div className={styles.layer}>
          <motion.div
            className={styles.section}
            variants={variants}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.title}>
              <h1 style={{ "font-size": "100px" }}>SafeCents.</h1>
            </div>
            <div className={styles.subTitle}>
              <p>
                Your Shield Against Financial Fraud. Smart Money Management.
              </p>
            </div>
            <div className={styles.description}>
              <p>
                SafeCents is your go-to platform for improving financial
                literacy and protecting yourself from scams. Our AI-powered
                tools help you set financial goals, understand key financial
                terms, and even practice avoiding real-world scams in a safe
                environment.
              </p>
              <p>
                Whether you&apos;re learning to budget, investing wisely, or
                avoiding fraud, SafeCents gives you the knowledge and resources
                to make smarter financial decisions.
              </p>
              <p>
                Financial fraud is an ever-growing concern in today&apos;s
                digital world. From phishing scams to identity theft, many
                individuals fall victim to sophisticated fraudulent schemes.
                SafeCents helps users recognize the warning signs of financial
                fraud and develop proactive strategies to safeguard their money.
              </p>
            </div>
            <BlobBtn onClick={() => router.push("/dashboard")}>
              <p>Get Started</p>
            </BlobBtn>
          </motion.div>
        </div>

        <div className={styles.layer}>
          <motion.div
            className={styles.section}
            variants={variants}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.title}>
              <h2>Set &amp; Track Your Financial Goals</h2>
            </div>
            <div className={styles.description}>
              <p>
                Take control of your finances by setting clear, achievable
                financial goals. Our smart tracking system provides insights and
                personalized recommendations to keep you on the right path.
              </p>
              <p>
                Whether you&apos;re saving for an emergency fund, planning for
                retirement, or budgeting for a major purchase, SafeCents
                provides the necessary tools to help you stay financially
                disciplined. Our goal-setting feature allows users to define
                their objectives, track progress, and adjust strategies as
                needed.
              </p>
            </div>
          </motion.div>
          <div className={styles.rightImg}>
            <ResponsiveImg src={"/images/calculator.jpg"} />
          </div>
        </div>

        <div className={styles.layer}>
          <motion.div
            className={styles.section}
            variants={variants}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.title}>
              <h2>Practice Avoiding Scams with AI Chatbot</h2>
            </div>
            <div className={styles.description}>
              <p>
                Train yourself to recognize scams with our AI-powered scam
                simulation chatbot. Engage in realistic scammer conversations
                and learn how to identify red flags.
              </p>
              <p>
                The chatbot will guide you through various scam scenarios,
                helping you develop the skills to respond effectively and
                protect yourself from falling victim to fraud.
              </p>
              <p>
                **Disclaimer:** Do not click any links in the chatbot, as they
                may exist in the real world and could lead to unsafe sites.
                These are for educational purposes only.
              </p>
            </div>
          </motion.div>
          <div className={styles.rightImg}>
            <ResponsiveImg src={"/images/chatbot.jpg"} />
          </div>
        </div>

        <div className={styles.layer}>
          <motion.div
            className={styles.section}
            variants={variants}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.title}>
              <h2>Scan Receipts &amp; Learn to Manage Expenses</h2>
            </div>
            <div className={styles.description}>
              <p>
                Simply scan your receipts and let our AI analyze your spending
                habits. Get insights on where your money goes and tips on how to
                optimize your budget.
              </p>
              <p>
                Keeping track of expenses can be challenging, but our receipt
                scanning feature makes it easy to categorize spending, detect
                patterns, and offer personalized financial advice. Understanding
                your expenses is the first step toward achieving financial
                stability.
              </p>
            </div>
          </motion.div>
          <div className={styles.rightImg}>
            <ResponsiveImg src={"/images/receipt.jpg"} />
          </div>
        </div>

        <div className={styles.layer}>
          <motion.div
            className={styles.section}
            variants={variants}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.title}>
              <h2>Financial Glossary &amp; Learning Hub</h2>
            </div>
            <div className={styles.description}>
              <p>
                Learn essential financial terms and concepts with interactive
                lessons, flashcards, and quizzes. Build a solid foundation in
                financial literacy at your own pace.
              </p>
              <p>
                Financial literacy is key to making informed decisions about
                saving, investing, and managing debt. Our learning hub provides
                comprehensive resources on topics such as credit scores,
                investment strategies, loan management, and more.
              </p>
            </div>
          </motion.div>
          <div className={styles.rightImg}>
            <ResponsiveImg src={"/images/learn.jpg"} />
          </div>
        </div>

        <div className={styles.layer}>
          <motion.div
            className={styles.section}
            variants={variants}
            initial="hidden"
            whileInView="visible"
          >
            <div className={styles.scroll} id="feature"></div>
            <h1 className={styles.title}>App Features</h1>
            <h2 className={styles.subTitle}>Empowering Financial Education</h2>
            <div className={styles.boxes}>
              <Box
                title="Set &amp; Track Financial Goals"
                description={`Define your financial goals and monitor your progress with personalized insights and recommendations.`}
              >
                <FontAwesomeIcon icon={faBullseye} />
              </Box>
              <Box
                title="Scam Awareness Training"
                description={`Engage in realistic chatbot simulations to practice spotting scams, identifying red flags, and learning how to respond safely.`}
              >
                <FontAwesomeIcon icon={faShieldAlt} />
              </Box>
              <Box
                title="AI-Powered Financial Insights"
                description={`Receive intelligent financial suggestions based on your spending habits, helping you make smarter decisions.`}
              >
                <FontAwesomeIcon icon={faBrain} />
              </Box>
              <Box
                title="Community Learning &amp; Discussions"
                description={`Join a vibrant community of users, share experiences, and learn from others' financial journeys.`}
              >
                <FontAwesomeIcon icon={faUsers} />
              </Box>
              <Box
                title="Scan &amp; Analyze Receipts"
                description={`Upload your receipts and let AI extract valuable insights, categorize expenses, and offer financial recommendations.`}
              >
                <FontAwesomeIcon icon={faFileInvoice} />
              </Box>
              <Box
                title="Financial Key Terms Glossary"
                description={`Access a comprehensive glossary of essential financial terms to boost your understanding of key concepts.`}
              >
                <FontAwesomeIcon icon={faBookOpen} />
              </Box>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
