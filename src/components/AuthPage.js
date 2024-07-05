import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import '../css/AuthPage.css';

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const url = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=token&scope=email profile';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.openAuth(url, 'YOUR_REDIRECT_URI', {
          ephemeralWebSession: false,
        });
        if (result.type === 'success' && result.url) {
          const token = new URL(result.url).hash.split('&')[0].split('=')[1];
          const user = await signInWithGooglePopup(token);
          if (user) {
            login(user);
            navigate('/map'); 
          }
        }
      } else {
        window.location.href = url;
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
