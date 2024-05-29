import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/Login.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="container">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          const users = JSON.parse(localStorage.getItem('users')) || [];
          const user = users.find(user => user.email === values.email && user.password === values.password);
          if (user) {
            login(user);
            navigate('/map');
          } else {
            alert('Invalid email or password');
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="errorMessage" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="errorMessage" />
            </div>
            <div className="inputBoxButton">
              <button type="submit" disabled={isSubmitting}>Log In</button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="text">
        <h3>Need to make an account? <a href="/register">Register</a></h3>
      </div>
    </div>
  );
}

export default Login;
