import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Header.css"

const Header = () => {
  return (
    <div className='wrapper--header'>
        <h1>Header</h1>
        <nav className='container--nav'>
            <Link className='link' to="/">HOME</Link>
            <Link className='link' to="/cart">CART</Link>
        </nav>
    </div>
  )
}

export default Header