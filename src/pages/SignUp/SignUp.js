import React, { useState } from 'react';
import styles from './SignUp.module.css'
import ButtonSemantic from '../../components/ButtonSemantic/ButtonSemantic';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log('Signing up with:', username, email, password);
    // Implement your sign-up logic here
  };

  const handleSignIn = () => {
    console.log('Navigating to sign in screen...');
    // Implement navigation logic to the sign in screen
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <text className={styles.title}>Sign Up</text>
        <div className={styles.inputContainer}>
        <text className={styles.inputLabel}>Username</text>
        <input
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={setUsername}
        />
        </div>
        <div className={styles.inputContainer}>
        <text className={styles.inputLabel}>Email</text>
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={setEmail}
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
          onChange={setPassword}
          secureTextEntry
        />
        </div>
        <div className={styles.inputContainer}>
        <text className={styles.inputLabel}>Confirm Password</text>
        <input
          className={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          secureTextEntry
        />
        </div>
        <ButtonSemantic title="Sign Up" onClick={handleSignUp} theme={'black'}/>
        <div className={styles.signin} onClick={handleSignIn}>Sign in</div>
      </div>
    </div>
  );
};

export default SignUp