import React from 'react';
import { useAuth } from './AuthContext';
import { signInWithGooglePopup } from '../utils/firebase.utils';
import { useNavigate } from 'react-router-dom';
import '../css/AuthPage.css';

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGooglePopup();
      if (user) {
        login(user);  // Use the login function
        navigate('/map');  // Use the navigate function to redirect
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="container">
      <h2>Welcome</h2>
      <div className="button-container">
        <button onClick={handleGoogleSignIn}>Continue with Google</button>
      </div>
      <div className="text">
        <h3>Welcome! Use Google to sign in or register.</h3>
      </div>
    </div>
  );
}

export default AuthPage;
