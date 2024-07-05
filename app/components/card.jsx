"use client"
import Link from 'next/link'
import React from 'react'
import { useState,useRef,useEffect } from 'react';
import { EllipsisOutlined, CloseCircleOutlined } from '@ant-design/icons';
import "../components/card.css";
import { projects } from '../services/projects';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function Card(props) {
  const [error,setError] =useState("")
  const [response,setResponse] =useState("")
  const {id,pname,mname,sdate,edate,display}= props
  const {oid,opname,omname,osdate,oedate,odisplay}= props

  const [adddata, setAdddata] = useState({
    apname: pname,
    amname: mname,
    asdate: sdate,  
    aedate: edate,
  });
  const [menuOpen, setMenuOpen] = useState(false); 
  const [main, setMain] = useState(false); 

const menuRef = useRef(null);
// localStorage.setItem("")
  const toggleMPopup=()=>{
    setMain(!main)
  }

  const edata={
    epname: opname===adddata?.apname ? null:adddata?.apname,
    emname: omname===adddata?.amname ? null : adddata?.amname,
    esdate: osdate===adddata?.asdate ? null : adddata?.asdate,  
    eedate: oedate===adddata?.aedate ? null : adddata?.aedate,

  }
  const editPro= async()=>{

    const payload = {
        "id": id,
        "projectName": edata.epname, 
        "projectManagerName":edata.emname,
        "projectDescription": null,
        "startDate": edata.esdate,
        "endDate": edata.eedate
    }
    console.log("payload",payload);
    try {
      const res = await projects.editProject(payload)
      setResponse(res.data);   
      setMain(!main);    
      setError(null);  
      display()       
    } catch (err) { 
      if(err.response && err.response.data && err.response.data.errors ) {
        setError( err.response.data?.errors[0].errorMessage );

      }
      else {
          setError("Editing Failed")
      }
      setResponse(null);
    }
  }

  const Deletehandler= async()=>{
    try{
      const res= await projects.deleteProject(pname)
      setMenuOpen(false)
      display() 
    }
    catch (err) { 
      if(err.response && err.response.data && err.response.data.errors ) {
        setError( err.response.data?.errors[0].errorMessage );
      }
      else {
          setError("Deleting Failed")
      }
      setResponse(null);
    }
  }


   

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdddata({
      ...adddata,
      [name]: value,
    });
  };

 


  return (
    <div className='relative card flex flex-col  p-4 py-10 gap-6 w-60  shadow-md rounded-lg ' >
         <div className="absolute top-2 right-2">
            
        <button
          onClick={toggleMenu}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        >
          <EllipsisOutlined />
        </button>
        {menuOpen && (
          <div 
            ref={menuRef}
            className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow-lg"
          >
            <button onClick={toggleMPopup} className="block w-full px-2 py-1 text-center text-gray-700 hover:bg-gray-100">
              Edit
            </button>
            <button onClick={Deletehandler} className="block w-full px-2 py-1 text-center text-gray-700 hover:bg-gray-100">
              Delete
            </button>
          </div>
        )}
        {main && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="flex flex-col bg-white rounded-lg shadow-lg">
                <form className=" w-full px-4 self-center flex flex-col gap-4 ">
                  <div className="flex flex-row justify-between">
                    <h1 className="font-semibold ">Enter Project Details</h1>
                    <button onClick={toggleMPopup}> 
                      {" "}
                      <CloseCircleOutlined />
                    </button>
                  </div>

                  <label className="block text-gray-500 mb-2">Name</label>
                  <input
                    name="apname"
                    value={adddata.apname} 
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <label className="block text-gray-500 mb-2">Manager</label>
                  <input
                    name="amname"
                    value={adddata.amname}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <label className="block text-gray-500 mb-2">Start Date</label>
                  <input
                    name="asdate"
                    value={adddata.asdate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></input>
                  <label className="block text-gray-500 mb-2">End Date</label>
                  <input
                    name="edate"
                    value={adddata.aedate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  ></input>
                </form>
                <button
                  className="text-white m-2 bg-bluee rounded-md mr-4 shadow-lg p-2 self-center"
                  onClick={editPro}  
                >
                  Update Project  
                </button>
              </div>
            </div>
          )}
      </div>
        <p className='font-semibold text-xl self-center'>{pname}</p> 

        {/* <Link className="self-center bg-white py-2 px-2 rounded-lg" to={{
      pathname: '/folder',
      state: { pname: {pname} } 
    }}>View More</Link>  */}

{/* <Link href={`/folder?name=${pname}`}>View More</Link> */}
        
        <Link className="self-center bg-white py-2 px-2 rounded-lg"   href={`/folder?name=${pname}`} >View More</Link> 
    </div>
  )
}
