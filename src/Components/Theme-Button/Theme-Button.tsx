import React, { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

export default () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <>
      <button
        style={theme ? { backgroundColor: "#CAF486" } : {}}
        className="--theme-button"
        onClick={() => setTheme(!theme)}
      >
        <i className="uil uil-moon"></i>
      </button>
    </>
  );
};
