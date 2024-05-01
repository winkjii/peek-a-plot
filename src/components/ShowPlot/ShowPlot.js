import styles from "./ShowPlot.module.css";
import logo from "../../assets/logo.png";
import comment from "../../assets/comments.png";
import { db } from "../../firebase/firebase";
import {
  collection,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { setDoc, addDoc } from "firebase/firestore";
import { AuthContext } from "../../firebase/AuthContext";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../Toggle/ContextProvider";
import bookmark from "../../assets/bookmark.png";
import bookmarkBlack from "../../assets/bookmarked.png";

const ShowPlot = ({ plot, plotId }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [bookmarkId, setBookmarkId] = useState([]);
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { isDark } = useContext(ThemeContext);

  const { currentUser } = useContext(AuthContext);

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "plots", plotId, "likes", currentUser.uid));
      await updateDoc(doc(db, "plots", plotId), {
        like: likes.length - 1,
      });
    } else {
      await setDoc(doc(db, "plots", plotId, "likes", currentUser.uid), {
        userId: currentUser.uid,
      });
      await updateDoc(doc(db, "plots", plotId), {
        like: likes.length + 1,
      });
    }
  };
  // console.log(comments);

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "plots", plotId, "comments"),
      (snapshot) => {
        setComments(
          snapshot.docs.map((snapshot) => ({
            id: snapshot.id,
            data: snapshot.data(),
          }))
        );
      }
    );
    return () => {
      unSub();
    };
  }, [plotId]);

  const handleComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "plots", plotId, "comments"), {
      comment: input,
      uid: currentUser.uid,
      timestamp: serverTimestamp(),
    });
    setCommentBoxVisible(true);
    setInput("");
  };

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "plots", plotId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
    return () => {
      unSub();
    };
  }, [plotId]);

  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser.uid]);

  const handleBookmark = async () => {
    // e.preventDefault();
    if (bookmarked) {
      await deleteDoc(doc(db, "bookmarks", bookmarkId));
    } else {
      await addDoc(collection(db, "bookmarks"), {
        uid: currentUser.uid,
        timestamp: serverTimestamp(),
        plotId: plotId,
        name: plot.data.name,
        character: plot.data.character,
        plot: plot.data.plot,
        plotOwner: plot.data.plotOwner,
        plotOwnerId: plot.data.plotOwnerId,
        timeline: plot.data.timeline,
        like: plot.data.like,
      });
    }
  };

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "bookmarks"), (snapshot) =>
      setBookmarks(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      )
    );
    return () => {
      unSub();
    };
  }, [plotId]);

  useEffect(() => {
    console.log("click");
    setBookmarked(
      bookmarks.findIndex(
        (bookmark) =>
          bookmark.data.uid === currentUser?.uid &&
          bookmark.data.plotId === plotId
      ) !== -1
    );
    bookmarks.map((data) => setBookmarkId(data.id));
  }, [bookmarks, currentUser.uid]);

  // const handleBookmark = async (e) => {
  //   // e.preventDefault();
  //   if (bookmarked) {
  //     await deleteDoc(doc(db, "plots", plot.id, "bookmarks", currentUser.uid));
  //   } else {
  //     await setDoc(doc(db, "plots", plot.id, "bookmarks", currentUser.uid), {
  //       uid: currentUser.uid,
  //       timestamp: serverTimestamp(),
  //       plotId: plot.id,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const unSub = onSnapshot(
  //     collection(db, "plots", plot.id, "bookmarks"),
  //     (snapshot) => setBookmarks(snapshot.docs)
  //   );
  //   return () => {
  //     unSub();
  //   };
  // }, [plot.id]);

  // useEffect(() => {
  //   setBookmarked(
  //     bookmarks.findIndex((bookmark) => bookmark.id === currentUser?.uid) !== -1
  //   );
  // }, [bookmarks, currentUser.uid]);

  return (
    <div className={styles.container} data-theme={isDark ? "dark" : "light"}>
      <div key={plotId} className={styles.plotSummary}>
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
          <p className={styles.hashtag}>{plot.data?.hashtag}</p>
          {plot.data?.genre != null ? (
            <div className={styles.genreContainer}>
            {plot.data.genre[0] != null ? <p className={styles.genre}>{plot.data.genre[0]}</p> : null}
            {plot.data.genre[1] != null ? <p className={styles.genre}>{plot.data.genre[1]}</p> : null}
            {plot.data.genre[2] != null ? <p className={styles.genre}>{plot.data.genre[2]}</p> : null}
            </div>
          ) : null}

          {/* <div style={{width: }}> */}
          <div className={styles.action_buttons}>
            <div className={styles.like_comment}>
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
              <div
                className={styles.comment_button}
                onClick={() => {
                  setCommentOpen(!commentOpen);
                  setCommentBoxVisible(!commentBoxVisible);
                }}
              >
                {/* <div className={styles.comment_button} onClick={() => {setCommentBoxVisible(!commentBoxVisible)}}> */}
                {isDark ? (
                  <img
                    src={comment}
                    alt=""
                    className={styles.comment_icon_dark}
                  />
                ) : (
                  <img src={comment} alt="" className={styles.comment_icon} />
                )}
                <span className={styles.comments_amount}>
                  {comments.length}
                </span>
              </div>
            </div>
            <div className={styles.bookmark} onClick={() => handleBookmark()}>
              {isDark ? (
                <img
                  src={bookmarked ? bookmarkBlack : bookmark}
                  width={25}
                  className={styles.bookmarkDark}
                />
              ) : (
                <img src={bookmarked ? bookmarkBlack : bookmark} width={25} />
              )}
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
        {commentOpen > 0 && (
          <div className={styles.comment}>
            {comments
              .sort((a, b) => a.data.timestamp - b.data.timestamp)
              .map((c) => (
                <div>
                  <div>
                    <div className={styles.CommentWrapper}>
                      {/* <img src={logo} alt="" className={styles.logo1} /> */}
                      <div className={styles.commentInfo}>
                        <img src={logo} alt="" className={styles.logo1} />
                        <span className={styles.commentUsername}>
                          {currentUser.displayName}
                        </span>
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
              ))}
          </div>
        )}

        {commentBoxVisible && (
          <form onSubmit={handleComment} className={styles.commentBox}>
            <textarea
              type="text"
              placeholder="Write a comment ..."
              className={styles.commentInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={360}
            />
            <button
              type="submit"
              className={styles.commentPost}
              style={{
                fontSize: "15px",
                marginLeft: "20px",
                padding: "13px 10px",
              }}
            >
              Comment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ShowPlot;
