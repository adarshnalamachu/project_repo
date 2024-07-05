"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import Docset from "../components/docset";
import "../components/folder.css";
import { useRouter } from "next/navigation";
import { CloseCircleOutlined } from "@ant-design/icons";
import { projects } from "../services/projects";
import { useSearchParams } from 'next/navigation';
import { Notification } from "antd";
import { Button, notification, Space } from 'antd';


export default function Folder() {


  const [api, contextHolder] = notification.useNotification();

  const folderAddNoti =  (pauseOnHover) => {
    console.log("called");
    api.open({
      message: 'Folder added successfully',
      showProgress: true,
      pauseOnHover,
    });
  };
  const [main, setMain] = useState(false);
  const [head, setHead] = useState("");
  const searchParams = useSearchParams();



  const toggleMPopup = () => {
    setMain(!main);
  };

  // const addFolder = (head) => {
  //   const newTable = { head, doc: [], color: "" };
  //   setTable([...table, newTable]);
  //   setMain(!main);
  // }; 

  const router = useRouter();

  const pname = router.query;
  console.log(searchParams)
  const name = searchParams.get(
    'name'
    );

  const [pdata, setPdata] = useState();

  const getProjectByName = async () => {   
    try { 
      const res = await projects.getProjectByName(name);
        setPdata(res.data);  
    } catch (err) { 
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data?.errors[0].errorMessage);
      } else {
        setError("Adding Failed");
      }
    }
  };

  // console.log( "Folder Data" ,pdata)

  useEffect(() => {  
    getProjectByName()      
  },[]);



  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);   

  const handleClickOutside = (event) => {   
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);                                                    
    }   
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setHead(e.target.value);
  };



  // const [documents, setDocuments] = useState([
  //   {
  //     no: "1",

  //     dtype: "Business Requirement Document(BRD)",
  //     desc: "This gives the details of project clearly",
  //     url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
  //   },
  // ]);

  // const documents3 = [
  //   {
  //     no: "1",
  //     dtype: "Potential risk",
  //     desc: "This gives the details of Potential risk clearly",

  //     url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
  //   },
  //   {
  //     no: "2",
  //     dtype: "Mitigation risk",
  //     desc: "This gives the details of Mitigation list clearly",

  //     url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
  //   },
  // ];

  // const documents4 = [
  //   {
  //     no: "1",
  //     dtype: "UIUX",
  //     desc: "This gives the details of UIUX design clearly",

  //     url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
  //   },
  // ];

  // const documents5 = [
  //   {
  //     no: "1",
  //     dtype: "Organization Chart",
  //     desc: "This gives the details of Organization clearly",

  //     url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
  //   },
  // ];

  // const [documents2, setDocuments2] = useState([
  //   {
  //     no: "1",
  //     dtype: "Weekly Status Report",
  //     desc: "This gives the details of Weekly Status Report",
  //     url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
  //   },
  //   {
  //     no: "2",
  //     dtype: "Monthly Status Report",
  //     desc: "This gives the details of Monthly Status Report",
  //     url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
  //   },
  //   {
  //     no: "3",
  //     dtype: "Quarterly Status Report",
  //     desc: "This gives the details of Quarterly Status Report",
  //     url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
  //   },
  // ]);
  // const data = {
  //   pname: "Digital Leap",
  //   pid: "1",
  //   pmanager: "Lohith Krishna",
  //   sdate: "21-06-2024",
  //   edate: "21-12-2024",
  // };

  // const [table, setTable] = useState([
  //   {
  //     head: "BRD Documents",
  //     doc: documents, 
  //   },
  //   {
  //     head: "Status Reports",
  //     doc: documents2,
  //   },
  //   {
  //     head: "Risk Management",
  //     doc: documents3,
  //   },
  //   {
  //     head: "Design Documents",
  //     doc: documents4,
  //   },
  //   {
  //     head: "Org Charts",
  //     doc: documents5,
  //   },
  // ]);

  const [openFolderIndex, setOpenFolderIndex] = useState(0);

  const handleToggle = (index) => {
    if (openFolderIndex === index) {
      setOpenFolderIndex(null); // Close if it's already open
    } else {
      setOpenFolderIndex(index);
    }
  };
const [error,setError] = useState("")

  const addFolder = async () => {
    const payload = {
      folderName: head,
      projectName: pdata?.projectName,
    };

    try {
      const res = await projects.addFolder(payload)
      setMain(false) 
      setError(null); 
      getProjectByName()
      folderAddNoti(true)
    } catch (err) { 
      if(err.response && err.response.data && err.response.data.errors ) {
        setError( err.response.data?.errors[0].errorMessage );

      }
      else {
          setError("Add Folder Failed")
      }
    }

  };

  return (
   <> 
   {/* {contextHolder} */}
    <div className="flex flex-col gap-2">
      <Header></Header>
      <div className="flex mt-20 flex-col md:flex-row  border-green-500 justify-between md:w-10/12  self-center">
        <div className="flex flex-row justify-between   border-green-500">
          <div className="flex flex-row">
            <div className="flex  flex-col p-4 gap-2">
              <p className="font-semibold text-xs md:text-sm">Project Name :</p>
              <p className="font-semibold text-xs md:text-sm">
                Project Manager :
              </p>
            </div>
            <div className="flex flex-col p-4  gap-2">
              <p className="font-semibold text-xs md:text-sm">{pdata?.projectName}</p>
              <p className="font-semibold text-xs md:text-sm">
                {pdata?.projectManagerName}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:gap-24">
          <div className="flex flex-row">
            <div className="flex flex-col p-4  gap-2">
              <p className="font-semibold text-xs md:text-sm">
                Start Date as per Contract :
              </p>
              <p className="font-semibold text-xs md:text-sm">
                End Date as per Contract :
              </p>
            </div>
            <div className="flex flex-col p-4  gap-2">
              <p className="font-semibold text-xs md:text-sm"> {pdata?.startDate}</p>
              <p className="font-semibold text-xs md:text-sm">{pdata?.endDate}</p>
            </div>
          </div>
          <div className="text-white text-xs md:text-sm bg-bluee rounded-md mr-4 shadow-lg h-fit p-2 self-center">
            <button onClick={toggleMPopup}>Add Folder</button>
          </div>
        </div>

        {main && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white flex flex-col  rounded shadow-lg">
              <form className=" w-full px-4 self-center flex flex-col  gap-4 ">
                <div className="flex flex-row justify-between">
                  <label className="block text-gray-500 mb-2">
                    Enter Folder Title
                  </label>
                  <button onClick={toggleMPopup}>
                    <CloseCircleOutlined />
                  </button>
                </div>

                <input
                  name="head"
                  value={head}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </form>
              <button
                className="text-white m-2 bg-bluee rounded-md mt-2 shadow-lg p-2 self-center"
                onClick={addFolder} 
              >
                Add Folder
              </button>
            </div>
          </div>
        )}
      </div>
      <div className=" flex flex-col "> 
        {pdata?.projectFoldersList?.map((item, index) => (
          <div
            className=" folder flex flex-col gap-2 w-11/12 md:w-10/12 self-center p-2 md:px-6 md:py-3"
            key={index} 
          >
            <Docset   
              pname={item.projectName}
              name={item.folderName}   
              data={item.projectDocumentsList} 
              isOpen={openFolderIndex === index} 
              onToggle={() => handleToggle(index)} 
              getProjectByName={getProjectByName}
            ></Docset>
          </div>
        ))}
      </div>
    </div></>
  );
}
