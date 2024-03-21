import { Link } from "react-router-dom";
import styles from "./ButtonOutline.module.css";
import { useContext } from "react";
import { ThemeContext } from "../Toggle/ContextProvider";

const ButtonOutline = ({
  title,
  onClick,
  path,
  theme,
  width,
  height,
  margin,
  radius,
  fontWeight,
  fontSize,
}) => {

  const { isDark } = useContext(ThemeContext);

  return (
      <div
        className={styles.buttonOutline}
        style={{
          width: width ? width : 110,
          height: height ? height : 40,
          margin: margin,
          borderRadius: radius,
          fontWeight: fontWeight,
          fontSize: fontSize,
          // border
        }}
        data-theme={isDark ? "dark" : "light"}
        onClick={onClick}
      >
        {title}
      </div>
  );
};

export default ButtonOutline;