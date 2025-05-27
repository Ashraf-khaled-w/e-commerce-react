import React from 'react'

function Footer() {
    return <>
        <footer className='h-[40vh] bg-black text-white flex flex-wrap justify-around items-center content-center mt-2'>
        <ul className='text-xl text-center'>
            <li className='font-bold'>Support</li>
            <li><a href="mailto:ashraf.khaled.w@gmail.com" className='hover:underline hover:text-blue-600 hover:underline-offset-4 transition-all duration-300 ease'>ashraf.khaled.w@gmail.com</a></li>
            <li><a href="tel:+201093856925" className='hover:underline hover:text-blue-600 hover:underline-offset-4 transition-all duration-300 ease'>+201093856925</a></li>
        </ul>
        <ul className='text-xl flex flex-wrap justify-around items-center content-center'>
        <li className='font-bold basis-[100%] text-center'>Follow us</li>
        <li><a href="https://www.facebook.com/ashrafkhaled.w/" target='_blank'><i className="fa-brands fa-facebook text-3xl hover:text-blue-600 transition-all duration-300 ease "></i></a></li>
        <li><a href="https://x.com/Ashrafkhaledw" target="_blank" ><i className="fa-brands fa-square-x-twitter text-3xl hover:text-blue-600 transition-all duration-300 ease"></i></a></li>
        <li><a href="https://github.com/Ashraf-khaled-w" target="_blank"><i className="fa-brands fa-github text-3xl hover:text-blue-600 transition-all duration-300 ease"></i></a></li>
        </ul>
        <h2 className='basis-[100%] text-center'>&copy; All rights reserved by Ashraf 2025</h2>
        </footer>
    </>
        
    
}

export default Footer
