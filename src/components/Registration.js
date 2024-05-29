import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import '../css/Login.css';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters long'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  return (
    <div className="container">
      <h2>Register</h2>
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(values, { setSubmitting }) => {
          const users = JSON.parse(localStorage.getItem('users')) || [];
          users.push({ email: values.email, password: values.password });
          localStorage.setItem('users', JSON.stringify(users));
          alert('Registration successful!');
          login({ email: values.email }); // Log in the user
          navigate('/map'); // Navigate to map page
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
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="errorMessage" />
            </div>
            <div className="inputBoxButton">
              <button type="submit" disabled={isSubmitting}>Register</button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="text">
        <h3>Already have an account? <a href="/Login">Log In</a></h3>
      </div>
    </div>
  );
}

export default Register;
