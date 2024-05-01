import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./EditPlotPage.module.css";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../firebase/AuthContext";
import { ThemeContext } from "../../components/Toggle/ContextProvider";
import { Toggle } from "../../components/Toggle/Toggle";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useParams } from "react-router-dom"; 

const EditPlot = () => {
  const { plotId } = useParams(); 
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const plotCollectionRef = doc(db, "plots", plotId);
  const { currentUser } = useContext(AuthContext);
  const [plotData, setPlotData] = useState(null); // State เก็บข้อมูล plot ที่จะแก้ไข
  const [updatedPlotName, setUpdatedPlotName] = useState("");
  const [updatedGenre, setUpdatedGenre] = useState([null, null, null]);
  const [updatedHashtag, setUpdatedHashtag] = useState("");
  const [updatedPlotDetail, setUpdatedPlotDetail] = useState("");
  const [updatedPlotCharacter, setUpdatedPlotCharacter] = useState("");
  const [updatedPlotTimeline, setUpdatedPlotTimeline] = useState("");

  const options = [
    { value: null, label: "ไม่ระบุ" },
    { value: "ลึกลับ (Mystery)", label: "ลึกลับ (Mystery)" },
    { value: "แฟนตาซี (Fantasy)", label: "แฟนตาซี (Fantasy)" },
    { value: "รักโรแมนติก (Romance)", label: "รักโรแมนติก (Romance)" },
    { value: "สืบสวนสอบสวน (Suspense)", label: "สืบสวนสอบสวน (Suspense)" },
    { value: "อิงประวัติศาสตร์ (Historical)", label: "อิงประวัติศาสตร์ (Historical)" },
    { value: "วิทยาศาสตร์ (Science Fiction)", label: "วิทยาศาสตร์ (Science Fiction)" },
    { value: "ระทึกขวัญ/สยองขวัญ (Thriller/Horror)", label: "ระทึกขวัญ/สยองขวัญ (Thriller/Horror)" },
  ];

  useEffect(() => {
    const fetchPlotData = async () => {
      try {
        const plotDocRef = doc(db, "plots", plotId);
        const plotSnapshot = await getDoc(plotDocRef);
        if (plotSnapshot.exists()) {
          const plotData = plotSnapshot.data();
          setPlotData(plotData);
          // เซ็ตค่า state ให้มีค่าเท่ากับข้อมูล plot ที่ดึงมาจาก Firebase
          setUpdatedPlotName(plotData.name || "");
          setUpdatedGenre(plotData.genre || [null, null, null]);
          setUpdatedHashtag(plotData.hashtag || "");
          setUpdatedPlotDetail(plotData.plot || "");
          setUpdatedPlotCharacter(plotData.character || "");
          setUpdatedPlotTimeline(plotData.timeline || "");
        } else {
          console.log("Plot not found");
        }
      } catch (error) {
        console.error("Error fetching plot data:", error);
      }
    };

    fetchPlotData();
  }, [currentUser]);

  const handleUpdatePlot = async () => {
    try {
      
      await updateDoc(plotCollectionRef, {
        name: updatedPlotName,
        genre: updatedGenre,
        hashtag: updatedHashtag,
        plot: updatedPlotDetail,
        character: updatedPlotCharacter,
        timeline: updatedPlotTimeline,
      });
      console.log("Plot updated successfully!");
      navigate("/lists");
    } catch (error) {
      console.error("Error updating plot:", error);
    }
  };

  return (
    <div className={styles.container} data-theme={isDark ? "dark" : "light"}>
    <Toggle />
      <Header title={"Your Plot"} />
      <div class={styles.form_container}>
        <label class={styles.title} htmlFor="title">
          Name
        </label>
        <label class={styles.describe}>
          ชื่อที่เข้าใจง่าย หรือสื่อถึงเนื้อหาของพล็อต
        </label>
        <textarea
          id="title"
          name="title"
          value={updatedPlotName}
          onChange={(e) => setUpdatedPlotName(e.target.value)}
          rows={8}
          maxLength="50"
        />
        <br />
        <label class={styles.title} htmlFor="genre">
          Genre
        </label>
        <label class={styles.describe}>
          ประเภท หรือหมวดหมู่ของพล็อต สามารถเลือกได้สูงสุด 3 หมวดหมู่
        </label>
        <div className={styles.genre}>
        <Dropdown options={options} onChange={(e) => setUpdatedGenre([e.value, updatedGenre[1], updatedGenre[2],])} value={updatedGenre[0]} placeholder={"ไม่ระบุ"}/>
        <Dropdown className={styles.genreContainer} controlClassName={styles.genreResult} menuClassName={styles.genreChoice} arrowClassName={styles.arrow} options={options} onChange={(e) => setUpdatedGenre([updatedGenre[0], e.value, updatedGenre[2]])} value={updatedGenre[1]} placeholder={"ไม่ระบุ"}/>
        <Dropdown className={styles.genreContainer} controlClassName={styles.genreResult} menuClassName={styles.genreChoice} arrowClassName={styles.arrow} options={options} onChange={(e) => setUpdatedGenre([updatedGenre[0], updatedGenre[1], e.value])} value={updatedGenre[3]} placeholder={"ไม่ระบุ"}/>
        </div>
        <br />
        <label class={styles.title} htmlFor="hashtag">
          Hashtag
        </label>
        <label class={styles.describe}>
          แฮชแท็กหรือแท็กเพิ่มเติมเกี่ยวกับพล็อต
        </label>
        <textarea
          id="hashtag"
          name="hashtag"
          value={updatedHashtag}
          onChange={(e) => setUpdatedHashtag(e.target.value)}
          rows={8}
          maxLength="250"
        />
        <br />
        <label class={styles.title} htmlFor="plot">
          The Plot
        </label>
        <label class={styles.describe}>
          จุดเริ่มต้น หรือปมต่างๆของเรื่อง เกิดอะไรขึ้น ที่ไหน อะไร อย่างไร
        </label>
        <textarea
          id="plot"
          name="plot"
          value={updatedPlotDetail}
          onChange={(e) => setUpdatedPlotDetail(e.target.value)}
          rows={13}
          maxLength="250"
        />
        <br />
        <label class={styles.title} htmlFor="characters">
          Character
        </label>
        <label class={styles.describe}>ชื่อ อายุ ลักษณะนิสัยของตัวละคร</label>
        <textarea
          id="characters"
          name="characters"
          value={updatedPlotCharacter}
          onChange={(e) => setUpdatedPlotCharacter(e.target.value)}
          rows={13}
          maxLength="250"
        />
        <br />
        <label class={styles.title} htmlFor="timeframe">
          Timeline
        </label>
        <label class={styles.describe}>
          ช่วงเวลาที่เกิดเหตุการณ์แต่ละเหตุการณ์ หรือปีที่เกิดเหตุการณ์ต่างๆ
        </label>
        <textarea
          id="timeframe"
          name="timeframe"
          value={updatedPlotTimeline}
          onChange={(e) => setUpdatedPlotTimeline(e.target.value)}
          rows={13}
          maxLength="250"
        />
        <br />
        <div className={styles.buttonContainer}>
          <button type="button" onClick={ handleUpdatePlot}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default EditPlot;




