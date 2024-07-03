import { signInWithGooglePopup } from '../utils/firebase.utils';

const Login = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  }
  return (
    <div>
      <button onClick={logGoogleUser}>Log In With Google</button>
    </div>
  )
}

export default Login;