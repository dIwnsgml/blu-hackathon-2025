"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWindowSize } from "@/hooks/otherHooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBullseye,
  faShieldAlt,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import AccountBtn from "@/components/buttons/AccountBtn/AccountBtn";

function SidebarEl({ pathname, href, children, onClick }) {
  return (
    <Link
      href={href}
      className={`${styles.SidebarEl} ${
        href === pathname ? styles.activeSidebar : ""
      }`}
      id={href === pathname ? "activeSidebar" : ""}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function Sidebar() {
  const focusBackgroundRef = useRef(null);
  const pathname = usePathname();
  const windowSize = useWindowSize();

  useEffect(() => {
    const activeItem = document.getElementById("activeSidebar");
    if (activeItem && focusBackgroundRef.current) {
      const itemRect = activeItem.getBoundingClientRect();
      const sidebarRect = activeItem.parentElement.getBoundingClientRect();
      const topOffset = itemRect.top - sidebarRect.top;
      focusBackgroundRef.current.style.transform = `translateY(${topOffset}px)`;
    }
  }, [pathname, windowSize]);

  return (
    <aside className={styles.Sidebar}>
      <Link href={"/"} className={styles.logoContainer}>
        <Image
          src="/images/logo.png"
          alt="SafeCents"
          width={0}
          height={0}
          sizes="100vw"
          className={styles.logo}
        />
        <p className="jost">SafeCents</p>
      </Link>
      <div ref={focusBackgroundRef} id={styles.focusBackground}></div>
      <SidebarEl pathname={pathname} href={"/dashboard/vocab"}>
        <i>
          <FontAwesomeIcon icon={faBook} />
        </i>
        <h3>Financial Literacy</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/goals"}>
        <i>
          <FontAwesomeIcon icon={faBullseye} />
        </i>
        <h3>Financial Goal Tracker</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/scam-simulator"}>
        <i>
          <FontAwesomeIcon icon={faShieldAlt} />
        </i>
        <h3>Scam Simulator</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/receipt-scanner"}>
        <i>
          <FontAwesomeIcon icon={faReceipt} />
        </i>
        <h3>Receipt Scanner</h3>
      </SidebarEl>
      <div className={styles.buttons}>
        <AccountBtn />
      </div>
    </aside>
  );
}

export default Sidebar;
