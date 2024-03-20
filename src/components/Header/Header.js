import React, { useContext } from "react";
import styles from "./Header.module.css";
import { ThemeContext } from "../Toggle/ContextProvider";

const Header = ({ title, component }) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={component ? styles.containerComponent : styles.container} data-theme={isDark ? "dark" : "light"}>
    {/* {console.log(component)} */}
      <div className={styles.title}>{title}</div>
      {component}
    </div>
  );
};

export default Header;
