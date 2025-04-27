import React from 'react'

function Login() {
    return <>
    <form action="" className='flex justify-center flex-col items-center w-full'>
        <div>
        <div id='email' className='py-2'>
            <label htmlFor="">Email :</label>
            <input type="email" placeholder='Email...' name="" id="" className='w-full border-1 border-gray-600 hover:shadow-2xl rounded transition-all duration-300 ease'/>
        </div>
        <div id='password' className='py-2'>
            <label htmlFor="">Password : </label>
            <input type="password" placeholder='password...' name="" id="" className='w-full border-1 border-gray-600 hover:shadow-2xl rounded transition-all duration-300 ease' />
        </div></div>
    </form>
    </>
        
    
}

export default Login
