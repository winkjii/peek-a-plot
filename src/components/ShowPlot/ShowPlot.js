import styles from "./ShowPlot.module.css";
import logo from "../../assets/logo.png";
import { db } from "../../firebase/firebase";
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { setDoc } from "firebase/firestore";
import { AuthContext } from "../../firebase/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Toggle/ContextProvider";


const ShowPlot = ({ plot }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const { isDark } = useContext(ThemeContext);

  const { currentUser } = useContext(AuthContext);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "plots", plot.id, "likes", currentUser.uid));
    } else {
      await setDoc(doc(db, "plots", plot.id, "likes", currentUser.uid), {
        userId: currentUser.uid,
      });
    }
  };
  useEffect(() => {
      const unSub = onSnapshot(
        collection(db, "plots", plot.id, "likes"),
        (snapshot) => setLikes(snapshot.docs)
      );
      return () => {
        unSub();
      };
  }, [plot.id]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser.uid]);

  return (
    <div className={styles.container} data-theme={isDark? "dark": "light"}>
          <div key={plot.id} className={styles.plotSummary}>
            <div className={styles.profile}>
              <img src={logo} alt="" className={styles.logo} />
              <h2 className={styles.username}>{plot.data.plotOwner}</h2>
            </div>

            <div className={styles.detail_plot}>
              <p>
                <b>Plot Name:</b>
                {plot.data.name}
              </p>
              <p>
                <b>Plot:</b> {plot.data.plot}
              </p>
              <p>
                <b>Characters:</b> {plot.data.character}
              </p>
              <p>
                <b>Timeline:</b> {plot.data.timeline}
              </p>

              <div className={styles.like_button} onClick={() => likePost()}>
                <div className={styles.heart_bg}>
                  <div
                  className={`${styles.heart_icon} ${
                    liked ? styles.liked : ""
                  }`}
                  ></div>
                </div>
                <span className={styles.likes_amount}>{likes.length}</span>
              </div>
            </div>
          </div>
    </div>
  );
};

export default ShowPlot;
