//import React from "react";
import React, { useContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import search_icon from "../../assets/search-b.png";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { getDocs, collection, updateDoc, doc, onSnapshot } from "firebase/firestore";
import Plot from "../Plot/Plot";
import { setDoc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../firebase/AuthContext";

const Home = ({plot}) => {
  const location = useLocation();
  // const formData = location.state?.formData || {};

  console.log("plot", plot)

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const { currentUser } = useContext(AuthContext)
  const [likedPosts, setLikedPosts] = useState();


  const [indexTarget, setIndexTarget] = useState();

  const [results, setResults] = useState([]);

  // console.log('index', index)

  const [plots, setPlots] = useState([]);
  const [plotId, setPlotId] = useState()
  const plotCollectionRef = collection(db, "plots");
  const likesCollectionRef = collection(db, "likes");
  


  // const updateLiked = async (postId, liked) => {
  //   try {
  //     const plotRef = doc(db, "plots", postId);
  //     const plotDoc = await getDoc(plotRef);
  
  //     if (plotDoc.exists()) {
  //       const currentLikes = plotDoc.data().like || 0;
  //       const updatedLikes = liked ? currentLikes + 1 : currentLikes - 1;
  
  //       await updateDoc(plotRef, { like: updatedLikes });
  
  //       // เพิ่ม postId เข้าไปใน state ของ likedPosts หากยังไม่มีอยู่ในนั้น
  //       if (liked && !likedPosts.includes(postId)) {
  //         setLikedPosts([...likedPosts, postId]);
  //       } else if (!liked && likedPosts.includes(postId)) {
  //         // ลบ postId ออกจาก state ของ likedPosts หากมีอยู่ในนั้น
  //         setLikedPosts(likedPosts.filter(id => id !== postId));
  //       }
  //     } else {
  //       console.log("Plot not found");
  //     }
  //   } catch (error) {
  //     console.error("Error updating likes:", error);
  //   }
  // };
  
  // useEffect(() => {
  //   // if (plot && plot.id) { // ตรวจสอบว่า plot ไม่ใช่ null หรือ undefined และมี property id
  //     const unSub = onSnapshot(
  //       collection(db, "plots", likedPosts, "likes"),
  //       (snapshot) => setLikes(snapshot.docs)
  //     );
  //     return () => {
  //       unSub();
  //     };
  // }, [likedPosts]);

  // console.log("likeId", likedPosts)

  // console.log("like", likedPosts)
  // console.log("user", currentUser)
  


  useEffect(() => {
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser.uid]);

  // useEffect(() => {
  //   if (currentUser) {
  //     setLiked(likes.some((like) => like.id === currentUser.uid));
  //   }
  // }, [likes, currentUser]);
  
  

  const likePost = async (id) => {
    if (liked) {
      await delete(doc(db, "plots", id, "likes", currentUser.uid));
    } else {
      await setDoc(doc(db, "plots", id, "likes", currentUser.uid), {
        userId: currentUser.uid,
      });
      setLikedPosts(id)
    }
  };

  // const likePost = async () => {
  //   if (!currentUser) {
  //     // ถ้าไม่มีผู้ใช้ล็อกอิน ไม่ดำเนินการต่อ
  //     return;
  //   }
  
  //   try {
  //     const likesRef = collection(db, "plots", plot.id, "likes");
  //     const userLike = await getDoc(doc(likesRef, currentUser.uid));
  
  //     if (userLike.exists()) {
  //       // User already liked this post, do nothing
  //       return;
  //     }
  
  //     // Add a new like for the current user
  //     await setDoc(doc(likesRef, currentUser.uid), { userId: currentUser.uid });
  //   } catch (error) {
  //     console.error("Error liking post:", error);
  //   }
  // };
  
  
  // const getPlotList = async () => {
  //   //READ THE DATA
  //   // SET THE PLOT LIST
  //   try {
  //     const data = await getDocs(plotCollectionRef);
  //     const filteredData = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setPlotList(filteredData);
  //     console.log({ filteredData });

      
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  
  // useEffect(() => {
  //   getPlotList();
  // }, []);

  // useEffect(()=>{
  //   const unSub = onSnapshot(collection(db, "plots"), (snapshot) => {
  //     setPlots(snapshot.docs.map(doc=>({id: doc.id, data: doc.data()})))
  //   });
  // },[]);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "plots"), (snapshot) => {
      setPlots(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    });
    return () => unSub();
  }, []);

// console.log("plotList",plotList)
  
  // const updateLiked = async (id, like) => {
  //   toggleLiked(id, like);
  //   setLikeCount(like)
  //   console.log(likeCount)
  //   console.log(like)
  // };

  // const toggleLiked = async (id, like) => {
  //   const likeDoc = doc(db, "plots", id);
  //   setLiked(!liked);
  //   if (!liked) {
  //     await updateDoc(likeDoc, { like: like+1 });
  //     // getPlotList();
  //     // setLikeCount(likeCount + 1);
  //   } else {
  //     await updateDoc(likeDoc, { like: like-1 });
  //     // setLikeCount(likeCount - 1);
  //   }
  //   getPlotList();
  // };

  
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // const filteredData = plotList.filter((item) => (item.plotOwner.includes(searchTerm) || item.name.includes(searchTerm) || item.plot.includes(searchTerm) || item.character.includes(searchTerm) || item.timeline.includes(searchTerm)))

  return (
    <div className={styles.container}>
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

        {plots.sort((a,b)=> b.data.timestamp - a.data.timestamp).map((plot, index) => (
          <div key={plot.id} className={styles.plotSummary} >
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

              <div
                className={styles.like_button}
                onClick={() => {
                    likePost(plot.id); // เรียกใช้ฟังก์ชัน likePost เพื่อทำการไลค์โพสต์
                    // const handleLike = () => {
                  //   plots.map((data) => {setPlotId(data.id)}); // กำหนด plotId โดยใช้ข้อมูลจาก state plots
                  // }
                }}
                // className={`${styles.like_button} ${likedPosts.includes(plot.id) ? styles.liked : ""}`}
                // className={styles.like_button}
                // onClick={() => {
                //   setLiked(!liked); // สลับสถานะการกด (liked)
                //   updateLiked(plot.id, !liked);
                // }}
              >
                <div className={styles.heart_bg}>
                  <div
                  onClick={() => {
                    setIndexTarget(index)
                  }}
                    className={`${styles.heart_icon} ${
                      liked && (index == indexTarget) ? styles.liked : ""
                    }`}
                   ></div>
                </div>
                <span className={styles.likes_amount}>{likes.length}</span>
                {console.log("likes", likes)}
              </div>
            </div>
            {/* <p><b>Plot Name:</b> {formData && formData.title && formData.title.includes(searchTerm) ? formData.title : ""}</p>
          <p><b>Plot:</b> {formData && formData.plot && formData.plot.includes(searchTerm) ? formData.plot : ""}</p>
          <p><b>Characters:</b> {formData && formData.characters && formData.characters.includes(searchTerm) ? formData.characters : ""}</p>
          <p><b>Timeline:</b> {formData && formData.timeframe && formData.timeframe.includes(searchTerm) ? formData.timeframe : ""}</p> */}
          </div>
        ))}
        {/* </div> */}
        {/* </Sidebar> */}
      </div>
    </div>
  );
};

export default Home;
