import React, { useState } from "react";
import styles from "./SignIn.module.css";
import ButtonSemantic from "../../components/ButtonSemantic/ButtonSemantic";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    console.log("Signing in with:", email, password);
    // Implement your sign-in logic here
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <text className="title">Sign In</text>
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={setPassword}
          secureTextEntry
        />
        <ButtonSemantic
          title="Sign In"
          onClick={handleSignIn}
          theme={"black"}
          fontWeight={"bold"}
        />
        <text className={styles.forgot}>Forgot Password?</text>
      </div>
    </div>
  );
};

export default SignIn;
