import React from 'react'
import Link from 'next/link'
import Header from './components/header'


export default function Home() {
  return (
    <div>
      <Header></Header>
<div className='flex mt-20 flex-col p-10 gap-10'>
    <h1 className='font-bold self-center'>Welcome to Projects Repository</h1>
    <Link className=" shadow-lg rounded-lg bg-black text-white p-4 self-center "href="/login">Login</Link>
    </div>

    </div>
    
  )
}
