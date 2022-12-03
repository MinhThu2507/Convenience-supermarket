// library
import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
// firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
// css
import "../assets/styles/login.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      file: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("Required!"),
      username: Yup.string()
        .min(2, "Mininum 7 characters")
        .max(15, "Maximum 15 characters")
        .required("Required!"),
      file: Yup.mixed().notRequired(),
    }),
    onSubmit: async ({ email, password, file, username }) => {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const storageRef = ref(storage, `images/${Date.now()}`);
        console.log(file.name)
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          (error) => {
            toast.error(error.message);
          },
          () => {
            // update user profile
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateProfile(user, {
                  displayName: username,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "users", user.uid), {
                  uid: user.uid,
                  displayName: username,
                  email,
                  photoURL: downloadURL,
                });
              }
            );
          }
        );
        setLoading(false);
        toast.success("Account created");
        navigate("/login");
      } catch (error) {
        setLoading(false);
        toast.error("Something went wrong");
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
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Sign Up</h3>
                <Form className="auth__form" onSubmit={formik.handleSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      name="username"
                      value={formik.values.username}
                      placeholder="Username"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.username ? (
                      <p className="text-danger text-start mt-2">
                        {formik.errors.username}
                      </p>
                    ) : (
                      ""
                    )}
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      name="email"
                      value={formik.values.email}
                      placeholder="Enter your email"
                      onChange={formik.handleChange}
                    />
                    {formik.errors.email ? (
                      <p className="text-danger text-start mt-2">
                        {formik.errors.email}
                      </p>
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
                      <p className="text-danger text-start mt-2">
                        {formik.errors.password}
                      </p>
                    ) : (
                      ""
                    )}
                    <FormGroup className="form__group">
                      <input id="file" name="file" type="file" onChange={(event) => {
                        formik.setFieldValue("file", event.currentTarget.files[0])
                      }} />
                      {formik.errors.file ? (
                        <p className="text-danger text-start mt-2">
                          {formik.errors.file}
                        </p>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                  </FormGroup>
                  <button type="submit" className="buy__btn auth__btn">
                    Create an Account
                  </button>
                  <p>
                    Already have an account?
                    <Link to={"/login"}> Login</Link>
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

export default SignUp;
