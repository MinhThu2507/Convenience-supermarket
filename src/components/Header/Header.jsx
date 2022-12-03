// library
import React, { useRef, useEffect } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { Container, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
// data
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
// css
import './header.css'
// custom hook
import useAuth from '../../hooks/useAuth'
//firebase
import { auth } from '../../firebase.config'


const nav__link = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    },
]

const Header = () => {
    const profileActions = useRef(null)
    const { currentUser } = useAuth()

    const { totalQuantity } = useSelector((state) => state.cart)

    const headerRef = useRef(null)
    const menuRef = useRef(null)
    const navigate = useNavigate()

    const stickyHeaderFunc = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky__header')
            } else {
                headerRef.current.classList.remove('sticky__header')
            }
        })
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast.success('Logout successfully')
                navigate('/home')
            })
            .catch((error) => {
                toast.error(error.message)
            })
    }

    useEffect(() => {
        stickyHeaderFunc()

        return () => window.removeEventListener('scroll', stickyHeaderFunc)

    }, [])

    const menuToggle = () => menuRef.current.classList.toggle('active__menu')

    const handleNavigateToCart = () => {
        navigate('/cart')
    }

    const handleToggleProfileAction = () => profileActions.current.classList.toggle('show__profileActions')
    return (
        <header className="header" ref={headerRef}>
            <Container>
                <Row>
                    <div className="nav__wrapper">
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <div>
                                <h1>Multimart</h1>
                            </div>
                        </div>
                        <div className="navigation" ref={menuRef} onClick={menuToggle}>
                            <ul className="menu" >
                                {nav__link.map((item, index) => {
                                    return (
                                        <li className="nav__item" key={index}>
                                            <NavLink to={item.path}
                                                className={(navClass) => navClass.isActive ? 'nav__active' : ''}
                                            >
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="nav__icons">
                            <span className="fav__icon">
                                <i className="ri-heart-line"></i>
                                <span className='badge'>1</span>
                            </span>
                            <span className='cart__icon' onClick={handleNavigateToCart}>
                                <i className="ri-shopping-bag-line" />
                                <span className='badge'>{totalQuantity}</span>
                            </span>

                            <div className='profile'>
                                <motion.img whileTap={{ scale: 1.1 }} src={currentUser?.photoURL ? currentUser.photoURL : userIcon} alt=""
                                    onClick={handleToggleProfileAction} />
                                <div className="profile__actions" ref={profileActions}
                                    onClick={handleToggleProfileAction}>
                                    {
                                        currentUser ? <span onClick={handleLogout}>Log out</span> :
                                            <div className='d-flex align-items-center justify-content-center flex-column '>
                                                <Link to={'/signup'}>Sign up</Link>
                                                <Link to={'/login'}>Login</Link>
                                                <Link to={'/dashboard'}>Dashboard</Link>

                                            </div>
                                    }
                                </div>
                            </div>
                            <div className="mobile__menu">
                                <span onClick={menuToggle}>
                                    <i className="ri-menu-line"></i>
                                </span>
                            </div>
                        </div>

                    </div>
                </Row>
            </Container>
        </header>
    )
}

export default Header