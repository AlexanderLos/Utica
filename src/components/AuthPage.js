import { signInWithGooglePopup } from '../utils/firebase.utils';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom'; 
import '../css/AuthPage.css';

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); 

  const handleGoogleSignIn = async () => {
    const user = await signInWithGooglePopup();
    if (user) {
      login(user);
      navigate('/map'); 
    }
  }

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
