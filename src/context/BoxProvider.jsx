import React, { useState, useEffect } from "react";
import { BoxContext } from "./useBox";

export const BoxProvider = ({ children }) => {
  const [boxes, setBoxes] = useState(() => {
    const saved = localStorage.getItem("boxes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const saved = localStorage.getItem("boxes");
    console.log(saved)

    if (saved) setBoxes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("boxes", JSON.stringify(boxes));
  }, [boxes]);

  const addBox = box => setBoxes((prev) => [...prev, box]);

  return (
    <BoxContext.Provider value={{ boxes, addBox }}>
      {children}
    </BoxContext.Provider>
  );
};
