//import React from "react";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import search_icon from "../../assets/search-b.png";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ShowPlot from "../../components/ShowPlot/ShowPlot";
import { ThemeContext } from "../../components/Toggle/ContextProvider";
import { Toggle } from "../../components/Toggle/Toggle";

const Home = () => {
  const { isDark } = useContext(ThemeContext);

  console.log("dark", isDark)

  const [plots, setPlots] = useState([]);
  
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "plots"), (snapshot) => {
      setPlots(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    });
    return () => unSub();
  }, []);
  
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredData = plots.filter((item) => (item.data.name.includes(searchTerm) || item.data.plot.includes(searchTerm) || item.data.character.includes(searchTerm) || item.data.timeline.includes(searchTerm) || item.data.plotOwner.includes(searchTerm)))

  return (
    <div className={styles.container} data-theme={isDark ? "dark" : "light"}>
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
    <Toggle/>

        {filteredData.map((p) => (
          <ShowPlot key={plots.id} plot={p}/>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
