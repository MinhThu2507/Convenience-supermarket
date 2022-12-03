// library
import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.config'
import { toast } from 'react-toastify'
// css
import "../assets/styles/login.css";

const Login = () => {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
    }),
    onSubmit: async ({ email, password }) => {
      setLoading(true)

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user)
        
        setLoading(false)
        toast.success('Succesfully signed in')
        navigate('/checkout')
      } catch (error) {
        setLoading(false)
        toast.error(error.message)
      }
    },
  });

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center ">
                <h5 className="fw-bold">Loading....</h5>
              </Col>
            ) : (<Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Login</h3>
              <Form className="auth__form" onSubmit={formik.handleSubmit}>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? (
                    <p className="text-danger text-start mt-2">{formik.errors.email}</p>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password ? (
                    <p className="text-danger text-start mt-2">{formik.errors.password}</p>
                  ) : (
                    ""
                  )}
                </FormGroup>
                <button type="submit" className="buy__btn auth__btn">
                  Login
                </button>
                <p>
                  Don't have an account?
                  <Link to={"/signup"}> Create an account?</Link>
                </p>
              </Form>
            </Col>

            )}

          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
