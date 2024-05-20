import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../css/Registration.css';
import image from '../css/Regispic.png';

const RegisterSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short.')
        .max(14, 'Too Long.')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .max(16, 'Password is too long - should be 16 chars maximum.')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required')
});

const Registration = () => {
    return (
        <div className="container">
            <h2 className="h2">Register</h2>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="inputBox">
                            <Field type="text" name="username" placeholder="Username" />
                            <ErrorMessage name="username" component="div" className="errorMessage" />
                        </div>
                        <div className="inputBox">
                            <Field type="email" name="email" placeholder="Email" />
                            <ErrorMessage name="email" component="div" className="errorMessage" />
                        </div>
                        <div className="inputBox">
                            <Field type="password" name="password" placeholder="Password" />
                            <ErrorMessage name="password" component="div" className="errorMessage" />
                        </div>
                        <div className="inputBox">
                            <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                            <ErrorMessage name="confirmPassword" component="div" className="errorMessage" />
                        </div>
                        <div className="inputBoxButton">
                            <button type="submit" disabled={isSubmitting}>Register</button>
                        </div>
                    </Form>
                )}
            </Formik>
            <div className="text">
                <h3>Already have an account? <a href="/">Log in</a></h3>
            </div>
        </div>
    );
};

export default Registration;
