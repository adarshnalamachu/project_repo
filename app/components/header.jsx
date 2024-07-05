"use client"

import React, { useState } from 'react';
import { SearchOutlined, MenuOutlined, UserOutlined, BellOutlined, CloseOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {

  const router = useRouter()

  const [clicked, setClicked] = useState(false);
  const [pclicked,setPclicked] =useState(false)

  const clickHandler = () => {
    setClicked(!clicked);
  };

//   const mclickHandler = (url) => {
// router.push({url})  };

  const handleProfile = () => {
    setTimeout(  ()=>{
      setPclicked(true);
    }  
    ,)
  };

  const handleProfile2 = () => {
    setTimeout(  ()=>{
      setPclicked(false);
    }  
    ,)
  };

  const pmenu =[{
    name:"Logout",
    url:"/"
  }]

  const menu=[{name:"Home",
    url:"/dashboard",
  },
  {name:"Projects",
    url:"/projects",
  },
]

  return (
    <div className="relative z-10 ">   
      <div className=" h-15 md:h-auto bg-nav flex flex-row top-0 justify-between items-center w-full shadow-md fixed px-2">
        <div className={`${!clicked ? "left-0 opacity-100" : "left-full opacity-0"} md:hidden text-white`} onClick={clickHandler}> 
          <MenuOutlined className="text-xl" /> 
        </div>
        <div className="ml-4 pr-3 md:block ">  
        <img className=' w-34 h-12 p-2' src='https://www.mind-graph.com/logo.png'></img>     
       </div>
       <div className='flex flex-row justify-between gap-52'> 
       <div className="hidden md:flex flex-row gap-2">  
          {menu.map((item,index)=>(
                      <Link key={index} href={item.url} className="text-white rounded-md text-sm self-center px-2 py-1 gap-2  hover:text-blue-700">{item.name}</Link>

          ))}

        </div>
        <div className='text-white self-center relative' onMouseEnter={handleProfile} >
          <  UserOutlined />
          {pclicked && (
          <div className='absolute right-0 text-green-500'>
            {pmenu?.map((item,index)=>(
              <Link key={item.name} href="/" onMouseEnter={handleProfile} onMouseLeave={handleProfile2} className="block rounded-md bg-bluee w-full px-2 py-1 text-center text-white hover:bg-viol hover:text-black">
              {item.name}
            </Link>
            ))}
            
          </div>)}
          </div>
       </div>
        
      </div>  
      <div className={`${clicked ? "left-0 opacity-100" : "-left-full opacity-0"} fixed top-0 rounded-md w-32 h-100 bg-gray-200 flex flex-col gap-2 items-stretch p-6 transition-all duration-700 ease-in-out md:hidden z-20`}>
        <div className="flex justify-between items-center mb-6">         
          <div className="text-xl font-bold">Menu</div>                    
          <CloseOutlined onClick={clickHandler} className="text-xl" />      
        </div>    

        <Link className={`text-black bg-white border-0 py-2 hover:text-gray-700 transform transition-transform duration-500 ${clicked ? 'translate-y-0 opacity-100 delay-100' : 'translate-y-4 opacity-0'}`} href="/">Home</Link>
        <Link  className={`text-black bg-white border-0 py-2 hover:text-gray-700 transform transition-transform duration-800 ${clicked ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-4 opacity-0'}`} href="/projects">Projects</Link>
      </div>  
    </div>
  );
}

