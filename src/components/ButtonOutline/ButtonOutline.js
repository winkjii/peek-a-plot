import { Link } from "react-router-dom";
import styles from "./ButtonOutline.module.css";

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
        }}
        onClick={onClick}
      >
        {title}
      </div>
  );
};

export default ButtonOutline;