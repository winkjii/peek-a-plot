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

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <text className={styles.title}>Sign Up</text>
        <input
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={setUsername}
        />
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <input
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={setPassword}
          secureTextEntry
        />
        <input
          className={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          secureTextEntry
        />
        <ButtonSemantic title="Sign Up" onClick={handleSignUp} theme={'black'}/>
      </div>
    </div>
  );
};

export default SignUp