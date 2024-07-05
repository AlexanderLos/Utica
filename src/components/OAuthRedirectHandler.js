import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const OAuthRedirectHandler = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user) {
          login(user);
          navigate('/map');
        }
      } catch (error) {
        console.error("Error handling OAuth redirect:", error);
      }
    };

    handleOAuthRedirect();
  }, [login, navigate, auth]);

  return <div>Loading...</div>;
};

export default OAuthRedirectHandler;
