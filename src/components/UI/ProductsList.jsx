import React from 'react'
import ProductCard from './ProductCard'

const ProductsList = ({data}) => {
  return (
    <>
       {data?.map((item, index) => {
        return <ProductCard item={item} key={index}/>
       })}

    </>
  )
}

export default ProductsList