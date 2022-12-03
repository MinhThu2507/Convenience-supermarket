import React from 'react'
import useAuth from '../hooks/useAuth'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = () => {
    // Check children is login or not if not => login page else children page
    const { currentUser } = useAuth()

    return currentUser ? <Outlet /> : <Navigate to='/login' />

}

export default ProtectedRoute