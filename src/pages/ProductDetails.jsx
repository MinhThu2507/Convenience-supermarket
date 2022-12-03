// library
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {addItem} from '../redux/slices/cartSlice'
import {toast} from 'react-toastify'
// data 
// import products from "../assets/data/products";
// css
import "../assets/styles/product-details.css";
// components
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ProductsList from '../components/UI/ProductsList'

//firebase 
import { db } from "../firebase.config";
import { doc, getDoc } from 'firebase/firestore'

// custom hook
import useGetData from "../hooks/useGetData";

const ProductDetails = () => {

  const { data: products } = useGetData('products')
  const [tab, setTab] = useState("desc");

  const [product, setProduct] = useState({})

  const [rating, setRating] = useState(null)
    // state for switch back and forth between review tab and description tab
  const reviewUser = useRef('');
  const reviewMsg = useRef('')
  const { id } = useParams();

  // const product = products.find((item) => item.id === id);
  const dispatch = useDispatch()

  const docRef = doc(db, 'products', id)

  useEffect(() => {
    const getProduct = async() => {
      const docSnap = await getDoc(docRef)

      if(docSnap.exists()){
        setProduct(docSnap.data())
      }
      else {
        console.log('No product')
      }
    }
    getProduct()
  }, [])

  const {
    imgUrl,
    price,
    productName,
    // avgRating,
    // reviews,
    shortDesc,
    description,
    category
  } = product;


  const relatedProduct = products.filter(product => product.category === category)
  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj = {
      author: reviewUserName,
      text: reviewUserMsg,
      rating
    }
    toast.success('Review submitted')
  }

  const handleAddToCart = () => {
    dispatch(addItem({
      id, 
      image: imgUrl,
      productName,
      price
    }))
    toast.success('Product added successfully')

  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [product])

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className="pt-5">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg="6">
              <div className="product__details ">
                <h2>{productName}</h2>
                <div
                  className="product__rating 
                      d-flex align-items-center gap-5 mb-3 mt-2"
                >
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i class="ri-star-half-s-line"></i>
                    </span>
                  </div>

                  <p>
                    {/* (<span>{avgRating}</span> ratings) */}
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">$ {price}</span>
                  <span>Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <motion.button whileTap={{ scale: 1.2 }} 
                               className="buy__btn"
                               onClick={handleAddToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  {/* Reviews ({reviews.length}) */}
                  Reviews
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="prodict__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {/* Render comments */}
                      {/* {reviews.map((review, index) => {
                        return (
                          <li key={index} className='mb-4'>
                            <h6>Minh Thu</h6>
                            <span>{review.rating} (rating)</span>
                            <p>{review.text}</p>
                          </li>
                        )
                      })} */}
                    </ul>
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="form__group">
                          <input type="text" 
                                 placeholder="Enter name" 
                                 ref={reviewUser}
                                 required
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span whileTap={{scale: 1.1}} onClick={() => setRating(1)}>
                            1
                            <i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale: 1.1}} onClick={() => setRating(2)}>
                            2
                            <i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale: 1.1}} onClick={() => setRating(3)}>
                            3
                            <i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale: 1.1}} onClick={() => setRating(4)}>
                            4
                            <i class="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span whileTap={{scale: 1.1}} onClick={() => setRating(5)}>
                            5
                            <i class="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea rows={4} 
                                    type="text" 
                                    placeholder="Review Message..." 
                                    ref={reviewMsg}
                                    required
                          />
                        </div>

                        <motion.button whileTap={{scale: 1.2}} type="submit" className="buy__btn">Submit</motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg='12' className="mt-5">
              <h2 className="related__title">
                You might also like
              </h2>
            </Col>
            <ProductsList data={relatedProduct} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
