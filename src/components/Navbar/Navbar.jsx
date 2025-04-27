import React from 'react'
import { NavLink } from 'react-router-dom'
import DropDownList from '../DropDownList/DropDownList'


function Navbar() {


    return <>
    <nav className="navbar flex justify-between items-center content-baseline w-full border-b-1 border-gray-400 px-4 py-2 shadow">
        <h1 className='text-2xl font-bold'>E-commerce</h1>
        <div className="Navlinks">
            <ul className='flex justify-center items-center content-baseline'>
                <li className= 'px-2'><NavLink to={'/'}>Home</NavLink></li>
                <li className= 'px-2'><NavLink to={'/about'}>About</NavLink></li>
                
            </ul>
        </div>
        <div className="auth flex justify-center items-center content-baseline">
            <div className="auth flex border p-2 rounded-2xl">
                <button className= 'px-2 '><NavLink to={'/auth'}>Login<span className= 'px-1'>|</span>Signup</NavLink></button>
            </div>
            <div className="cart">
                <button id='FavBtn' className= 'px-2'><i className="fa-regular fa-heart text-2xl"></i><span id='favCount'></span></button>
                <button id='CartBtn' className= 'px-2'><i className="fa-solid fa-cart-shopping text-2xl"></i><span id='cartCount'></span></button>
            </div>
        </div>
            
    </nav>
            
    </>
        
    
}

export default Navbar
