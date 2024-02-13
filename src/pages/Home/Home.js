import React from "react";
import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import search_icon from '../../assets/search-b.png'

const Home = () => {
  return (
    <Sidebar>
      <Header
        title={"Home"}
        component={
          <div className={styles.searchBox}>
            <img src={search_icon} alt="" width={20}/>
            <input type="text" placeholder="search" />
          </div>
        }
      />
      Home page
    </Sidebar>
  );
};

export default Home;
