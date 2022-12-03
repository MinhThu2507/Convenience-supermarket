import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// !firebase
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const AddProducts = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      productName: "",
      shortDesc: "",
      description: "",
      category: "",
      price: "",
      productImg: null,
    },
    validationSchema: Yup.object({
      productName: Yup.string("Must be string").required("Required"),
      shortDesc: Yup.string("Must be string")
        .max(50, "Maximum 50 characters")
        .required("Required"),
      description: Yup.string("Must be string").required("Required"),
      price: Yup.number("Must be number").required("Required"),
      productImg: Yup.mixed().required("Required"),
    }),
    onSubmit: ({

      productName,
      shortDesc,
      description,
      price,
      productImg,
      category,
    }) => {
      setLoading(true)
      // ! Add product to a firebase
      try {
        // * create firestore db
        const docRef = collection(db, "products");

        // * create storage db
        const storageRef = ref(storage, `productImages/${Date.now()}`);

        // * upload Image to db
        const uploadTask = uploadBytesResumable(storageRef, productImg);

        uploadTask.on(
          () => {
            toast.error("Images not uploaded");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await addDoc(docRef, {
                  productName: productName,
                  shortDesc,
                  description,
                  category,
                  price,
                  imgUrl: downloadURL,
                });
              }
            );
          }
        );
        setLoading(false)

        toast.success("Product successfully added !");
        navigate('/dashboard/all-products');
      } catch (error) {
        setLoading(false)

        toast.error("Product not added !");
      }
    },
  });

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {
              loading ? <h4 className="py-5">Loading......</h4> : (
                <>
                  <h4>Add Product</h4>
                  <Form onSubmit={formik.handleSubmit}>
                    <FormGroup className="form__group">
                      <span>Product Name</span>
                      <input
                        type="text"
                        placeholder="Double sofa"
                        name="productName"
                        value={formik.productName}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.productName ? (
                        <p className="text-danger text-start mt-2">
                          {formik.errors.productName}
                        </p>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <FormGroup className="form__group">
                      <span>Short Description</span>
                      <input
                        type="text"
                        placeholder="lorem....."
                        name="shortDesc"
                        value={formik.shortDesc}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.shortDesc ? (
                        <p className="text-danger text-start mt-2">
                          {formik.errors.shortDesc}
                        </p>
                      ) : (
                        ""
                      )}
                    </FormGroup>

                    <FormGroup className="form__group">
                      <span>Description</span>
                      <input
                        type="text"
                        placeholder="Description...."
                        name="description"
                        value={formik.description}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.description ? (
                        <p className="text-danger text-start mt-2">
                          {formik.errors.description}
                        </p>
                      ) : (
                        ""
                      )}
                    </FormGroup>
                    <div className="d-flex align-items-center justify-content-between gap-5">
                      <FormGroup className="form__group w-50">
                        <span>Price</span>
                        <input
                          type="number"
                          placeholder="$100"
                          name="price"
                          value={formik.price}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.price ? (
                          <p className="text-danger text-start mt-2">
                            {formik.errors.price}
                          </p>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                      <FormGroup className="form__group w-50">
                        <span>Category</span>
                        <select
                          className="w-100 p-2"
                          name="category"
                          value={formik.category}
                          onChange={formik.handleChange}
                        >
                          <option value="chair">Chair</option>
                          <option value="sofa">Sofa</option>
                          <option value="mobile">Mobile</option>
                          <option value="watch">Watch</option>
                          <option value="wireless">Wireless</option>
                        </select>
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup className="form__group">
                        <span>Product Image</span>
                        <input
                          type="file"
                          name="productImg"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "productImg",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        {formik.errors.productImg ? (
                          <p className="text-danger text-start mt-2">
                            {formik.errors.productImg}
                          </p>
                        ) : (
                          ""
                        )}
                      </FormGroup>
                    </div>
                    <button className="buy__btn btn">Add Product</button>
                  </Form>
                </>
              )
            }
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
