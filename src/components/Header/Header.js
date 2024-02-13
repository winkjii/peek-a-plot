import React from "react";
import styles from "./Header.module.css";

const Header = ({ title, component }) => {
  return (
    <div className={component ? styles.containerComponent : styles.container}>
    {console.log(component)}
      {title}
      {component}
    </div>
  );
};

export default Header;
