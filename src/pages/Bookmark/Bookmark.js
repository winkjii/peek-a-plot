import { collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import ShowPlot from "../../components/ShowPlot/ShowPlot";
import { db } from "../../firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase/AuthContext";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../components/Toggle/ContextProvider";
import styles from "./Bookmark.module.css"

const Bookmarked = ({plot}) => {
  const [bookmarks, setBookmarks] = useState([]);
  const { isDark } = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
  var combinedData = []

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "bookmarks"), (snapshot) => {
        const fetchedBookmarks = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        setBookmarks(fetchedBookmarks)
    });
    return () => unSub();
  }, []);

  console.log("bookmark", bookmarks.sort((a,b)=> b.data.timestamp - a.data.timestamp))

  return (
    <div className={styles.bookmarkContainer} data-theme={isDark ? "dark" : "light"}>
      {bookmarks.sort((a,b)=> b.data.timestamp - a.data.timestamp).map((bookmark) =>
        bookmark.data.uid === currentUser.uid
          ? <ShowPlot plot={bookmark} plotId={bookmark.data.plotId}/>
          : null
      )}
    </div>
  );
};

const Bookmark = () => {
  const [plots, setPlots] = useState([]);
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "plots"), (snapshot) => {
      setPlots(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => unSub();
  }, []);

    return (
        <div className={styles.bookmarkContainer} data-theme={isDark ? "dark" : "light"}>
        <Header title="Your Bookmarked"/>
        {/* {plots.map((data) => {
            return (
                <> */}
                <Bookmarked/>
                {/* </>
            )
        })} */}
        </div>
    );
};

export default Bookmark;
