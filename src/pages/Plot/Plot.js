// import React from 'react'
import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./Plot.module.css";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { getDocs, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../../firebase/AuthContext";
import Home from "../Home/Home";


const Plot = () => {
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>;

  // const [currentUser,setCurrentUser] = useState();
  // console.log(currentUser)
  const [plotList, setPlotList] = useState([]);

  const navigate = useNavigate();
  const plotCollectionRef = collection(db, "plots");
  const userCollectionRef = collection(db, "users");
  const { currentUser } = useContext(AuthContext);

  // New Plot
  const [newPlotName, setNewPlotName] = useState("");
  const [newPlotDetail, setNewPlotDetail] = useState("");
  const [newPlotCharacter, setNewPlotCharacter] = useState("");
  const [newPlotTimeline, setNewPlotTimeline] = useState("");
  const [currentUserUsername, setCurrentUserUsername] = useState("");


  // useEffect(() => {
  //   const getPlotList = async () => {
  //     //READ THE DATA
  //     // SET THE PLOT LIST
  //     try {
  //       const data = await getDocs(plotCollectionRef);
  //       const filteredData = data.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //       }));
  //       setPlotList(filteredData);
  //       console.log({filteredData});
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getPlotList();
  // }, []);

  // useEffect(() => {
  //   const getUser = async () => {
  //     //READ THE DATA
  //     // SET THE PLOT LIST
  //     try {

  //       console.log('maiwai', auth.currentUser.uid)
  //       const user = await getDocs(userCollection);
  //       const userData = user.docs.map((doc) => ({
  //         ...doc.data(),
  //         // id: doc.id,
  //       }));
  //       userData.map((data) => {
  //         console.log('data', data.uid)
  //         if (auth.currentUser.uid == data.uid) {
  //           setCurrentUser(data.username)
  //         }
  //       })
  //       console.log("userData",{userData});
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUser();
  // }, []);
  
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const querySnapshot = await getDocs(userCollectionRef);
        querySnapshot.forEach((doc) => {
          if (doc.id === currentUser.uid) {
            setCurrentUserUsername(doc.data().username);
          }
        });
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, [currentUser, userCollectionRef]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(plotCollectionRef, {
        name: newPlotName,
        plot: newPlotDetail,
        character: newPlotCharacter,
        timeline: newPlotTimeline,
        like: 0,
        plotOwner: currentUserUsername, // ใช้ currentUser.uid เป็นเจ้าของพล็อต
        timestamp: new Date(),
      });
      navigate("/home");
      <Home plot = {plotCollectionRef}/>
    } catch (err) {
      console.error(err);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //       await addDoc(plotCollectionRef, {
  //         name: newPlotName,
  //         plot: newPlotDetail,
  //         character: newPlotCharacter,
  //         timeline: newPlotTimeline,
  //         like: 0,
  //         plotOwner: currentUser.uid,
  //       });
  //       // <Home plots = {plotCollectionRef}/>
  //       navigate('/home');
  //       // console.log(newPlotName)
  //   // navigate('/home')
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const handleSubmit = async () => {
  //   try {
  //       await addDoc(collection(db, "plotCollectionRef"), {
  //         name: newPlotName,
  //         plot: newPlotDetail,
  //         character: newPlotCharacter,
  //         timeline: newPlotTimeline,
  //         like: 0,
  //         plotOwner: currentUser.uid,
  //       });

  //       <Home plots = {plotCollectionRef}/>
  //       // console.log(newPlotName)
  //   navigate('/home')
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className={styles.container}>
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
          value={newPlotName}
          onChange={(e) => setNewPlotName(e.target.value)}
          rows={8}
          maxLength="200"
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
          value={newPlotDetail}
          onChange={(e) => setNewPlotDetail(e.target.value)}
          rows={13}
          maxLength="1820"
        />
        <br />
        <label class={styles.title} htmlFor="characters">
          Character
        </label>
        <label class={styles.describe}>ชื่อ อายุ ลักษณะนิสัยของตัวละคร</label>
        <textarea
          id="characters"
          name="characters"
          value={newPlotCharacter}
          onChange={(e) => setNewPlotCharacter(e.target.value)}
          rows={13}
          maxLength="1820"
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
          value={newPlotTimeline}
          onChange={(e) => setNewPlotTimeline(e.target.value)}
          rows={13}
          maxLength="1820"
        />
        <br />
        <div className={styles.buttonContainer}>
          <button type="submit" onClick={handleSubmit}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default Plot;
