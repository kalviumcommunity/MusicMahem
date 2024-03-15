import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WelcomePage from "./SubComponent/WelcomePage";
import axios from "axios";

export default function Home() {
    function getCookie(name) {
        let cookieArray = document.cookie.split('; ');
        let cookie = cookieArray.find((row) => row.startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
      }
      const token = getCookie('token')
    
      const [data, setData] = useState([]);
    
      const fetchData = async () => {
        try {
          const header = new Headers({ "Access-Control-Allow-Origin": "*" });
    
          const response = await fetch("http://localhost:3000/getallusers",  { 
            headers:{
              "authorization":`Bearer ${token}`
            },
           });
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const result = await response.json();
          console.log("res", result);
          setData(result);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []); 
    
      const handleDelete=async(ID)=>{
        try{
        await axios.delete(`http://localhost:3000/deleteuser/${ID}`,{headers:{authorization:`Bearer ${token}`}})
        .then(res=>console.log(res))
        .catch((err)=>console.log(err))
    
        window.location.reload()}catch(err){
          console.log(err)
        }
      }
    
  return (
    <div className='container'>
    <WelcomePage/>
    {(data.length > 1) ?
    <>
    <nav>
      <Link to={'/adduser'} ><button>Add</button></Link>
    </nav>
    <table className='tableContainer'>
      <thead>
        <tr className='firstRow'>
          <th className='tableHeader'>Action</th>
          <th className='tableHeader'>ID</th>
          <th className='tableHeader'>Singer</th>
          <th className='tableHeader'>Song</th>
          <th className='tableHeader'>Language</th>
          <th className='tableHeader'>Created_By</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item,index) => (
          <tr key={index} >
            <td className='tableStyle'><Link to={'/update/${item._id}'}>Update</Link><button onClick={(e)=>handleDelete(item.ID) }>Delete</button></td>
            <td className='tableStyle'>{item.ID}</td>
            <td className='tableStyle'>{item.Singer}</td>
            <td className='tableStyle'>{item.Song}</td>
            <td className='tableStyle'>{item.Language}</td>
            <td className='tableStyle'>{item.Created_By}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
    :
    <div id='Body-content'>
          <div id="login">
          <h1>Please Login To Continue</h1>
          </div>
        </div>
        }
  </div>
  )
}