import { createContext, useContext } from "react";

export const BoxContext = createContext();
export const useBox = () => useContext(BoxContext);
