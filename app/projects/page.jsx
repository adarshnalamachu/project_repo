"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "../components/header";
import Card from "../components/card";
import "../components/card.css";
import { projects as pro } from "../services/projects";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { CloseCircleOutlined } from "@ant-design/icons";

export default function Dashboard() {
  const [main, setMain] = useState(false);

  const toggleMPopup = () => {
    setMain(!main);
  };

  const [projects, setProjects] = useState([]);

  const [adddata, setAdddata] = useState({
    pname: "",
    pmanager: "",
    projectDescription:" Project Description",
    start: "",
    end: "",
  });

  const displayProjects = async () => {
    try {
      const res = await pro.getProject();
      setProjects(res.data);
    } catch (err) {
      console.log(err);
      // setError(err.response ? err.response.data.errors[0].errorMessage : "Error");
      // setResponse(null);
    }
  };

  const { pname, pmanager, start, end } = adddata;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdddata({
      ...adddata,
      [name]: value,
    });
  };

  const handleDateChange = (date, name) => {
    setAdddata({
      ...adddata,
      [name]: date,
    });
  };
  const [error,setError] = useState()
  const [response, setResponse] = useState();


  const addPro = async () => { 

    const payload = {
      "projectName": adddata.pname,
      "projectManagerName": adddata.pmanager,
      "projectDescription": "Project Description",
      "startDate": adddata.start,
      "endDate": adddata.end
    };

    try {
      const res = await pro.addProject(payload)  
      setResponse(res.data);   
      setMain(!main);    
      setError(null);         
    } catch (err) { 
      if(err.response && err.response.data && err.response.data.errors ) {
        setError( err.response.data?.errors[0].errorMessage );

      }
      else {
          setError("Adding Failed")
      }
      setResponse(null);
    }
    displayProjects();

  };

  useEffect(() => {
    displayProjects();
  }, []);

  console.log( "Projects", projects)


  return (
    <div>
      <Header></Header>
      <div className="flex flex-col gap-4 mt-20 p-10 ">
        <div className="flex flex-row w-10/12  self-center justify-between">
          <div className="">
            <h1 className=" font-bold ">Projects </h1>
          </div>
          <div className="text-white bg-bluee rounded-md shadow-lg h-fit p-2 self-center">
            <button onClick={toggleMPopup}>Add Project</button>
          </div>
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
                    name="pname"
                    value={pname}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <label className="block text-gray-500 mb-2">Manager</label>
                  <input
                    name="pmanager"
                    value={pmanager}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <label className="block text-gray-500 mb-2">Start Date</label>  
                  <DatePicker className="w-full p-2 border border-gray-300 rounded" 
                  selected={start}  
                  onChange={(date) => handleDateChange(date, "start")}  
                  />
                  <label className="block text-gray-500 mb-2">End Date</label>   
                  <DatePicker className="w-full p-2 border border-gray-300 rounded" 
                  selected={end}  
                  onChange={(date) => handleDateChange(date, "end")}  
                  />
                </form>
                <button
                  className="text-white m-2 bg-bluee rounded-md mr-4 shadow-lg p-2 self-center"
                  onClick={() => addPro(adddata)}  
                >
                  Add Project  
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row  gap-8 w-10/12 self-center text-xs">
          {projects?.map((item, index) => (
            <Card
              key={item.id}
              className="card"
              id={item.id}
              pname={item.projectName}
              mname={item.projectManagerName}
              sdate={item.startDate}
              edate={item.endDate}
              display={displayProjects}
              url="/folder"
            ></Card>
          ))}
        </div>
      </div>
    </div>
  );
}
