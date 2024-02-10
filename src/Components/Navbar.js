import React from 'react'
import './Navbar.css'

import search_icon from '../assets/search-b.png'


const Navbar = () => {
  return (
    <div className='navbar'>
      
      <div className='text_home'>
        <p>Home</p>
      </div>
      <div className='search-box'>
        <img src={search_icon} alt=''/>
        <input type='text' placeholder='search'/>
      </div>

    </div>
  )
}

export default Navbar
