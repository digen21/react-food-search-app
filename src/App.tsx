import ThemeButton from "./Components/Theme-Button/Theme-Button";
import "./App.css";

import HomePage from "./Pages/HomePage/HomePage";
import { createContext, useState } from "react";

//creating Context
//Providing Context
//Consuming Context

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className="App" style={theme ? { backgroundColor: "#feb300" } : {}}>
        <ThemeButton />
        <HomePage />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
