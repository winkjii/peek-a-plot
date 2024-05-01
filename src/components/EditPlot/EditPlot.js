import styles from "./EditPlot.module.css";
import logo from "../../assets/logo.png";
import bin1 from "../../assets/bin.png";
import edit1 from "../../assets/edit.png";
import { db } from "../../firebase/firebase";
import {doc,deleteDoc,} from "firebase/firestore";
import { useContext } from "react";
import { ThemeContext } from "../Toggle/ContextProvider";
import { useNavigate } from "react-router-dom";


const EditPlot = ({ plot, plotId }) => {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate(); // เรียกใช้ useNavigate ในคอมโพเนนต์หรือ Hook ที่เป็นฟังก์ชันคอมโพเนนต์ของ React

  const handleDeletePlot = async (plotId) => {
    try {
      await deleteDoc(doc(db, "plots", plotId));
      console.log("Plot deleted successfully!");
    } catch (error) {
      console.error("Error deleting plot: ", error);
    }
  };

  const handleEditPlot = (plotId) => {
    // ใช้ navigate เพื่อเปลี่ยนเส้นทางไปยังหน้า EditPlot พร้อมส่งพารามิเตอร์ตามต้องการ
    navigate(`/edit-plot/${plotId}`);
  };

  return (
    <div className={styles.container} data-theme={isDark ? "dark" : "light"}>
      <div key={plotId} className={styles.plotSummary}>
        
        <div className={styles.container1}>
          <div className={styles.profile}>
            <img src={logo} alt="" className={styles.logo} />
            <h2 className={styles.username}>{plot.data.plotOwner}</h2>
          </div>

          <div className={styles.detail_plot}>
            <p>
              <b>Plot Name:</b>
              {plot.data.name}
            </p>
            <p>
              <b>Plot:</b> {plot.data.plot}
            </p>
            <p>
              <b>Characters:</b> {plot.data.character}
            </p>
            <p>
              <b>Timeline:</b> {plot.data.timeline}
            </p>
            <p className={styles.hashtag}>{plot.data?.hashtag}</p>
            {plot.data?.genre != null ? (
            <div className={styles.genreContainer}>
            {plot.data.genre[0] != null ? <p className={styles.genre}>{plot.data.genre[0]}</p> : null}
            {plot.data.genre[1] != null ? <p className={styles.genre}>{plot.data.genre[1]}</p> : null}
            {plot.data.genre[2] != null ? <p className={styles.genre}>{plot.data.genre[2]}</p> : null}
            </div>
          ) : null}
          </div>
        </div>
        

          <div className={styles.action_buttons}>
            <img
              src={edit1}
              alt="Edit Plot"
              className={styles.edit_button}
              onClick={() => handleEditPlot(plotId)}
            />
            <img
              src={bin1}
              alt="Delete Plot"
              className={styles.delete_button}
              onClick={() => handleDeletePlot(plotId)}
            />
          </div>
        </div>
      </div>
  );
};

export default EditPlot;




  



  

