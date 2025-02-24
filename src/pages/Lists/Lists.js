import React, { useContext, useEffect, useState } from "react";
import styles from "./Lists.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import search_icon from "../../assets/search-b.png";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import EditPlot from "../../components/EditPlot/EditPlot";
import { ThemeContext } from "../../components/Toggle/ContextProvider";
import { Toggle } from "../../components/Toggle/Toggle";
import { AuthContext } from "../../firebase/AuthContext";


const Lists = () => {
  const { isDark } = useContext(ThemeContext);

  console.log("dark", isDark)

  const [plots, setPlots] = useState([]);

  const { currentUser } = useContext(AuthContext);
  
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

  // const filteredData = plots.filter((item) => (item.data.name.includes(searchTerm) || item.data.plot.includes(searchTerm) || item.data.character.includes(searchTerm) || item.data.timeline.includes(searchTerm) || item.data.plotOwner.includes(searchTerm)))
  const filteredData = plots.filter((item) => (
    (item.data.name.includes(searchTerm) || 
     item.data.plot.includes(searchTerm) || 
     item.data.character.includes(searchTerm) || 
     item.data.timeline.includes(searchTerm) || 
     item.data.plotOwner.includes(searchTerm)) &&
    (item.data.plotOwner === currentUser.displayName)
  ));
  

  return (
    <div className={styles.container} data-theme={isDark ? "dark" : "light"}>
      <Sidebar />
      <div className={styles.pageContainer}>
        <Header
          title={"Lists"}
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
      {filteredData.sort((a,b)=> b.data.timestamp - a.data.timestamp).map((p) => (
        <EditPlot key={p.id} plot={p} plotId={p.id}/>
      ))}
      </div>
    </div>
  );
};

export default Lists;

