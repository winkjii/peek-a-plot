import ReactDropdown from "react-dropdown";
import styles from "./Dropdown.module.css";

const Dropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <ReactDropdown
      className={styles.genreContainer}
      controlClassName={styles.genreResult}
      menuClassName={styles.genreChoice}
      optionClassName={styles.genreOption}
      arrowClassName={styles.arrow}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Dropdown;
