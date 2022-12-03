// Library
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'

// Component
import Clock from '../components/UI/Clock'
import ProductsList from '../components/UI/ProductsList'
import Helmet from '../components/Helmet/Helmet'

// Services
import Services from '../services/Services'

// Data
// import products from '../assets/data/products'

//Image
import counterImg from '../assets/images/counter-timer-img.png'
import heroImg from '../assets/images/hero-img.png'

// Css 
import '../assets/styles/home.css'

// custom hook
import useGetData from '../hooks/useGetData'

const Home = () => {

  const { data: products, loading } = useGetData('products')

  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  const [wirelessProducts, setWirelessProducts] = useState([])
  const [mobileProducts, setMobileProducts] = useState([])
  const [popularProducts, setPopularProducts] = useState([])

  useEffect(() => {
    const filterTrendingProducts = products.filter((product) => product.category === 'chair')
    const filterBestSalesProducts = products.filter((product) => product.category === 'sofa')
    const filterMobileProducts = products.filter((product) => product.category === 'mobile')
    const filterWirelessProducts = products.filter((product) => product.category === 'wireless')
    const filterPopularProducts = products.filter((product) => product.category === 'watch')

    setTrendingProducts(filterTrendingProducts)
    setBestSalesProducts(filterBestSalesProducts)
    setMobileProducts(filterMobileProducts)
    setWirelessProducts(filterWirelessProducts)
    setPopularProducts(filterPopularProducts)

  }, [products])



  const year = new Date().getFullYear()

  return (
    <Helmet title={'Home'}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quo et aut necessitatibus minus ex omnis asperiores fugit
                  inventore ipsam vero.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className='buy__btn'>
                  <Link to='/shop'>
                    SHOP NOW
                  </Link>
                </motion.button>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg='12'>
              <h2 className="section__title text-center">
                Trending Products
              </h2>
            </Col>
            {
              loading ? <h5 className='fw-bold'>Loading...</h5> : (
                <ProductsList data={trendingProducts} />

              )
            }
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg='12'>
              <h2 className="section__title text-center">
                Best Sales
              </h2>
            </Col>
            {
              loading ? <h5 className='fw-bold'>Loading...</h5> : (
                <ProductsList data={bestSalesProducts} />

              )
            }
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg='6' md='12' className='count__down-col'>
              <div className="clock__top-content">
                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                <h3 className='text-white fs-6 mb-3'>Quality Armchair</h3>
              </div>
              <Clock />

              <motion.button whileTap={{ scale: 1.2 }} className="buy__btn store__btn">
                <Link to='/shop'>
                  Visit Store
                </Link>
              </motion.button>
            </Col>
            <Col lg='6' md='12' className='text-end counter__img'>
              <img src={counterImg} alt="" />
            </Col>

          </Row>
        </Container>
      </section>

      <section className="new__arrival">
        <Container>
          <Row>
            <Col lg='12' className=' text-center mb-5'>
              <h2 className="section__title">
                New Arrivals
              </h2>
            </Col>
            {
              loading ? <h5 className='fw-bold'>Loading...</h5> : (
                <ProductsList data={mobileProducts} />

              )
            }
            {
              loading ? <h5 className='fw-bold'>Loading...</h5> : (
                <ProductsList data={wirelessProducts} />
              )
            }

          </Row>
        </Container>
      </section>
      <section className="popular__category">
        <Container>
          <Row>
            <Col lg='12' className='mb-5 text-center'>
              <h2 className="section__title">
                Popular in Category
              </h2>
            </Col>
            {
              loading ? <h5 className='fw-bold'>Loading...</h5> : (
                <ProductsList data={popularProducts} />
                )
            }

          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home