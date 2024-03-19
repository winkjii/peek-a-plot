import React from "react";
import styles from "./Header.module.css";

const Header = ({ title, component }) => {
  return (
    <div className={component ? styles.containerComponent : styles.container}>
    {/* {console.log(component)} */}
      <div className={styles.title}>{title}</div>
      {component}
    </div>
  );
};

export default Header;
