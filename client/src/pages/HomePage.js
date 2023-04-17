// import React,{useEffect} from 'react'
// import axios from 'axios'
// import Layout from '../components/Layout'

// const HomePage = () => {

// // Login user data
// const getUserData = async(req,res) =>{
// try {
//   //const ress = await.......
//   await axios.post('/api/v1/user/getUserData',{},{
//     headers:{
//       Authorization : "Bearer " + localStorage.getItem('token')
//     }
//   })  
// } catch (error) {
//   console.log('yahi pe')
//   console.log(error);
//   // res.status(500).send({
//   //   message:'Token not sent',
//   //   success:false
//   // })
// }
// }

// useEffect(()=>{
//   getUserData()
//   console.log('test');
// },[]);

//   return (
//     <Layout>
//         <h2>Home page</h2>
//     </Layout>
//   )
// }

// export default HomePage


import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import DisplayCard from "../components/Card";
import {Row} from 'antd'

const HomePage = () => {
  const [machines,setMachines] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getAllMachines",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        setMachines(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Machines</h1>
      <Row>
        {machines && machines.map((machine) => <DisplayCard machine={machine} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;