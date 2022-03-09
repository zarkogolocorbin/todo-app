import { createContext, useReducer } from "react";
export const ModeContext = createContext();

const modeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export function ModeProvider({ children }) {
  const [state, dispatch] = useReducer(modeReducer, {
    mode: "light",
  });

  const changeMode = (mode) => {
    dispatch({ type: "CHANGE_MODE", payload: mode });
    localStorage.setItem("mode", mode);
  };

  const currentMode = localStorage.getItem("mode");

  return (
    <ModeContext.Provider value={{ currentMode, changeMode }}>
      {children}
    </ModeContext.Provider>
  );
}
