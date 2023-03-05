import React, { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

export default () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        className="--theme-button"
        onClick={() => setTheme(!theme)}
      >
        Change Theme
      </button>
    </>
  );
};
