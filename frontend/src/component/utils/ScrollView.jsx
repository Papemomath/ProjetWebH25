import { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function ScrollTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY >= 200);
    };

    window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          cursor: "pointer",
          zIndex: 1000,
          border: "none",
          background: "transparent",
          fontSize: "2rem",
          color: "white",
        }}
      >
        <FaArrowAltCircleUp />
      </button>
    )
  );
}
