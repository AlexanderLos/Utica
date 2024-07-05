import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { signInWithGooglePopup } from '../utils/firebase.utils';

const OAuthRedirectHandler = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token'); 
      if (token) {
        try {
          const user = await signInWithGooglePopup(token); 
          if (user) {
            login(user);
            navigate('/map'); 
          }
        } catch (error) {
          console.error("Error handling OAuth redirect:", error);
        }
      } else {
        console.error("No token found in URL");
      }
    };

    handleOAuthRedirect();
  }, [login, navigate]);

  return <div>Loading...</div>;
};

export default OAuthRedirectHandler;
