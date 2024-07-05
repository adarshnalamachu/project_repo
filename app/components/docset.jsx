"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

import { Table } from "antd";
import {
  MoreOutlined,
  DownOutlined,
  UpOutlined,
  FolderOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { projects } from "../services/projects";
export default function Docset(props) {

  const [data, setData] = useState(props.data);
  const pname=props.pname
  const name = props.name;
  const isOpen = props.isOpen;
  const onToggle = props.onToggle;
  const getProjectByName= props.getProjectByName;
  const [down1, setDown1] = useState(false);

  const [head, setHead] = useState(name);

  const handleChange2 = (e) => {
    setHead(e.target.value);
  };

  const [adddata, setAdddata] = useState({
    documentName: "",
    documentDescription: "",
    documentLink: "",        
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdddata({
      ...adddata,
      [name]: value,
    });
  };

  const { documentName, documentDescription, documentLink } = adddata;

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); 

  const handleClickOutside = (event) => {  
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
      // setMain(false)
    }
  };

  

  const handledown1 = () => {
    setDown1(!down1);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [error,setError] =useState("")
  const [response,setResponse] =useState("")


  const addDoc = async () => {
    const payload = {
        documentName: adddata.documentName,
        folderName: name,
        projectName: pname,
        documentLink: adddata.documentLink,  
        documentDescription: adddata.documentDescription,
    };

    try {
      const res = await  projects.addDocuments(payload)
      setResponse(res.data);
      getProjectByName();
      setMain(!main);
      setError(null);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data?.errors[0].errorMessage);
      } else {
        setError("Adding Failed");
      }
      setResponse(null);
    }
    getProjectByName();
  };

  // const addDoc = (adddata) => {
  //   console.log(adddata);
  //   adddata.no = (data.length + 1).toString();
  //   setData([...data, adddata]);
  //   console.log(data);
  //   setMain(!main);
  // };

  const [main, setMain] = useState(false);
  const [main2, setMain2] = useState(false);


  const toggleMPopup = () => {
    setMain(!main);
  };

  const toggleMPopup2 = () =>{
    setMain2(!main2);

  }

  const columns = [
    {
      title: "S.No",
      dataIndex: "no",
      render: (text, record, index) => index + 1,
      key: "no",
    },
    {
      title: "DOCUMENT",
      dataIndex: "documentName", 
      key: "dtype",
    },

    {
      title: "DESCRIPTION",
      dataIndex: "documentDescription",
      key: "desc",
    },
    {
      title: "LINK",
      dataIndex: "documentLink",
      key: "url",
      render: (text) => (
        <div className="flex flex-row justify-between">
          {/* <Link href={text}>Link</Link> */}
          <a target="_blank" href={text} rel="noopener noreferrer">
            Link
          </a>
          <MoreOutlined />
        </div>
      ),
    },
  ];

   const updateFolder= async()=>{
     try{
       const res= await projects.editFolder(head,name, pname)
       console.log(res.data)
       setResponse(res.data)
     }
     catch (err) { 
      if(err.response && err.response.data && err.response.data.errors ) {
        setError( err.response.data?.errors[0].errorMessage );
      }
      else {
          setError("Editing Failed")
      }
      console.log(error)
      setResponse(null);
    }
    toggleMPopup2()
       getProjectByName()
   }


  const deletehandler= async()=>{
    try{
      const res= await projects.deleteFolder(pname,name)
      setMenuOpen(false)
      getProjectByName()

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

  //   const handleAdd = () => {
  //     localStorage.clear();
  //     router.push("/add");
  //   };

  return (
    <div
      className=" "
      // style={{ background: color }}
    >
      <div className="flex flex-row md:flex-row justify-between">
        <div className="font-bold flex flex-row gap-6 underline self-center text-xs  md:text-xl">
          <FolderOutlined />
          <p className="text-mg">{name}</p>{" "}
        </div>
        <div className="flex flex-row justify-between md:gap-5">
          {isOpen && (
            <div className="self-center">
              <div className="text-white bg-bluee text-xs rounded-md md:mr-4 shadow-lg p-1 mr-1 h-fit self-center">
                <button onClick={toggleMPopup}>Add Document</button>
              </div>
              {main && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                  <div className="flex flex-col bg-white rounded-lg shadow-lg">
                    <form className=" w-full px-4 self-center flex flex-col gap-4 ">
                      <div className="flex flex-row justify-between">
                        <h1 className="font-semibold ">
                          Enter Document Details
                        </h1>
                        <button onClick={toggleMPopup}>
                          {" "}
                          <CloseCircleOutlined />
                        </button>
                      </div>

                      <label className="block text-gray-500 mb-2">Name</label>
                      <input
                        name="documentName"
                        value={documentName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <label className="block text-gray-500 mb-2">
                        Description
                      </label>
                      <input
                        name="documentDescription"
                        value={documentDescription}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      <label className="block text-gray-500 mb-2">Link</label>
                      <input
                        name="documentLink"
                        value={documentLink}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                      ></input>
                    </form>
                    <button
                      className="text-white m-2 bg-bluee rounded-md mr-4 shadow-lg p-2 self-center"
                      onClick={addDoc}
                    >
                      Add Document
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {!isOpen && (
            <div className="self-center bg-violet-400 px-2 py-1 rounded-lg">
              <button onClick={onToggle}>
                <DownOutlined />
              </button>
            </div>
          )}
          {isOpen && (
            <div className="self-center bg-violet-400 px-2 py-1 rounded-lg">
              <button onClick={onToggle}>
                <UpOutlined />
              </button>
            </div>
          )}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            <MoreOutlined />
          </button>
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 rounded shadow-lg"
            >
              <button onClick={toggleMPopup2} className="block w-full px-2 py-1 text-center text-gray-700 hover:bg-gray-100">
                Edit
              </button>
              <button onClick={deletehandler} className="block w-full px-2 py-1 text-center text-gray-700 hover:bg-gray-100">
                Delete
              </button>
            </div>
          )}
          {main2 && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white flex flex-col  rounded shadow-lg">
              <form className=" w-full px-4 self-center flex flex-col  gap-4 ">
                <div className="flex flex-row justify-between">
                  <label className="block text-gray-500 mb-2">
                    Enter Folder Title
                  </label>
                  <button onClick={toggleMPopup2}>
                    <CloseCircleOutlined />
                  </button>
                </div>

                <input
                  name="head"
                  value={head}
                  onChange={handleChange2}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </form>
              <button
                className="text-white m-2 bg-bluee rounded-md mt-2 shadow-lg p-2 self-center"
                onClick={updateFolder} 
              >
                Update Folder
              </button>
            </div>
          </div>
        )}
        </div>
      </div>
      {isOpen && (
        <div className="flex text-xs overflow-x-auto max-w-100  md:text-sm flex-col gap-2 ">
          <Table pagination={false} dataSource={data} columns={columns} />
        </div>
      )}
    </div>
  );
}
