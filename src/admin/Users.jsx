import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'
// custom hook
import useGetData from '../hooks/useGetData'
import {db} from '../firebase.config'
import { doc, deleteDoc } from "firebase/firestore";const Users = () => {
    // Lấy dữ liệu từ firebase store có tên là users
    const {data: usersData, loading } = useGetData('users')
    
    const handleDeleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id))
        toast.success('Deleted user')
    }
  return (


    <section>
    <Container>
        <Row>
            <Col lg='12'>
                <h4 className='fw-bold'>Users</h4>
                <Col lg='12' className='pt-5'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? <h5 className='fw-bold pt-5'>Loading...</h5> : (
                                    <>
                                        {
                                            usersData?.map((user) => {
                                                return (
                                                    <tr key={user.id}>
                                                    <td><img src={user.photoURL} alt="" /></td>
                                                    <td>{user.displayName}</td>
                                                    <td>{user.email}</td>
                                                    <td><button className='btn btn-danger' onClick={() => {handleDeleteUser(user.uid)}}>Delete</button></td>
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
            </Col>

            
        </Row>
    </Container>
    </section>
  )
}

export default Users