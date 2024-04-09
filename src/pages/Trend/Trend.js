import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { getDocs, collection, onSnapshot } from "firebase/firestore";
import Header from "../../components/Header/Header";
import styles from "./Trend.module.css";
import { ThemeContext } from "../../components/Toggle/ContextProvider";
// import ListItem from "../../components/ListItem/ListItem";

const ListItem = ({ index, name, likes }) => {
  return (
    <>
      {index < 10 && likes > 0 ? (
        <div className={styles.listItem}>
          <div className={styles.rankNumber}>#{index + 1}</div>
          <div className={styles.textContainer}>
            <text className={styles.titleText}>{name}</text>
            <text className={styles.likesText}>{likes} likes</text>
          </div>
        </div>
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
          ...doc.data(),
          id: doc.id,
        }));

        // const queryLike = await

        // Sort topics by likes in descending order
        topics = topics.sort((a, b) => b.like - a.like);

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
      {trendingTopics.map((topic, index) => (
        <ListItem
          key={topic.id}
          name={topic.name}
          likes={topic.like}
          id={topic.id}
          index={index}
        />
      ))}
    </div>
  );
};

export default TrendingList;
