import { createContext, useContext, useReducer, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({children, theme }) => {
    const [isDark, setIsDark] = useState(theme)

    console.log("theme", theme)

    // const selectedTheme = localStorage.getItem("selectedTheme");
    // localStorage.setItem("selectedTheme", isDark ? "light" : "dark");
    
    // if (selectedTheme !== "dark") {
    //     setIsDark(false);
    //   }
    console.log("provider", isDark)
    return (
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider