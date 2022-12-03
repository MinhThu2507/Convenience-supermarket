import React, { useState } from 'react'
import CommonSection from '../components/UI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import '../assets/styles/shop.css'
import ProductsList from '../components/UI/ProductsList'
import useGetData from "../hooks/useGetData";
import { useEffect } from 'react'

const Shop = () => {

  const { data: products, loading } = useGetData('products')

  const [productData, setProductData] = useState(products)

  // filter product by category
  const handleFilter = (e) => {
    const { value } = e.target

    if (value) {
      const filteredProducts = products.filter(item => item.category === `${value}`)
      setProductData(filteredProducts)
    }
  }

  useEffect(() => {
    setProductData(products)
  },[products])

  console.log(productData)
  // search product by name
  const handleSearch = (e) => {
    const { value } = e.target

    const searchedProducts = products.filter(
      item => item.productName.toLowerCase().includes(value.toLowerCase()))

    setProductData(searchedProducts)

  }

  return (
    <Helmet title='Shop'>
      <CommonSection title='Products' />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value='sofa'>Sofa</option>
                  <option value='mobile'>Mobile</option>
                  <option value='chair'>Chair</option>
                  <option value='watch'>Watch</option>
                  <option value='wireless'>Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6'>
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value='ascending'>Ascending</option>
                  <option value='descending'>Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search__box">
                <input type="text" placeholder='Search....' onChange={handleSearch} />
                <span><i className="ri-search-line"></i></span>
              </div>
            </Col>
          </Row>
        </Container>

      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {
              loading ? <h5 className='fw-bold'>Loading...</h5> : (
                <>
                  {productData.length === 0
                    ? <h1 className='text-center fs-4'>No products are found</h1>
                    : <ProductsList data={productData} />
                  }
                </>
              )
            }
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Shop