import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../css/Login.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email Is Required.'),
  password: Yup.string().required('Password Is Required.')
});

function Login() {
  return (
    <div className="container">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
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
        <h3>Already have an account? <a href="/">Log in</a></h3>
      </div>
    </div>
  );
}

export default Login;
