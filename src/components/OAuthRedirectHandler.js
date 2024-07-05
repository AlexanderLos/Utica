import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { signInWithGooglePopup } from '../utils/firebase.utils'; // Ensure this function can handle the token

const OAuthRedirectHandler = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token'); // Adjust this based on how the token is returned
      if (token) {
        try {
          const user = await signInWithGooglePopup(token); // Adjust this to handle the token correctly
          if (user) {
            login(user);
            navigate('/map'); // Redirect to the desired route after sign-in
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
