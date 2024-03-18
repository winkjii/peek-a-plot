import React, { useState } from "react";
import styles from "./SignUp.module.css";
import ButtonSemantic from "../../components/ButtonSemantic/ButtonSemantic";
import { auth, db, storage } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import img from "../../assets/logo.png"

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, "usersImages/"+username);

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          setError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user, {
              username,
              photoURL: downloadURL, // นำ downloadURL จากการอัปโหลดรูปภาพเข้ามาด้วย
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              username,
              email,
              photoURL: downloadURL, // นำ downloadURL จากการอัปโหลดรูปภาพเข้ามาด้วย
            });

            setDoc(doc(db,"usersPosts",res.user.uid), {messages: []});
          });
        }
      );
      navigate("/sign-in");
      console.log(res.user)
    } catch (error) {
      setError(true);
    }
    // const res = await createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     console.log(userCredential);
    //     updateProfile(auth.currentUser.uid, {
    //       username,
    //     });

    //     setDoc(doc(db, "users", auth.currentUser.uid), {
    //       uid: auth.currentUser.uid,
    //       username,
    //       // email,
    //     });

    //     navigate("/sign-in");
    //     console.log(userCredential);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // // Implement your sign-up logic here
  };

  const handleSignIn = () => {
    navigate("/sign-in");
    // console.log("Navigating to sign in screen...");
    // Implement navigation logic to the sign in screen
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <text className={styles.title}>Sign up</text>
        <div className={styles.inputContainer}>
          <text className={styles.inputLabel}>Username</text>
          <input
            className={styles.input}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputContainer}>
          <text className={styles.inputLabel}>Email</text>
          <input
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </div>
        <div className={styles.inputContainer}>
          <text className={styles.inputLabel}>Password</text>
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            secureTextEntry
          />
        </div>
        <div className={styles.inputContainer}>
          <text className={styles.inputLabel}>Confirm Password</text>
          <input
            type="password"
            className={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            secureTextEntry
          />
        </div>
        <ButtonSemantic
          title="Sign up"
          onClick={handleSignUp}
          theme={"black"}
        />
        <div className={styles.signin} onClick={handleSignIn}>
          Sign in
        </div>
      </div>
    </div>
  );
};

export default SignUp;
