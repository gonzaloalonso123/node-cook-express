import { createContext, useContext, useEffect, useState } from "react";

const scrollContext = createContext();

export const ScrollProvider = ({ children, targetRef }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (targetRef.current) {
        setScrollPosition(targetRef.current.scrollTop);
      }
    };

    if (targetRef.current) {
      targetRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [targetRef]);

  return (
    <scrollContext.Provider value={{ scrollPosition }}>
      {children}
    </scrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(scrollContext);
  if (context === undefined) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
