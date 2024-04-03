import styles from "./ShowPlot.module.css";
import logo from "../../assets/logo.png";
import comment from "../../assets/comments.png"
import { db } from "../../firebase/firebase";
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { setDoc, addDoc } from "firebase/firestore";
import { AuthContext } from "../../firebase/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Toggle/ContextProvider";


const ShowPlot = ({ plot }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);

  const { isDark } = useContext(ThemeContext);

  const { currentUser } = useContext(AuthContext);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "plots", plot.id, "likes", currentUser.uid));
      await updateDoc(doc(db, "plots", plot.id), {
        like: likes.length -1,
      });
    } else {
      await setDoc(doc(db, "plots", plot.id, "likes", currentUser.uid), {
        userId: currentUser.uid,
      });
      await updateDoc(doc(db, "plots", plot.id), {
        like: likes.length +1,
      });
    }
  };
  // console.log(comments);

  useEffect(()=>{
    const unSub = onSnapshot(collection(db, "plots", plot.id, "comments"), (snapshot) => {
      setComments(snapshot.docs.map((snapshot)=>({
        id: snapshot.id,
        data: snapshot.data(),
      }))
      );
    });
    return ()=>{
      unSub();
    }
  },[plot.id]);

  const handleComment = async (e) => {
    e.preventDefault();
    
    await addDoc(collection(db, "plots", plot.id, "comments"),{
      comment: input,
      uid: currentUser.uid,
      timestamp: serverTimestamp()
    });
    setCommentBoxVisible(true)
    setInput("");
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

              {/* <div style={{width: }}> */}
              <div className={styles.action_buttons}>
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
                {/* </div> */}
                <div className={styles.comment_button} onClick={() => {setCommentOpen(!commentOpen);setCommentBoxVisible(!commentBoxVisible) }}>
                {/* <div className={styles.comment_button} onClick={() => {setCommentBoxVisible(!commentBoxVisible)}}> */}
                  <img src={comment} alt="" className={styles.comment_icon}/>
                  <span className={styles.comments_amount}>{comments.length}</span>
                </div>
                {/* <div>
                  <span 
                    className={styles.postCommentText} 
                    onClick={()=>setCommentOpen(!commentOpen)}
                    >comments</span>
                </div> */}
              </div>
            {/* </div> */}

            </div>
            {commentOpen > 0 && <div className={styles.comment}>
              {comments
              .sort((a, b) => a.data.timestamp - b.data.timestamp)
              .map((c) => (
                <div>
                  <div>
                    <div className={styles.CommentWrapper}>
                      {/* <img src={logo} alt="" className={styles.logo1} /> */}
                      <div className={styles.commentInfo}>
                        <img src={logo} alt="" className={styles.logo1} />
                        <span className={styles.commentUsername}>{currentUser.displayName}</span>
                        {/* <span className={styles.commentUsername}>{currentUser.displayName}</span>
                        <p className={styles.commentText}>{c.data.comment}</p> */}
                        {/* <p className={styles.commentContent}>
                          <img src={logo} alt="" className={styles.logo1} />
                          <span className={styles.commentUsername}>{currentUser.displayName}</span>: {c.data.comment}
                        </p> */}
                      </div>
                      <div className={styles.commentInText}>
                        <p className={styles.commentText}>{c.data.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }</div>
            }

            {commentBoxVisible && (
              <form onSubmit={handleComment} className={styles.commentBox}>
                <textarea
                  type="text"
                  placeholder="Write a comment ..."
                  className={styles.commentInput}
                  value={input}
                  onChange={(e)=> setInput(e.target.value)}
                  maxLength={360}
                />
                <button type="submit" className={styles.commentPost} style={{ fontSize: "15px", marginLeft: "20px", padding: "13px 10px" }}>Comment</button>
              </form>
            )} 
            
          </div>
    </div>
  );
};

export default ShowPlot;
