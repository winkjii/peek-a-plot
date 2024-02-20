import React, { useState } from 'react';
import styles from './SignUp.module.css'
import ButtonSemantic from '../../components/ButtonSemantic/ButtonSemantic';
import { auth } from "../../firebase/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate('/sign-in')
      console.log(userCredential)
    }).catch((error) => {
      console.log(error);
    })
    // Implement your sign-up logic here
  };

  const handleSignIn = () => {
    console.log('Navigating to sign in screen...');
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
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          secureTextEntry
        />
        </div>
        <div className={styles.inputContainer}>
        <text className={styles.inputLabel}>Confirm Password</text>
        <input
          className={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          secureTextEntry
        />
        </div>
        <ButtonSemantic title="Sign up" onClick={handleSignUp} theme={'black'}/>
        <div className={styles.signin} onClick={handleSignIn}>Sign in</div>
      </div>
    </div>
  );
};

export default SignUp