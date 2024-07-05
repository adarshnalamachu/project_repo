import React from 'react'
import Header from "../components/header";


export default function Dashboard() {
  return (
    <div className='flex flex-col'>
        <Header></Header> 
        <div className='mt-20 p-2 m-2'>
            <h1 className='font-semibold text-base'>Dashboard: </h1>
        </div>   
        <div className='flex flex-col justify-between gap-10 w-10/12 self-center'>
        <div className='flex flex-col md:flex-row justify-between self-center gap-10 '> 
        <img className="w-96 h-48" src='./images/img1.jpg'/>
        <img className="w-96 h-48" src='./images/img2.jpg'/>
        </div> 
        <div className='flex flex-col md:flex-row justify-between self-center gap-10  '>
        <img className="w-96 h-48" src='./images/img3.jpg'/>
        <img className="w-96 h-48" src='./images/img4.jpg'/>
        </div>
        <div className='flex flex-col md:flex-row justify-between self-center gap-10  '>
        <img className="w-96 h-48" src='./images/img5.jpg'/>
        <img className="w-96 h-48" src='./images/img6.jpg'/>
        </div>
        </div>
        
        


    </div>
  )
}
