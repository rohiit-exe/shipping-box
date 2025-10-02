import React, { createContext, useState, useContext, useEffect } from "react";

const BoxContext = createContext();

export const BoxProvider = ({ children }) => {
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("boxes");
        if (saved) setBoxes(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("boxes", JSON.stringify(boxes));
    }, [boxes]);

    const addBox = (box) => {
        setBoxes((prev) => [...prev, box]);
    };

    return (
        <BoxContext.Provider value={{ boxes, addBox }}>
            {children}
        </BoxContext.Provider>
    );
};

export const useBox = () => useContext(BoxContext);
