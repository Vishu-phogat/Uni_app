import React from 'react'
import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form action="" className='flex flex-col gap-4'>
        <input type="text" placeholder='username'  id='username' className='bg-slate-100 p-3 rounded-lg' />
        <input type="text" placeholder='Email'  id='email' className='bg-slate-100 p-3 rounded-lg' />
        <input type="text" placeholder='Password'  id='password' className='bg-slate-100 p-3 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>Sign Up</button>
      </form>
      <div className='flex gap-4 mt-4'>
        <p>Have an Account?</p>
        <Link to='/sign-in'><span className='text-blue-500'>Sign In</span></Link>
      </div>
    </div>
  )
}
