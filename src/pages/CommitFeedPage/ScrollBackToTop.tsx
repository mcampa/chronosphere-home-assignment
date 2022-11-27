import React, { useEffect, useState } from "react";
import { HiChevronDoubleUp } from "react-icons/hi";
import styles from "./ScrollBackToTop.module.css";

const THRESHOLD = 300;

export default function ScrollBackToTop() {
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisible = () => {
      const { scrollTop } = document.documentElement;
      if (scrollTop > THRESHOLD) {
        console.log("yes");
        setVisible(true);
      } else if (scrollTop <= THRESHOLD) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <button
      className={styles.root}
      style={{ display: visible ? "inline" : "none" }}
    >
      <HiChevronDoubleUp onClick={scrollToTop} />
    </button>
  );
}
