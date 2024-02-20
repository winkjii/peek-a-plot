import React, { useState } from "react";
import styles from "./SignIn.module.css";
import ButtonSemantic from "../../components/ButtonSemantic/ButtonSemantic";
import { auth } from "../../firebase/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/home');
        }
      })
      console.log(userCredential)
    }).catch((error) => {
      console.log(error);
    })
    // console.log("Signing in with:", email, password);
    // Implement your sign-in logic here
  };

  const handleForgotPassword = () => {
    console.log("Navigating to forgot password screen...");
    // Implement navigation logic to the forgot password screen
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <text className={styles.title}>Sign in</text>
        <div className={styles.inputContainer}>
          <text className={styles.inputLabel}>Email</text>
          <input
            type="email"
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
            secureTextEntry
          />
        </div>
        <ButtonSemantic
          title="Sign in"
          onClick={handleSignIn}
          theme={"black"}
          fontWeight={700}
          fontSize={14}
          width={180}
          height={32}
        />
        <div className={styles.forgot} onClick={handleForgotPassword}>
          Forgot Password?
        </div>
      </div>
    </div>
  );
};

export default SignIn;
