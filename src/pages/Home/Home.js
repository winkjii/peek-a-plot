//import React from "react";
import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import search_icon from "../../assets/search-b.png";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";

const Home = ({plots}) => {
  const location = useLocation();
  // const formData = location.state?.formData || {};

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState([]);

  const [indexTarget, setIndexTarget] = useState();

  const [results, setResults] = useState([]);

  // console.log('index', index)

  const [plotList, setPlotList] = useState([]);
  const [plotId, setPlotId] = useState()
  const plotCollectionRef = collection(db, "plots");
  
  const getPlotList = async () => {
    //READ THE DATA
    // SET THE PLOT LIST
    try {
      const data = await getDocs(plotCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlotList(filteredData);
      console.log({ filteredData });

      
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    getPlotList();
  }, []);

 
  
  const updateLiked = async (id, like) => {
    toggleLiked(id, like);
    setLikeCount(like)
    console.log(likeCount)
    console.log(like)
  };

  const toggleLiked = async (id, like) => {
    const likeDoc = doc(db, "plots", id);
    setLiked(!liked);
    if (!liked) {
      await updateDoc(likeDoc, { like: like+1 });
      // getPlotList();
      // setLikeCount(likeCount + 1);
    } else {
      await updateDoc(likeDoc, { like: like-1 });
      // setLikeCount(likeCount - 1);
    }
    getPlotList();
  };

  
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredData = plotList.filter((item) => (item.plotOwner.includes(searchTerm) || item.name.includes(searchTerm) || item.plot.includes(searchTerm) || item.character.includes(searchTerm) || item.timeline.includes(searchTerm)))

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.pageContainer}>
        <Header
          title={"Home"}
          component={
            <div className={styles.searchBox}>
              <img src={search_icon} alt="" width={20} />
              <input
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          }
        />

        {filteredData.map((plot, index) => (
          <div className={styles.plotSummary}>
            <div className={styles.profile}>
              <img src={logo} alt="" className={styles.logo} />
              <h2 className={styles.username}>{plot.plotOwner}</h2>
            </div>
            <div className={styles.detail_plot}>
              <p>
                <b>Plot Name:</b>
                {plot.name}
              </p>
              <p>
                <b>Plot:</b> {plot.plot}
              </p>
              <p>
                <b>Characters:</b> {plot.character}
              </p>
              <p>
                <b>Timeline:</b> {plot.timeline}
              </p>
              <div
                className={styles.like_button}
                onClick={() => updateLiked(plot.id, plot.like)}
              >
                <div className={styles.heart_bg}>
                  <div
                  onClick={() => {
                    setIndexTarget(index)
                  }}
                    className={`${styles.heart_icon} ${
                      liked && (index == indexTarget) ? styles.liked : ""
                    }`}
                   ></div>
                </div>
                <span className={styles.likes_amount}>{plot.like}</span>
              </div>
            </div>
            {/* <p><b>Plot Name:</b> {formData && formData.title && formData.title.includes(searchTerm) ? formData.title : ""}</p>
          <p><b>Plot:</b> {formData && formData.plot && formData.plot.includes(searchTerm) ? formData.plot : ""}</p>
          <p><b>Characters:</b> {formData && formData.characters && formData.characters.includes(searchTerm) ? formData.characters : ""}</p>
          <p><b>Timeline:</b> {formData && formData.timeframe && formData.timeframe.includes(searchTerm) ? formData.timeframe : ""}</p> */}
          </div>
        ))}
        {/* </div> */}
        {/* </Sidebar> */}
      </div>
    </div>
  );
};

export default Home;
