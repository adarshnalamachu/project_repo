"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { Table } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";

export default function Ava() {
  const router = useRouter()

  // const [receivedData, setReceivedData] = useState("");
  // console.log( "Add Data",adddata)  
  // console.log( "Received Data",receivedData)  

  

  const [documents,setDocuments] =useState([
    {
      no: "1",

      dtype: "Business Requirement Document(BRD)",
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
    {
      no: "2",
      dtype: "Project Plan",
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
    {
      no: "3",
      dtype: "Project Road Map",
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
    {
      no: "4",
      dtype: "Project Architecture",
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
    {
      no: "5",
      dtype: "Project Milestone Plan",
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
    {
      no: "6",
      dtype: "Project Assumptions",
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
    {
      no: "7",
      dtype: "Project outcomes",
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
    {
      no: "8",
      dtype: "BRD",
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
    {
      no: "9",
      dtype: "BRD",  
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
    {
      no: "10",
      dtype: "BRD",   
      desc: "This gives the details of project clearly",
      url: "https://docs.google.com/document/d/1eHgmeHCSf7PdqnL9DK56wLd4ajjfblTl/edit?usp=drive_link&ouid=106193994654645291291&rtpof=true&sd=true",
    },
  ] )

   useEffect(() => {


     // console.log(  "Receive Data" , receivedData)
     const adddata  = JSON.parse(localStorage.getItem("addData"))

     if(adddata){
      // setReceivedData(adddata); 
      console.log(adddata)                                                              
      setDocuments((prevArray) => [...prevArray, adddata]);
     }
    
   }, []);

  console.log(documents)


  const data = {
    pname: "AVA",
    pid: "1",
    pmanager: "Srikanth",
  };

  const handleClick = () => {};

  const columns = [
    {
      title: "S.No",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "DOCUMENT",
      dataIndex: "dtype",
      key: "dtype",
    },

    {
      title: "DESCRIPTION",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "LINK",
      dataIndex: "url",
      key: "url",
      render: (text) => (
        <div className="flex flex-row justify-between">
          {" "}
          <Link href={JSON.stringify(text)}>Link</Link>
          <MoreOutlined />
        </div>
      ),
    },
  ];

  const addhandle = () =>{
    localStorage.clear()
    router.push("/add")
  }
  return (
    <div className="flex flex-col gap-2">
      <Header></Header>
      <div className="flex mt-20 flex-row justify-between w-10/12  self-center">
        <div className="flex flex-row">
          <div className="flex  flex-col p-4 gap-2">  
            <p className="font-semibold text-sm"> Project name :</p>
            <p className="font-semibold text-sm">Manager Name :</p>
          </div>
          <div className="flex flex-col p-4  gap-2">
            <p className="font-semibold text-sm"> {data.pname}</p>
            <p className="font-semibold text-sm">{data.pmanager}</p>
          </div>  
        </div>  
        <div className="text-white bg-bluee rounded-md mr-4 shadow-lg h-fit p-2 self-center">
          <button onClick={addhandle}>Add +</button>
        </div>   
      </div>
      <div className=" flex flex-col gap-2 w-10/12 self-center">
        <Table pagination={false} dataSource={documents} columns={columns} />
      </div>
    </div>
  );
}
