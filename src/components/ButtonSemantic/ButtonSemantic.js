import { Link } from "react-router-dom";
import "./ButtonSemantic.css";

const ButtonSemantic = ({
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
    <Link
      to={path ? path : null}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className={`buttonSemantic ${theme}`}
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
    </Link>
  );
};

export default ButtonSemantic;
