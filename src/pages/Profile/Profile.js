import React from "react";
import styles from "./Profile.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import search_icon from '../../assets/search-b.png'

const Profile = () => {
    return (
        <Sidebar>
        <Header
          title={"Profile"}
          component={
            <div className={styles.searchBox}>
              <img src={search_icon} alt="" width={20}/>
              <input type="text" placeholder="search" />
            </div>
          }
        />
      </Sidebar>
    );
  };

export default Profile