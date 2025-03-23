"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWindowSize } from "@/hooks/otherHooks";

function SidebarEl({ pathname, href, children, tutorial, onClick }) {
  return (
    <Link
      href={href}
      className={`${styles.SidebarEl} ${
        href === pathname ? styles.activeSidebar : ""
      }`}
      id={href === pathname ? "activeSidebar" : ""}
      data-tutorial={tutorial}
      onClick={onClick ?? onClick}
    >
      {children}
    </Link>
  );
}

function Sidebar({}) {
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
          src="/logo.png"
          alt="FLOZABLE"
          width={0}
          height={0}
          sizes="100vw"
          className={styles.logo}
        />
        <p className="jost">FLOZABLE</p>
      </Link>
      <div ref={focusBackgroundRef} id={styles.focusBackground}></div>
      <SidebarEl pathname={pathname} href={"/dashboard"}>
        <i></i>
        <h3>Dashboard</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/stats"}>
        <i></i>
        <h3>Statistics</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/planner"}>
        <i></i>
        <h3>Planner</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/leaderboard"}>
        <i></i>
        <h3>Leaderboard</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/groups"} tutorial={21}>
        <i></i>
        <h3>Groups</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/friends"}>
        <i></i>
        <h3>Friends</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/themes"}>
        <i></i>
        <h3>Themes</h3>
      </SidebarEl>
      <SidebarEl pathname={pathname} href={"/dashboard/account"}>
        <i></i>
        <h3>Settings</h3>
      </SidebarEl>
      <div className={styles.buttons}></div>
    </aside>
  );
}

export default Sidebar;
