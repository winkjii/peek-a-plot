import { useContext, useEffect } from "react";
import styles from "./Toggle.module.css";
import { ThemeContext } from "./ContextProvider";

export const Toggle = ({show}) => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const selectedTheme = localStorage.getItem("selectedTheme");
  const handleChange = () => {
    setIsDark(!isDark);
    console.log("themeT", isDark);
    localStorage.setItem("selectedTheme", isDark ? "light" : "dark");
  };

  if (selectedTheme === "dark") {
    setIsDark(true);
  }

  return (
    show ?
    <div className={styles.container}>
      <input
        type="checkbox"
        id="check"
        className={styles.toggle}
        onChange={handleChange}
        defaultChecked={selectedTheme === "dark"}
      />
      <label htmlFor="check"></label>
    </div> : ""
  );
  // const setDarkMode = () => {
  //     document.querySelector("body").setAttribute("data-theme", "dark");
  //     localStorage.setItem("selectedTheme", "dark")
  // }

  // const setLightMode = () => {
  //     document.querySelector("body").setAttribute("data-theme", "light");
  //     localStorage.setItem("selectedTheme", "light")
  // }

  // const selectedTheme = localStorage.getItem("selectedTheme");

  // if (selectedTheme === "dark") {
  //     setDarkMode();
  // }

  // const toggleTheme = (e) => {
  //     if (e.target.checked) setDarkMode();
  //     else setLightMode();
  // }
  // return (
  //     <div className={styles.container}>
  //         <input
  //             type="checkbox"
  //             id="check"
  //             className={styles.toggle}
  //             onChange={toggleTheme}
  //             defaultChecked={selectedTheme === "dark"}
  //         />
  //         <label htmlFor="check"></label>
  //     </div>
  // )
};
