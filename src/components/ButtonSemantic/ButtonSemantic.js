import { Link } from "react-router-dom";
import styles from "./ButtonSemantic.module.css";
import { useContext } from "react";
import { ThemeContext } from "../Toggle/ContextProvider";

const ButtonSemantic = ({
  title,
  onClick,
  path,
  theme,
  color,
  width,
  height,
  margin,
  radius,
  fontWeight,
  fontSize,
}) => {
  const { isDark } = useContext(ThemeContext);

  return (
    <Link
      to={path ? path : null}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className={styles.buttonSemantic}
        data-theme={isDark ? "dark" : "light"}
        style={{
          width: width ? width : 110,
          height: height ? height : 40,
          margin: margin,
          borderRadius: radius,
          fontWeight: fontWeight,
          fontSize: fontSize,
          backgroundColor: theme ? theme : "black",
          color: color ? color : "white",
        }}
        onClick={onClick}
      >
        {title}
      </div>
    </Link>
  );
};

export default ButtonSemantic;
