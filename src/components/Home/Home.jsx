// g:\Web projects\e-commerce react\e-commerce-react\src\components\Home\Home.jsx
import React from 'react'
import Products from '../Products/Products'

function Home() {
    return <>
    <div className="search flex justify-center py-4">
    <input type="text" name="" placeholder="Search" id="search" className='w-[50%] p-3 border-1 rounded-2xl' />
    <button className='hover:cursor-pointer'><i className="fa-solid fa-magnifying-glass text-3xl ms-2"></i></button>
    </div>
    {/* Use Tailwind's container class which centers itself */}
    <div className="container mx-auto px-4"> {/* Added mx-auto and padding */}
        {/* Removed the unnecessary flex wrapper */}
        <Products/>
    </div>
    </>
}

export default Home
