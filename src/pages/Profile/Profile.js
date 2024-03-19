import React, { useContext, useState } from "react";
import styles from "./Profile.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import search_icon from "../../assets/search-b.png";
import img from "../../assets/logo.png";
import { Toggle } from "../../components/Toggle/Toggle";
import { ThemeContext } from "../../components/Toggle/ContextProvider";
import { AuthContext } from "../../firebase/AuthContext";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ButtonSemantic from "../../components/ButtonSemantic/ButtonSemantic";
import ButtonOutline from "../../components/ButtonOutline/ButtonOutline";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const {currentUser} = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

  const navigate = useNavigate()

  const [data, setData] = useState({
    username: currentUser.displayName,
    email: currentUser.email,
  })

  const handleChange=(e)=> {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateProfile(currentUser, {
      displayName: data.username,
      email: data.email
    });

    await setDoc(doc(db, "users", currentUser.uid), {
      uid: currentUser.uid,
      displayName: data.username,
      email: data.email
    });

    // const credential = EmailAuthProvider.credential(
    //   currentUser.email,
    // )

    // await reauthenticateWithCredential(currentUser, credential).then(
    //   async () => {
    //     await updateEmail(currentUser, data.email);
    //   }
    // )
    navigate("/home")
  }
  console.log(data);

  return (
    <div className={styles.container} data-theme={isDark ? "dark" : "light"}>
      <div className={styles.head}>
        <text className={styles.appName}>Peek-A-Plot</text>
        <div className={styles.profilePic}>
          <img src={img} width={110} />
        </div>
      </div>
      <div className="">
        <div className={styles.bottomContainer}>
          <div className={styles.inputContainer}>
            <text>Username</text>
            <input
              className={styles.input}
              name="username"
              placeholder={currentUser.displayName}
              // value={username}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <text>Email</text>
            <input
              className={styles.input}
              name="email"
              placeholder={currentUser.email}
              // value={username}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <text>Dark mode</text>
            <Toggle show={true}/>
          </div>
        </div>
        <div className={styles.button}><ButtonOutline onClick={() => navigate("/home")} title={"Cancle"} width={"160px"} margin={"0px 20px"}/><ButtonSemantic onClick={handleUpdate} title={"Save"} width={"160px"}/></div>
      </div>
    </div>
  );
};

export default Profile;
