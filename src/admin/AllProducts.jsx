// library 
import React from 'react'
import { Container, Row, Col } from 'reactstrap'
// custom hook
import useGetData from '../hooks/useGetData'
// firebase 
import {db} from '../firebase.config'
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify'
const AllProducts = () => {

  // Lấy ra firestore db với store name là products 
  const { data: productsData, loading } = useGetData('products')
    
  // Hàm xử lý xoá sản phẩm 
  const handleDeleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id))
    toast.success('Deleted!')
  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? <h4 className='py-5 text-center'>Loading...</h4> : (
                    <>
                      {
                        productsData.map((item) => {
                          return (
                            <tr key={item.id}>
                              <td><img src={item.imgUrl} alt="" /></td>
                              <td>{item.productName}</td>
                              <td>{item.category}</td>
                              <td>${item.price}</td>
                              <td><button onClick={() => {handleDeleteProduct(item.id)}} className='btn btn-danger'>Delete</button></td>
                            </tr>
                          )
                        })
                      }
                    </>
                  )
                }
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllProducts