//import React from "react";
import React, { useState } from "react";
import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import search_icon from "../../assets/search-b.png";
import logo from "../../assets/logo.png";

const Home = () => {
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

  return (
    <Sidebar>
      <Header
        title={"Home"}
        component={
          <div className={styles.searchBox}>
            <img src={search_icon} alt="" width={20} />
            <input type="text" placeholder="search" />
          </div>
        }
      />
      <div className={styles.plotSummary}>
        <div className={styles.profile}>
          <img src={logo} alt="" className={styles.logo} />
          <h2 className={styles.username}>Username</h2>
        </div>
        <div className={styles.detail_plot}>
          <p>Plot Name: </p>
          <p>Plot: </p>
          <p>Characters: </p>
          <p>Timeline: </p>
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
