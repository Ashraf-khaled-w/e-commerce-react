import React from 'react'
import Products from '../Products/Products'



function Home() {
    return <>
    <div className="search flex justify-center py-4"> 
    <input type="text" name="" placeholder="Search" id="search" className='w-[50%] p-3 border-1 rounded-2xl' />
    <button className='hover:cursor-pointer'><i className="fa-solid fa-magnifying-glass text-3xl ms-2"></i></button>
    </div>
    <div className="container">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            <Products/>
        </div>
    </div>
    </>
        
    
}

export default Home
