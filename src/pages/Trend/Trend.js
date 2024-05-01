import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import Header from "../../components/Header/Header";
import styles from "./Trend.module.css";
import { ThemeContext } from "../../components/Toggle/ContextProvider";
import ShowPlot from "../../components/ShowPlot/ShowPlot";
// import ListItem from "../../components/ListItem/ListItem";

const ListItem = ({ index, plot }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      {index < 10 && plot.data.like > 0 ? (
        <>
        <div className={styles.listItem} onClick={() => setShow(!show)}>
          <div className={styles.rankNumber}>#{index + 1}</div>
          <div className={styles.textContainer}>
            <text className={styles.titleText}>{plot.data.name}</text>
            <text className={styles.likesText}>{plot.data.like} likes</text>
          </div>
        </div>
        <div className={styles.plotDetail}>{show ? (<ShowPlot plot={plot} plotId={plot.id}/>) : ""}</div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

const TrendingList = () => {
  const [trendingTopics, setTrendingTopics] = useState([]);
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    const plotCollectionRef = collection(db, "plots");
    const fetchDocs = async () => {
      try {
        const querySnapshot = await getDocs(plotCollectionRef);
        let topics = querySnapshot.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));

        // setPlots(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))

        // const queryLike = await

        // Sort topics by likes in descending order
        topics = topics.sort((a, b) => b.data.like - a.data.like);

        setTrendingTopics(topics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className={styles.container} data-theme={isDark ? "dark" : "light"}>
      <Header title={"Trending"} />
      {console.log(trendingTopics)}
      {trendingTopics.map((topic, index) => (
        <ListItem
          key={topic.id}
          plot={topic}
          index={index}
        />
      ))}
    </div>
  );
};

export default TrendingList;
