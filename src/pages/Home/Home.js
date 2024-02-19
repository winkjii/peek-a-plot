//import React from "react";
import React, { useState } from "react";
import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import search_icon from "../../assets/search-b.png";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const formData = location.state?.formData || {};

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const toggleLiked = () => {
    setLiked(!liked);
    if (!liked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  

  return (
    <Sidebar>
      <Header 
        title={"Home"}
        component={
          <div className={styles.searchBox}>
            <img src={search_icon} alt="" width={20} />
            <input 
              type="text" 
              placeholder="search" 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        }
      />
      <div className={styles.plotSummary}>
        <div className={styles.profile}>
          <img src={logo} alt="" className={styles.logo} />
          <h2 className={styles.username}>Username</h2>
        </div>
        <div className={styles.detail_plot}>
          <p><b>Plot Name:</b> {formData && formData.title && formData.title.includes(searchTerm) ? formData.title : ""}</p>
          <p><b>Plot:</b> {formData && formData.plot && formData.plot.includes(searchTerm) ? formData.plot : ""}</p>
          <p><b>Characters:</b> {formData && formData.characters && formData.characters.includes(searchTerm) ? formData.characters : ""}</p>
          <p><b>Timeline:</b> {formData && formData.timeframe && formData.timeframe.includes(searchTerm) ? formData.timeframe : ""}</p>
        </div>

        <div className={styles.like_button} onClick={toggleLiked}>
          <div className={styles.heart_bg}>
            <div
              className={`${styles.heart_icon} ${liked ? styles.liked : ""}`}
            ></div>
          </div>
          <span className={styles.likes_amount}>{likeCount}</span>
        </div>
      </div>
    </Sidebar>
  );
};

export default Home;
